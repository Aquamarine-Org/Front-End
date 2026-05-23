import { useRef, useState } from "react";
import logoAquamarine from "/logo.png";
import styles from "./VerificarEmail.module.css";

function VerificarEmail() {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

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
              <p>Um código de 6 dígitos</p>
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

            <button type="button" className={styles.verificarButton}>
              Verificar e-mail
            </button>

            <button type="button" className={styles.reenviarButton}>
              Reenviar código
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerificarEmail;
