import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import logoAquamarine from "/logo.png";
import styles from "./CadastroPage.module.css";

function CadastroPage() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className={styles.cadastroPage}>
      <section className={styles.cadastroContainer}>
        <div className={styles.cadastroContent}>
          <img
            src={logoAquamarine}
            alt="Logo Aquamarine"
            className={styles.cadastroLogo}
          />

          <div className={styles.cadastroTitle}>
            <h1>Vamos começar?</h1>
            <p>Acesso seguro a sistemas de controle de precisão</p>
          </div>

          <form className={styles.cadastroForm}>
            <div className={styles.inputGroup}>
              <label>Nome</label>
              <input type="text" placeholder="Digite seu nome" />
            </div>

            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input type="email" placeholder="Digite seu e-mail" />
            </div>

            <div className={styles.inputGroup}>
              <label>CPF</label>
              <input type="text" placeholder="Digite seu CPF" />
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

            <button type="submit" className={styles.cadastroButton}>
              Cadastrar-se
            </button>
          </form>

          <div className={styles.divider}>
            <span></span>
            <p>ou</p>
            <span></span>
          </div>

          <button className={styles.googleButton}>Entrar com Google</button>

          <p className={styles.loginText}>
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
        </div>

        <div className={styles.cadastroBanner}>
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
