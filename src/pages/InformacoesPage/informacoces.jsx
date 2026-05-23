import { useState } from "react";
import logoAquamarine from "/logo.png";

import styles from "./InformacoesPage.module.css";

function InformacoesPage() {
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");

  const formatWithMask = (value, mask) => {
    const digits = value.replace(/\D/g, "");
    let formatted = "";
    let digitIndex = 0;

    for (const maskChar of mask) {
      if (maskChar === "0") {
        if (digitIndex >= digits.length) break;
        formatted += digits[digitIndex++];
      } else if (digitIndex < digits.length) {
        formatted += maskChar;
      }
    }

    return formatted;
  };

  const handleCpfChange = (value) => {
    setCpf(formatWithMask(value, "000.000.000-00"));
  };

  const handleCepChange = (value) => {
    setCep(formatWithMask(value, "00000-000"));
  };

  const handleTelefoneChange = (value) => {
    setTelefone(formatWithMask(value, "00 00000-0000"));
  };

  return (
    <div className={styles.informacoesPage}>
      <img
        src={logoAquamarine}
        alt="Logo Aquamarine"
        className={styles.informacoesLogo}
      />

      <section className={styles.informacoesBackground}>
        <div className={styles.informacoesCard}>
          <div className={styles.informacoesTitle}>
            <h1>Informe seus dados adicionais</h1>
            <p>
              Precisamos de mais informações antes de finalizar seu cadastro
            </p>
          </div>

          <form className={styles.informacoesForm}>
            <div className={styles.inputGroup}>
              <label>CPF</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={14}
                placeholder="000.000.000-00"
                value={cpf}
                onChange={(event) => handleCpfChange(event.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Endereço completo</label>
              <input
                type="text"
                placeholder="Digite seu endereço"
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>CEP</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={9}
                placeholder="00000-000"
                value={cep}
                onChange={(event) => handleCepChange(event.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Telefone</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={14}
                placeholder="00 00000-0000"
                value={telefone}
                onChange={(event) => handleTelefoneChange(event.target.value)}
              />
            </div>

            <button type="submit" className={styles.informacoesButton}>
              Cadastrar-se
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default InformacoesPage;
