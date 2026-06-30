import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoAquamarine from "/logo.png";
import { ApiError, apiPost } from "../../lib/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./VerificarEmail.module.css";

function VerificarEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, updateSession } = useAuth();
  const [code, setCode] = useState(Array(6).fill(""));
  const [verificandoEmail, setVerificandoEmail] = useState(false);
  const [reenviandoCodigo, setReenviandoCodigo] = useState(false);
  const [mensagemReenvio, setMensagemReenvio] = useState("");
  const [erro, setErro] = useState("");
  const inputRefs = useRef([]);

  const email = useMemo(
    () => location.state?.email || session?.email || "",
    [location.state?.email, session?.email],
  );

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const nextCode = [...code];
    nextCode[index] = digit;
    setCode(nextCode);
    if (digit && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificarEmail = () => {
    if (verificandoEmail) {
      return;
    }

    const verificationCode = code.join("");
    if (!email) {
      setErro("Não encontramos o e-mail para validar.");
      return;
    }
    if (verificationCode.length !== 6) {
      setErro("Digite os 6 dígitos do código.");
      return;
    }

    setErro("");
    setVerificandoEmail(true);

    apiPost("/auth/verify-email", { email, code: verificationCode })
      .then(() => {
        updateSession?.({ emailVerificado: true });
        const proximaRota =
          location.state?.origem === "cadastro" ? "/informacoes" : "/home";
        navigate(proximaRota, { replace: true });
      })
      .catch((error) => {
        setErro(
          error instanceof ApiError
            ? error.message
            : "Não foi possível verificar o e-mail.",
        );
      })
      .finally(() => {
        setVerificandoEmail(false);
      });
  };

  const handleReenviarCodigo = () => {
    if (reenviandoCodigo) {
      return;
    }

    if (!email) {
      setErro("Não encontramos o e-mail para reenviar o código.");
      return;
    }

    setErro("");
    setReenviandoCodigo(true);

    apiPost("/auth/resend-verification-code", { email })
      .then(() => {
        setCode(Array(6).fill(""));
        setMensagemReenvio("Código reenviado. Confira sua caixa de entrada.");
        inputRefs.current[0]?.focus();
      })
      .catch((error) => {
        setErro(
          error instanceof ApiError
            ? error.message
            : "Não foi possível reenviar o código.",
        );
      })
      .finally(() => {
        setReenviandoCodigo(false);
      });
  };

  return (
    <div className={styles.verificarPage}>
      <section className={styles.verificarContainer}>
        <img
          src={logoAquamarine}
          alt="Logo Aquamarine"
          className={styles.verificarLogo}
        />

        <div className={styles.verificarBackground}>
          <div className={styles.verificarCard}>
            <div className={styles.verificarTitle}>
              <h1>Verifique seu e-mail</h1>
              <p>Um código de 6 dígitos foi enviado para {email || "seu e-mail"}.</p>
            </div>

            <div className={styles.codigoContainer}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  placeholder="-"
                  value={digit}
                  onChange={(event) => handleChange(event.target.value, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                />
              ))}
            </div>

            <button
              type="button"
              className={`${styles.verificarButton} ${
                verificandoEmail ? styles.botaoCarregando : ""
              }`}
              disabled={verificandoEmail}
              aria-busy={verificandoEmail}
              onClick={handleVerificarEmail}
            >
              {verificandoEmail ? "Verificando..." : "Verificar e-mail"}
            </button>

            <button
              type="button"
              className={styles.reenviarButton}
              disabled={reenviandoCodigo}
              onClick={handleReenviarCodigo}
            >
              {reenviandoCodigo ? "Reenviando..." : "Reenviar código"}
            </button>

            {erro ? <p className={styles.reenvioMensagem}>{erro}</p> : null}
            {mensagemReenvio && (
              <p className={styles.reenvioMensagem}>{mensagemReenvio}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerificarEmail;
