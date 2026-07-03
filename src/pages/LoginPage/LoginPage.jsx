import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAquamarine from "/logo.png";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import styles from "./LoginPage.module.css";
import { ApiError, MOCK_DEMO_CREDENTIALS } from "../../lib/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState(MOCK_DEMO_CREDENTIALS.email);
  const [senha, setSenha] = useState(MOCK_DEMO_CREDENTIALS.password);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [estaEntrando, setEstaEntrando] = useState(false);
  const [erroLogin, setErroLogin] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    if (estaEntrando) {
      return;
    }

    setErroLogin("");
    setEstaEntrando(true);

    try {
      const session = await login({ email, password: senha });
      navigate(session.emailVerificado ? "/home" : "/verificar-email", {
        state: { origem: "login", email: session.email },
      });
    } catch (error) {
      setErroLogin(
        error instanceof ApiError
          ? error.message
          : "Não foi possível entrar. Verifique seus dados e tente novamente.",
      );
    } finally {
      setEstaEntrando(false);
    }
  };

  const handleGoogleLogin = () => {
    setErroLogin("Login com Google indisponível nesta demonstração.");
  };

  return (
    <div className={styles.loginPage}>
      <section className={styles.loginContainer}>
        <div className={styles.loginBanner}>
          <div className={styles.loginBannerContent}>
            <h2>Bem-vindo de volta</h2>
            <p>Faça login para continuar</p>
          </div>
        </div>

        <div className={styles.loginContent}>
          <img
            src={logoAquamarine}
            alt="Logo Aquamarine"
            className={styles.loginLogo}
          />

          <div className={styles.loginTitle}>
            <h1>Bem-vindo de volta</h1>
            <p>Acesso seguro a sistemas de controle de precisão</p>
          </div>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Entre com seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <div className={styles.passwordInput}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <IoEyeOffSharp /> : <IoEyeSharp />}
                </button>
              </div>
            </div>

            {erroLogin ? (
              <p style={{ color: "#ef4444", marginTop: "-0.5rem" }}>
                {erroLogin}
              </p>
            ) : null}

            <button
              type="submit"
              className={`${styles.loginButton} ${
                estaEntrando ? styles.botaoCarregando : ""
              }`}
              disabled={estaEntrando}
              aria-busy={estaEntrando}
            >
              {estaEntrando ? "Entrando..." : "Login"}
            </button>
          </form>

          <p style={{ marginTop: "-0.25rem", color: "#64748b", fontSize: "0.92rem" }}>
            Acesso de demonstração: <strong>demo@aquamarine.com</strong> /{" "}
            <strong>Demo123!</strong>
          </p>

          <div className={styles.divider}>
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <button
            type="button"
            className={styles.googleButton}
            onClick={handleGoogleLogin}
            disabled={estaEntrando}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className={styles.googleIcon}
            />
            Entrar com Google
          </button>

          <p className={styles.registerText}>
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
