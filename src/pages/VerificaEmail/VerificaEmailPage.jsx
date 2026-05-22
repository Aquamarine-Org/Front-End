import { useRef, useState } from "react";
import logoAquamarine from "/logo.png";
import "./VerificarEmail.css";

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
    <div className="verificar-page">
      <section className="verificar-container">
        <img
          src={logoAquamarine}
          alt="Logo Aquamarine"
          className="verificar-logo"
        />

        <div className="verificar-background">
          <div className="verificar-card">
            <div className="verificar-title">
              <h1>Verifique seu email</h1>
              <p>Um código de 6 dígitos</p>
            </div>

            <div className="codigo-container">
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

            <button type="button" className="verificar-button">
              Verificar email
            </button>

            <button type="button" className="reenviar-button">
              Reenviar código
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerificarEmail;
