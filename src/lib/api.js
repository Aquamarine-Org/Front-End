import {
  createFallbackDashboardOverview,
  createFallbackSettings,
  normalizeSettingsResponse,
} from "./aquamarineData.js";

const AUTH_STORAGE_KEY = "aquamarine:auth-session";
const MOCK_DB_KEY = "aquamarine:mock-db";
const MOCK_VERIFICATION_CODE = "123456";
const MOCK_API_DELAY_MS = 180;

export const MOCK_DEMO_CREDENTIALS = {
  email: "demo@aquamarine.com",
  password: "Demo123!",
};

export const API_BASE_URL = "mock://local";
export const IS_MOCK_API = true;
export { MOCK_VERIFICATION_CODE };

function delay(ms = MOCK_API_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createMockUser({
  name,
  email,
  password,
  phone = "",
  emailVerificado = false,
  ativo = false,
  tipoUsuario = "MORADOR",
  pending = true,
}) {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ||
      `mock-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    email: normalizeEmail(email),
    password,
    phone,
    emailVerificado,
    ativo,
    tipoUsuario,
    pending,
    createdAt: new Date().toISOString(),
    registrationCompletedAt: null,
    address: "",
    cpf: "",
    cep: "",
  };
}

function createDefaultMockDb() {
  const demoUser = createMockUser({
    name: "Demo Aquamarine",
    email: MOCK_DEMO_CREDENTIALS.email,
    password: MOCK_DEMO_CREDENTIALS.password,
    phone: "(11) 99999-9999",
    emailVerificado: true,
    ativo: true,
    pending: false,
  });

  const settings = normalizeSettingsResponse({
    ...createFallbackSettings(),
    usuarioEmail: demoUser.email,
    nomeCompleto: demoUser.name,
    nomeExibicao: "Demo",
    email: demoUser.email,
    telefone: demoUser.phone,
  });

  return {
    users: [demoUser],
    verificationCodes: {},
    settingsByEmail: {
      [demoUser.email]: settings,
    },
    dashboardByEmail: {
      [demoUser.email]: createFallbackDashboardOverview(),
    },
    completedRegistrations: {},
  };
}

function readMockDb() {
  if (typeof window === "undefined") {
    return createDefaultMockDb();
  }

  try {
    const stored = window.localStorage.getItem(MOCK_DB_KEY);
    if (!stored) {
      const initial = createDefaultMockDb();
      window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(initial));
      return initial;
    }

    return { ...createDefaultMockDb(), ...JSON.parse(stored) };
  } catch {
    return createDefaultMockDb();
  }
}

function saveMockDb(db) {
  if (typeof window === "undefined") {
    return db;
  }

  window.localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
  return db;
}

function findUserByEmail(db, email) {
  const normalizedEmail = normalizeEmail(email);
  return db.users.find((user) => user.email === normalizedEmail) || null;
}

function createSessionFromUser(user) {
  return {
    token: `mock-token-${user.email}-${user.id}`,
    expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    name: user.name,
    email: user.email,
    tipoUsuario: user.tipoUsuario,
    emailVerificado: user.emailVerificado,
  };
}

function storeAuthSession(session) {
  if (typeof window === "undefined") {
    return session;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return session;
}

function readAuthSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

export function loadAuthSession() {
  return readAuthSession();
}

export function saveAuthSession(session) {
  return storeAuthSession(session);
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getAuthToken() {
  return loadAuthSession()?.token || "";
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function buildSuccessResponse(payload) {
  return deepClone(payload);
}

function buildError(status, message, payload = { mensagem: message }) {
  throw new ApiError(message, status, payload);
}

async function handleAuthRegister(body) {
  const db = readMockDb();
  const email = normalizeEmail(body?.email);
  const name = (body?.name || "").trim();
  const password = body?.password || "";
  const phone = (body?.phone || "").trim();

  if (!name) {
    buildError(400, "O nome e obrigatorio.");
  }

  if (!email) {
    buildError(400, "O e-mail e obrigatorio.");
  }

  if (!password) {
    buildError(400, "A senha e obrigatoria.");
  }

  const existingUser = findUserByEmail(db, email);
  if (existingUser) {
    buildError(409, "Ja existe um usuario com este e-mail.");
  }

  const user = createMockUser({
    name,
    email,
    password,
    phone,
    emailVerificado: false,
    ativo: false,
    pending: true,
  });

  db.users.push(user);
  db.verificationCodes[email] = MOCK_VERIFICATION_CODE;
  db.completedRegistrations[email] = {
    email,
    phone,
    createdAt: new Date().toISOString(),
    complete: false,
  };
  saveMockDb(db);

  console.info("[MOCK API] register", { email, verificationCode: MOCK_VERIFICATION_CODE });

  return buildSuccessResponse(createSessionFromUser(user));
}

async function handleAuthLogin(body) {
  const db = readMockDb();
  const email = normalizeEmail(body?.email);
  const password = body?.password || "";
  const user = findUserByEmail(db, email);

  if (!user || user.password !== password) {
    buildError(401, "E-mail ou senha invalidos.");
  }

  if (!user.ativo) {
    buildError(401, "Usuario ainda nao finalizou o cadastro.");
  }

  return buildSuccessResponse(createSessionFromUser(user));
}

async function handleVerifyEmail(body) {
  const db = readMockDb();
  const email = normalizeEmail(body?.email);
  const code = (body?.code || "").trim();
  const user = findUserByEmail(db, email);

  if (!user) {
    buildError(400, "Usuario nao encontrado.");
  }

  const storedCode = db.verificationCodes[email];
  if (!storedCode || code !== storedCode) {
    buildError(400, "Codigo invalido.");
  }

  user.emailVerificado = true;
  db.users = db.users.map((item) => (item.email === email ? user : item));
  saveMockDb(db);

  return buildSuccessResponse({ mensagem: "E-mail verificado com sucesso." });
}

async function handleResendVerificationCode(body) {
  const db = readMockDb();
  const email = normalizeEmail(body?.email);
  const user = findUserByEmail(db, email);

  if (!user) {
    buildError(400, "Usuario nao encontrado.");
  }

  db.verificationCodes[email] = MOCK_VERIFICATION_CODE;
  saveMockDb(db);
  console.info("[MOCK API] resend verification code", { email, verificationCode: MOCK_VERIFICATION_CODE });

  return buildSuccessResponse({ mensagem: "Novo codigo enviado por e-mail." });
}

async function handleCompleteRegistration(body) {
  const db = readMockDb();
  const email = normalizeEmail(body?.email);
  const address = (body?.address || "").trim();
  const phone = (body?.phone || "").trim();
  const cpf = (body?.cpf || "").trim();
  const cep = (body?.cep || "").trim();
  const user = findUserByEmail(db, email);

  if (!user) {
    buildError(400, "Usuario nao encontrado.");
  }

  if (!user.emailVerificado) {
    buildError(400, "E-mail ainda nao foi verificado.");
  }

  if (!address) {
    buildError(400, "Endereco e obrigatorio.");
  }

  user.ativo = true;
  user.pending = false;
  user.phone = phone || user.phone;
  user.address = address;
  user.cpf = cpf;
  user.cep = cep;
  user.registrationCompletedAt = new Date().toISOString();
  db.users = db.users.map((item) => (item.email === email ? user : item));

  const baseSettings = normalizeSettingsResponse({
    ...createFallbackSettings(),
    usuarioEmail: email,
    nomeCompleto: user.name,
    nomeExibicao: user.name.split(" ")[0] || user.name,
    email,
    telefone: user.phone,
  });

  db.settingsByEmail[email] = baseSettings;
  db.dashboardByEmail[email] = db.dashboardByEmail[email] || createFallbackDashboardOverview();
  db.completedRegistrations[email] = {
    email,
    phone,
    address,
    cpf,
    cep,
    complete: true,
    completedAt: new Date().toISOString(),
  };

  saveMockDb(db);
  console.info("[MOCK API] complete registration", { email, address });

  return buildSuccessResponse({ mensagem: "Cadastro finalizado com sucesso." });
}

async function handleDashboardOverview() {
  const db = readMockDb();
  const session = loadAuthSession();
  const email = normalizeEmail(session?.email);
  const overview = db.dashboardByEmail[email] || createFallbackDashboardOverview();
  return buildSuccessResponse(overview);
}

async function handleConfiguracoesGet() {
  const db = readMockDb();
  const session = loadAuthSession();
  const email = normalizeEmail(session?.email);
  const settings =
    db.settingsByEmail[email] ||
    normalizeSettingsResponse({
      ...createFallbackSettings(),
      usuarioEmail: email,
      email,
    });

  return buildSuccessResponse(settings);
}

async function handleConfiguracoesPut(body) {
  const db = readMockDb();
  const session = loadAuthSession();
  const email = normalizeEmail(session?.email);
  const current =
    db.settingsByEmail[email] ||
    normalizeSettingsResponse({
      ...createFallbackSettings(),
      usuarioEmail: email,
      email,
    });

  const updated = normalizeSettingsResponse({
    ...current,
    ...body,
    usuarioEmail: email,
    email: body?.email ? normalizeEmail(body.email) : current.email || email,
    telefone: body?.telefone || current.telefone,
  });

  db.settingsByEmail[email] = updated;
  saveMockDb(db);
  console.info("[MOCK API] update settings", { email });
  return buildSuccessResponse(updated);
}

async function request(path, options = {}) {
  await delay();

  const method = (options.method || "GET").toUpperCase();
  const body = options.body;

  try {
    if (path === "/auth/register" && method === "POST") {
      return await handleAuthRegister(body);
    }

    if (path === "/auth/login" && method === "POST") {
      return await handleAuthLogin(body);
    }

    if (path === "/auth/verify-email" && method === "POST") {
      return await handleVerifyEmail(body);
    }

    if (path === "/auth/resend-verification-code" && method === "POST") {
      return await handleResendVerificationCode(body);
    }

    if (path === "/auth/complete-registration" && method === "POST") {
      return await handleCompleteRegistration(body);
    }

    if (path === "/dashboard/overview" && method === "GET") {
      return await handleDashboardOverview();
    }

    if (path === "/configuracoes-usuario/me" && method === "GET") {
      return await handleConfiguracoesGet();
    }

    if (path === "/configuracoes-usuario/me" && method === "PUT") {
      return await handleConfiguracoesPut(body);
    }

    buildError(404, `Mock endpoint nao encontrado para ${method} ${path}.`);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error("[MOCK API] unexpected failure", { path, method, error });
    throw new ApiError(
      "Nao foi possivel concluir a operacao na demonstracao.",
      500,
      { mensagem: "Erro interno no mock." },
    );
  }
}

export function apiGet(path, options = {}) {
  return request(path, { ...options, method: "GET" });
}

export function apiPost(path, body, options = {}) {
  return request(path, { ...options, method: "POST", body });
}

export function apiPut(path, body, options = {}) {
  return request(path, { ...options, method: "PUT", body });
}

export function apiDelete(path, options = {}) {
  return request(path, { ...options, method: "DELETE" });
}
