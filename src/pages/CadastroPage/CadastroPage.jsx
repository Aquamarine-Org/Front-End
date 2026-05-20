import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import logoAquamarine from "/logo.png";

import "./CadastroPage.css";

function CadastroPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="cadastro-page">
      <section className="cadastro-container">
        <div className="cadastro-content">
          <img
            src={logoAquamarine}
            alt="Logo Aquamarine"
            className="cadastro-logo"
          />

          <div className="cadastro-title">
            <h1>Vamos começar?</h1>
            <p>Acesso seguro a sistemas de controle de precisão</p>
          </div>

          <form className="cadastro-form">
            <div className="input-group">
              <label>Nome</label>
              <input type="text" placeholder="Digite seu nome" />
            </div>

            <div className="input-group">
              <label>E-mail</label>
              <input type="email" placeholder="Digite seu e-mail" />
            </div>

            <div className="input-group">
              <label>CPF</label>
              <input type="text" placeholder="Digite seu CPF" />
            </div>

            <div className="input-group">
              <label>Senha</label>

              <div className="password-input">
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

            <button type="submit" className="cadastro-button">
              Cadastrar-se
            </button>
          </form>

          <div className="divider">
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <button className="google-button">Entrar com Google</button>

          <p className="login-text">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
        </div>

        <div className="cadastro-banner">
          <div>
            <h2>Vamos começar</h2>
            <p>Se cadastre para continuar</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CadastroPage;