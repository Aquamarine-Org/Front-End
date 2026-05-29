import { useMemo, useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import {
  IoAlertCircleOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoKeyOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoNotificationsOutline,
  IoPersonCircleOutline,
  IoSaveOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdOutlineDevicesOther } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

import styles from "./ConfiguracoesPage.module.css";

const CHAVE_DADOS_USUARIO = "aquamarine:dados-usuario";

const DADOS_PADRAO = {
  nomeCompleto: "",
  nomeExibicao: "",
  email: "",
  telefone: "",
  idioma: "pt-BR",
  fusoHorario: "America/Sao_Paulo",
  notificacoes: {
    email: true,
    whatsapp: true,
    alertasConta: true,
    relatorioMensal: false,
  },
  seguranca: {
    doisFatores: false,
    avisoLogin: true,
  },
};

const ABAS = [
  { chave: "perfil", rotulo: "Perfil e conta", icone: IoPersonCircleOutline },
  { chave: "seguranca", rotulo: "Segurança", icone: IoShieldCheckmarkOutline },
  {
    chave: "notificacoes",
    rotulo: "Notificações",
    icone: IoNotificationsOutline,
  },
  { chave: "dispositivos", rotulo: "Dispositivos", icone: MdOutlineDevicesOther },
];

const DISPOSITIVOS_CONECTADOS = [
  {
    nome: "Celular principal",
    descricao: "Android · São Paulo",
    acesso: "Agora",
    atual: true,
  },
  {
    nome: "Notebook pessoal",
    descricao: "Chrome · São Paulo",
    acesso: "Ontem às 20:14",
    atual: false,
  },
  {
    nome: "Tablet da residência",
    descricao: "Safari · Último acesso residencial",
    acesso: "13 de abril, 2025",
    atual: false,
  },
];

const ERROS_CONTATO_PADRAO = {
  email: "",
  telefone: "",
};

function mesclarDadosUsuario(dadosSalvos) {
  return {
    ...DADOS_PADRAO,
    ...dadosSalvos,
    notificacoes: {
      ...DADOS_PADRAO.notificacoes,
      ...dadosSalvos?.notificacoes,
    },
    seguranca: {
      ...DADOS_PADRAO.seguranca,
      ...dadosSalvos?.seguranca,
    },
  };
}

function carregarDadosUsuario() {
  if (typeof window === "undefined") {
    return DADOS_PADRAO;
  }

  try {
    const dadosSalvos = window.localStorage.getItem(CHAVE_DADOS_USUARIO);

    if (!dadosSalvos) {
      return DADOS_PADRAO;
    }

    return mesclarDadosUsuario(JSON.parse(dadosSalvos));
  } catch {
    return DADOS_PADRAO;
  }
}

function normalizarDadosUsuario(dadosUsuario) {
  const dadosCompletos = mesclarDadosUsuario(dadosUsuario);

  return {
    ...dadosCompletos,
    nomeCompleto: dadosCompletos.nomeCompleto.trim(),
    nomeExibicao: dadosCompletos.nomeExibicao.trim(),
    email: dadosCompletos.email.trim(),
    telefone: dadosCompletos.telefone.trim(),
  };
}

function salvarDadosUsuarioNoNavegador(dadosUsuario) {
  if (typeof window === "undefined") {
    return normalizarDadosUsuario(dadosUsuario);
  }

  const dadosNormalizados = normalizarDadosUsuario(dadosUsuario);

  window.localStorage.setItem(
    CHAVE_DADOS_USUARIO,
    JSON.stringify(dadosNormalizados)
  );

  return dadosNormalizados;
}

function validarEmailGmail(email) {
  if (!email) {
    return "";
  }

  return /^[^\s@]+@gmail\.com$/i.test(email)
    ? ""
    : "Gmail inválido. Use um endereço terminado em @gmail.com.";
}

function obterDigitosTelefone(telefone) {
  return telefone.replace(/\D/g, "");
}

function formatarTelefoneBrasileiro(valor) {
  const digitos = obterDigitosTelefone(valor).slice(0, 11);

  if (digitos.length <= 2) {
    return digitos;
  }

  if (digitos.length <= 6) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  }

  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(
      6
    )}`;
  }

  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(
    7
  )}`;
}

function validarTelefoneBrasileiro(telefone) {
  const digitos = obterDigitosTelefone(telefone);

  if (!digitos) {
    return "";
  }

  const ddd = Number(digitos.slice(0, 2));
  const temDddValido = ddd >= 11 && ddd <= 99;
  const temTamanhoValido = digitos.length === 10 || digitos.length === 11;
  const temCelularValido = digitos.length !== 11 || digitos[2] === "9";

  return temDddValido && temTamanhoValido && temCelularValido
    ? ""
    : "Telefone inválido. Use DDD e número, por exemplo: (11) 99999-9999.";
}

function validarDadosDeContato(dadosUsuario) {
  return {
    email: validarEmailGmail(dadosUsuario.email),
    telefone: validarTelefoneBrasileiro(dadosUsuario.telefone),
  };
}

function Interruptor({ ativo, titulo, descricao, aoAlternar }) {
  return (
    <button
      type="button"
      className={`${styles.interruptorLinha} ${ativo ? styles.ativo : ""}`}
      role="switch"
      aria-checked={ativo}
      onClick={aoAlternar}
    >
      <span>
        <strong>{titulo}</strong>
        <small>{descricao}</small>
      </span>

      <span className={styles.interruptorControle}>
        <span></span>
      </span>
    </button>
  );
}

function ConfiguracoesPage() {
  const [abaAtiva, setAbaAtiva] = useState("perfil");
  const [dadosUsuario, setDadosUsuario] = useState(() => carregarDadosUsuario());
  const [senha, setSenha] = useState({
    atual: "",
    nova: "",
    confirmacao: "",
  });
  const [mensagemSalva, setMensagemSalva] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [errosContato, setErrosContato] = useState(ERROS_CONTATO_PADRAO);

  const iniciaisUsuario = useMemo(() => {
    const nomeParaAvatar = dadosUsuario.nomeCompleto || dadosUsuario.nomeExibicao;

    return nomeParaAvatar
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parteNome) => parteNome[0])
      .join("")
      .toUpperCase();
  }, [dadosUsuario.nomeCompleto, dadosUsuario.nomeExibicao]);

  const validarDadosAntesDeSalvar = (dadosParaSalvar) => {
    const dadosNormalizados = normalizarDadosUsuario(dadosParaSalvar);
    const proximosErros = validarDadosDeContato(dadosNormalizados);
    const temErro = Object.values(proximosErros).some(Boolean);

    setErrosContato(proximosErros);

    if (temErro) {
      setMensagemSalva("");
      setMensagemErro("Corrija os dados destacados antes de salvar.");
      return null;
    }

    setMensagemErro("");
    return dadosNormalizados;
  };

  const atualizarCampo = (campo, valor) => {
    const valorTratado =
      campo === "telefone"
        ? formatarTelefoneBrasileiro(valor)
        : campo === "email"
          ? valor.trim().toLowerCase().slice(0, 80)
          : valor;

    setMensagemSalva("");
    setMensagemErro("");
    setDadosUsuario((dadosAtuais) => ({
      ...dadosAtuais,
      [campo]: valorTratado,
    }));

    if (campo === "email") {
      setErrosContato((errosAtuais) => ({
        ...errosAtuais,
        email: "",
      }));
    }

    if (campo === "telefone") {
      setErrosContato((errosAtuais) => ({
        ...errosAtuais,
        telefone: "",
      }));
    }
  };

  const salvarDados = (evento) => {
    evento.preventDefault();
    const dadosValidados = validarDadosAntesDeSalvar(dadosUsuario);

    if (!dadosValidados) {
      return;
    }

    const dadosSalvos = salvarDadosUsuarioNoNavegador(dadosValidados);

    setDadosUsuario(dadosSalvos);
    setMensagemSalva("Alterações salvas neste navegador.");
  };

  const salvarPreferencias = () => {
    const dadosValidados = validarDadosAntesDeSalvar(dadosUsuario);

    if (!dadosValidados) {
      return;
    }

    const dadosSalvos = salvarDadosUsuarioNoNavegador(dadosValidados);

    setDadosUsuario(dadosSalvos);
    setMensagemSalva("Preferências salvas neste navegador.");
  };

  const salvarPreferenciaAlterada = (grupo, chave) => {
    const proximosDados = {
      ...dadosUsuario,
      [grupo]: {
        ...dadosUsuario[grupo],
        [chave]: !dadosUsuario[grupo][chave],
      },
    };
    const dadosValidados = validarDadosAntesDeSalvar(proximosDados);

    setDadosUsuario(proximosDados);

    if (!dadosValidados) {
      return;
    }

    salvarDadosUsuarioNoNavegador(dadosValidados);

    setMensagemSalva("Preferência salva neste navegador.");
  };

  const atualizarSenha = (evento) => {
    evento.preventDefault();
    setSenha({ atual: "", nova: "", confirmacao: "" });
    setMensagemSalva("Senha atualizada com sucesso.");
  };

  return (
    <DashboardLayout currentPage="configuracoes" pageTitle="Configurações">
      <section className={styles.paginaConfiguracoes}>
        <div className={styles.cabecalhoConfiguracoes}>
          <div>
            <span className={styles.etiqueta}>Conta Aquamarine</span>
            <h2>Configurações do usuário</h2>
            <p>
              Gerencie seus dados pessoais, segurança da conta, notificações e
              dispositivos conectados.
            </p>
          </div>

          <div className={styles.estadoConta}>
            <IoCheckmarkCircleOutline size={22} />
            Conta ativa
          </div>
        </div>

        <nav className={styles.abasConfiguracao} aria-label="Configurações">
          {ABAS.map((aba) => {
            const Icone = aba.icone;

            return (
              <button
                key={aba.chave}
                type="button"
                className={abaAtiva === aba.chave ? styles.abaAtiva : ""}
                onClick={() => {
                  setAbaAtiva(aba.chave);
                  setMensagemSalva("");
                }}
              >
                <Icone size={19} />
                {aba.rotulo}
              </button>
            );
          })}
        </nav>

        {mensagemSalva && (
          <div className={styles.mensagemSucesso}>
            <IoCheckmarkCircleOutline size={20} />
            {mensagemSalva}
          </div>
        )}

        {mensagemErro && (
          <div className={styles.mensagemErro}>
            <IoAlertCircleOutline size={20} />
            {mensagemErro}
          </div>
        )}

        {abaAtiva === "perfil" && (
          <div className={styles.gradePerfil}>
            <form
              className={`${styles.cartao} ${styles.cartaoPerfil}`}
              onSubmit={salvarDados}
            >
              <header className={styles.cabecalhoCartao}>
                <IoPersonCircleOutline size={28} />
                <div>
                  <h3>Informações pessoais</h3>
                  <p>Dados usados para identificar sua conta no Aquamarine.</p>
                </div>
              </header>

              <div className={styles.resumoPerfil}>
                <div className={styles.avatarUsuario}>
                  {iniciaisUsuario || <IoPersonCircleOutline size={36} />}
                </div>

                <div>
                  <h4>{dadosUsuario.nomeCompleto || "Seu perfil"}</h4>
                  <span>Perfil residencial</span>
                </div>
              </div>

              <div className={styles.gradeCampos}>
                <label className={styles.campoFormulario}>
                  Nome completo
                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={dadosUsuario.nomeCompleto}
                    onChange={(evento) =>
                      atualizarCampo("nomeCompleto", evento.target.value)
                    }
                  />
                </label>

                <label className={styles.campoFormulario}>
                  Nome de exibição
                  <input
                    type="text"
                    placeholder="Como você quer ser chamado"
                    value={dadosUsuario.nomeExibicao}
                    onChange={(evento) =>
                      atualizarCampo("nomeExibicao", evento.target.value)
                    }
                  />
                </label>

                <label
                  className={`${styles.campoFormulario} ${
                    errosContato.email ? styles.campoComErro : ""
                  }`}
                >
                  E-mail
                  <input
                    type="email"
                    placeholder="seuemail@gmail.com"
                    value={dadosUsuario.email}
                    maxLength={80}
                    aria-invalid={Boolean(errosContato.email)}
                    onChange={(evento) =>
                      atualizarCampo("email", evento.target.value)
                    }
                  />
                  {errosContato.email && (
                    <small className={styles.mensagemErroCampo}>
                      {errosContato.email}
                    </small>
                  )}
                </label>

                <label
                  className={`${styles.campoFormulario} ${
                    errosContato.telefone ? styles.campoComErro : ""
                  }`}
                >
                  Telefone
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={dadosUsuario.telefone}
                    inputMode="numeric"
                    maxLength={15}
                    aria-invalid={Boolean(errosContato.telefone)}
                    onChange={(evento) =>
                      atualizarCampo("telefone", evento.target.value)
                    }
                  />
                  {errosContato.telefone && (
                    <small className={styles.mensagemErroCampo}>
                      {errosContato.telefone}
                    </small>
                  )}
                </label>
              </div>

              <div className={styles.acoesFormulario}>
                <button type="submit" className={styles.botaoPrincipal}>
                  <IoSaveOutline size={18} />
                  Salvar alterações
                </button>
              </div>
            </form>

            <aside className={styles.colunaLateral}>
              <article className={styles.cartao}>
                <header className={styles.cabecalhoCartao}>
                  <IoTimeOutline size={26} />
                  <div>
                    <h3>Preferências</h3>
                    <p>Formato de idioma e horário da sua conta.</p>
                  </div>
                </header>

                <div className={styles.gradeCamposUnica}>
                  <label className={styles.campoFormulario}>
                    Idioma
                    <select
                      value={dadosUsuario.idioma}
                      onChange={(evento) =>
                        atualizarCampo("idioma", evento.target.value)
                      }
                    >
                      <option value="pt-BR">Português do Brasil</option>
                      <option value="en-US">Inglês</option>
                      <option value="es">Espanhol</option>
                    </select>
                  </label>

                  <label className={styles.campoFormulario}>
                    Fuso horário
                    <select
                      value={dadosUsuario.fusoHorario}
                      onChange={(evento) =>
                        atualizarCampo("fusoHorario", evento.target.value)
                      }
                    >
                      <option value="America/Sao_Paulo">
                        Brasília, São Paulo
                      </option>
                      <option value="America/Manaus">Manaus</option>
                      <option value="America/Recife">Recife</option>
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  className={`${styles.botaoSecundario} ${styles.botaoPreferencias}`}
                  onClick={salvarPreferencias}
                >
                  <IoSaveOutline size={18} />
                  Salvar preferências
                </button>
              </article>

              <article className={styles.cartaoContato}>
                <div>
                  <IoMailOutline size={22} />
                  <span>{dadosUsuario.email || "E-mail não informado"}</span>
                </div>

                <div>
                  <IoCallOutline size={22} />
                  <span>{dadosUsuario.telefone || "Telefone não informado"}</span>
                </div>
              </article>
            </aside>
          </div>
        )}

        {abaAtiva === "seguranca" && (
          <div className={styles.gradePerfil}>
            <form className={styles.cartao} onSubmit={atualizarSenha}>
              <header className={styles.cabecalhoCartao}>
                <IoKeyOutline size={28} />
                <div>
                  <h3>Segurança da conta</h3>
                  <p>Atualize sua senha e proteja o acesso ao painel.</p>
                </div>
              </header>

              <div className={styles.gradeCampos}>
                <label className={styles.campoFormulario}>
                  Senha atual
                  <input
                    type="password"
                    value={senha.atual}
                    onChange={(evento) =>
                      setSenha((senhaAtual) => ({
                        ...senhaAtual,
                        atual: evento.target.value,
                      }))
                    }
                  />
                </label>

                <label className={styles.campoFormulario}>
                  Nova senha
                  <input
                    type="password"
                    value={senha.nova}
                    onChange={(evento) =>
                      setSenha((senhaAtual) => ({
                        ...senhaAtual,
                        nova: evento.target.value,
                      }))
                    }
                  />
                </label>

                <label className={styles.campoFormulario}>
                  Confirmar nova senha
                  <input
                    type="password"
                    value={senha.confirmacao}
                    onChange={(evento) =>
                      setSenha((senhaAtual) => ({
                        ...senhaAtual,
                        confirmacao: evento.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className={styles.acoesFormulario}>
                <button type="submit" className={styles.botaoPrincipal}>
                  <IoLockClosedOutline size={18} />
                  Atualizar senha
                </button>
              </div>
            </form>

            <aside className={styles.cartao}>
              <header className={styles.cabecalhoCartao}>
                <IoShieldCheckmarkOutline size={28} />
                <div>
                  <h3>Proteção extra</h3>
                  <p>Camadas adicionais para manter sua conta segura.</p>
                </div>
              </header>

              <div className={styles.listaInterruptores}>
                <Interruptor
                  ativo={dadosUsuario.seguranca.doisFatores}
                  titulo="Autenticação em duas etapas"
                  descricao="Solicita uma confirmação extra ao entrar na conta."
                  aoAlternar={() =>
                    salvarPreferenciaAlterada("seguranca", "doisFatores")
                  }
                />

                <Interruptor
                  ativo={dadosUsuario.seguranca.avisoLogin}
                  titulo="Aviso de novo acesso"
                  descricao="Envia uma notificação quando sua conta for acessada."
                  aoAlternar={() =>
                    salvarPreferenciaAlterada("seguranca", "avisoLogin")
                  }
                />
              </div>
            </aside>
          </div>
        )}

        {abaAtiva === "notificacoes" && (
          <div className={styles.cartao}>
            <header className={styles.cabecalhoCartao}>
              <IoNotificationsOutline size={28} />
              <div>
                <h3>Notificações</h3>
                <p>Escolha como você quer receber avisos da sua conta.</p>
              </div>
            </header>

            <div className={styles.gradeInterruptores}>
              <Interruptor
                ativo={dadosUsuario.notificacoes.email}
                titulo="Receber avisos por e-mail"
                descricao="Mensagens importantes serão enviadas para o e-mail cadastrado."
                aoAlternar={() =>
                  salvarPreferenciaAlterada("notificacoes", "email")
                }
              />

              <Interruptor
                ativo={dadosUsuario.notificacoes.whatsapp}
                titulo="Receber avisos por WhatsApp"
                descricao="Use o telefone cadastrado para receber comunicações rápidas."
                aoAlternar={() =>
                  salvarPreferenciaAlterada("notificacoes", "whatsapp")
                }
              />

              <Interruptor
                ativo={dadosUsuario.notificacoes.alertasConta}
                titulo="Alertas da conta"
                descricao="Avise sobre alterações de senha, novos acessos e dados editados."
                aoAlternar={() =>
                  salvarPreferenciaAlterada("notificacoes", "alertasConta")
                }
              />

              <Interruptor
                ativo={dadosUsuario.notificacoes.relatorioMensal}
                titulo="Resumo mensal"
                descricao="Receba um resumo mensal do uso da sua conta."
                aoAlternar={() =>
                  salvarPreferenciaAlterada("notificacoes", "relatorioMensal")
                }
              />
            </div>

            <div className={styles.canaisContato}>
              <div>
                <IoMailOutline size={22} />
                <span>{dadosUsuario.email || "E-mail não informado"}</span>
              </div>

              <div>
                <FaWhatsapp size={22} />
                <span>{dadosUsuario.telefone || "Telefone não informado"}</span>
              </div>
            </div>
          </div>
        )}

        {abaAtiva === "dispositivos" && (
          <div className={styles.cartao}>
            <header className={styles.cabecalhoCartao}>
              <MdOutlineDevicesOther size={30} />
              <div>
                <h3>Dispositivos conectados</h3>
                <p>Acompanhe os aparelhos que acessaram sua conta.</p>
              </div>
            </header>

            <div className={styles.listaDispositivos}>
              {DISPOSITIVOS_CONECTADOS.map((dispositivo) => (
                <article
                  className={styles.itemDispositivo}
                  key={dispositivo.nome}
                >
                  <div className={styles.iconeDispositivo}>
                    <MdOutlineDevicesOther size={24} />
                  </div>

                  <div>
                    <strong>{dispositivo.nome}</strong>
                    <span>{dispositivo.descricao}</span>
                  </div>

                  <div className={styles.acessoDispositivo}>
                    <small>Último acesso</small>
                    <span>{dispositivo.acesso}</span>
                  </div>

                  {dispositivo.atual ? (
                    <span className={styles.seloAtual}>Dispositivo atual</span>
                  ) : (
                    <button type="button" className={styles.botaoSecundario}>
                      Remover acesso
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default ConfiguracoesPage;
