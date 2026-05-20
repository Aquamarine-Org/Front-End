import { Link } from "react-router-dom";
import logoAquamarine from "@assets/logo.png";

import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <section className="login-container">
        <div className="login-banner">
          <div>
            <h2>Bem-vindo de volta</h2>
            <p>Faça login para continuar</p>
          </div>
        </div>

        <div className="login-content">
          <img
            src={logoAquamarine}
            alt="Logo Aquamarine"
            className="login-logo"
          />

          <div className="login-title">
            <h1>Bem-vindo de volta</h1>
            <p>Acesso seguro a sistemas de controle de precisão</p>
          </div>

          <form className="login-form">
            <div className="input-group">
              <label>E-mail</label>
              <input type="email" placeholder="Entre com seu e-mail" />
            </div>

            <div className="input-group">
              <label>Senha</label>

              <div className="password-input">
                <input type="password" placeholder="Digite sua senha" />

                <button type="button">
                  <i className="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <button className="google-button">Entrar com Google</button>

          <p className="register-text">
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
