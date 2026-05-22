import { useState } from "react";
import logoAquamarine from "/public/logo.png";

import "./InformacoesPage.css";

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
    <div className="informacoes-page">
      <img
        src={logoAquamarine}
        alt="Logo Aquamarine"
        className="informacoes-logo"
      />

      <section className="informacoes-background">
        <div className="informacoes-card">
          <div className="informacoes-title">
            <h1>Entre com suas informações adicionais</h1>
            <p>
              Precisamos de mais informações antes de finalizar seu cadastro
            </p>
          </div>

          <form className="informacoes-form">
            <div className="input-group">
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

            <div className="input-group">
              <label>Endereço Completo</label>
              <input
                type="text"
                placeholder="Entre com seu endereço"
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
              />
            </div>

            <div className="input-group">
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

            <div className="input-group">
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

            <button type="submit" className="informacoes-button">
              Cadastrar-se
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default InformacoesPage;
