import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import logoAquamarine from "/logo.png";
import styles from "./CadastroPage.module.css";
import { ApiError } from "../../lib/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

function CadastroPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [enviandoCadastro, setEnviandoCadastro] = useState(false);
  const [erroCadastro, setErroCadastro] = useState("");

  const handleCpfChange = (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    setCpf(value);
  };

  const handleCadastro = async (event) => {
    event.preventDefault();

    if (enviandoCadastro) {
      return;
    }

    setErroCadastro("");
    setEnviandoCadastro(true);

    try {
      await register({
        name: nome,
        email,
        password: senha,
        confirmPassword: confirmarSenha,
        cpf: cpf.replace(/\D/g, ""),
        completeAddress: "",
        cep: "",
        phone: telefone,
      });

      navigate("/verificar-email", { state: { origem: "cadastro" } });
    } catch (error) {
      setErroCadastro(
        error instanceof ApiError
          ? error.message
          : "Não foi possível concluir o cadastro.",
      );
    } finally {
      setEnviandoCadastro(false);
    }
  };

  const handleGoogleCadastro = () => {
    setErroCadastro("Cadastro com Google ainda não está conectado ao backend.");
  };

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

          <form className={styles.cadastroForm} onSubmit={handleCadastro}>
            <div className={styles.inputGroup}>
              <label>Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>CPF</label>
              <input
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={handleCpfChange}
                maxLength={14}
                inputMode="numeric"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Telefone</label>
              <input
                type="tel"
                placeholder="Digite seu telefone"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
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

            <div className={styles.inputGroup}>
              <label>Confirmar senha</label>
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                required
              />
            </div>

            {erroCadastro ? (
              <p style={{ color: "#ef4444", marginTop: "-0.5rem" }}>
                {erroCadastro}
              </p>
            ) : null}

            <button
              type="submit"
              className={`${styles.cadastroButton} ${
                enviandoCadastro ? styles.botaoCarregando : ""
              }`}
              disabled={enviandoCadastro}
              aria-busy={enviandoCadastro}
            >
              {enviandoCadastro ? "Enviando código..." : "Cadastrar-se"}
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
            onClick={handleGoogleCadastro}
            disabled={enviandoCadastro}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className={styles.googleIcon}
            />
            Entrar com Google
          </button>

          <p className={styles.loginText}>
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
        </div>

        <div className={styles.cadastroBanner}>
          <div className={styles.cadastroBannerContent}>
            <h2>Vamos começar</h2>
            <p>Se cadastre para continuar</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CadastroPage;
