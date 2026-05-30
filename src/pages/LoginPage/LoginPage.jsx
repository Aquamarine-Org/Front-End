import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAquamarine from "/logo.png";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [estaEntrando, setEstaEntrando] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    if (estaEntrando) {
      return;
    }

    setEstaEntrando(true);
    window.setTimeout(() => {
      navigate("/verificar-email", { state: { origem: "login" } });
    }, 850);
  };

  const handleGoogleLogin = () => {
    if (estaEntrando) {
      return;
    }

    setEstaEntrando(true);
    window.setTimeout(() => {
      navigate("/verificar-email", { state: { origem: "login" } });
    }, 850);
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
              <input type="email" placeholder="Entre com seu e-mail" />
            </div>

            <div className={styles.inputGroup}>
              <label>Senha</label>
              <div className={styles.passwordInput}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <IoEyeOffSharp /> : <IoEyeSharp />}
                </button>
              </div>
            </div>

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
            {estaEntrando ? "Conectando..." : "Entrar com Google"}
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
