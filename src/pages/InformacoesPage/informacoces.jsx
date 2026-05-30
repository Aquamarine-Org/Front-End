import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiHome, FiX } from "react-icons/fi";
import logoAquamarine from "/logo.png";

import styles from "./InformacoesPage.module.css";

function InformacoesPage() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");
  const [perfilResidenciaSalvo, setPerfilResidenciaSalvo] = useState(false);
  const [salvandoPerfilResidencia, setSalvandoPerfilResidencia] =
    useState(false);
  const [mostrarModalResidencia, setMostrarModalResidencia] = useState(false);
  const [perfilResidencia, setPerfilResidencia] = useState({
    moradores: "",
    comodos: "",
    banheiros: "",
    pontosAgua: "",
    caixaAgua: "",
    areaExterna: "",
    maiorUso: "",
    observacoes: "",
  });

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

  const handlePerfilResidenciaChange = (campo, valor) => {
    setPerfilResidencia((perfilAtual) => ({
      ...perfilAtual,
      [campo]: valor,
    }));
  };

  const dadosPessoaisValidos = () =>
    cpf.length === 14 &&
    endereco.trim().length >= 5 &&
    cep.length === 9 &&
    telefone.length === 13;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!dadosPessoaisValidos()) {
      setErroCadastro(
        "Preencha todos os dados corretamente antes de continuar.",
      );
      return;
    }

    setErroCadastro("");
    setPerfilResidenciaSalvo(false);
    setMostrarModalResidencia(true);
  };

  const fecharModalResidencia = () => {
    setMostrarModalResidencia(false);
    document
      .getElementById("dados-pessoais")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const salvarPerfilResidencia = (event) => {
    event.preventDefault();

    if (!dadosPessoaisValidos()) {
      setErroCadastro(
        "Preencha seus dados pessoais antes de salvar o perfil da residência.",
      );
      document
        .getElementById("dados-pessoais")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (salvandoPerfilResidencia) {
      return;
    }

    const dadosCadastro = {
      dadosPessoais: {
        cpf,
        endereco: endereco.trim(),
        cep,
        telefone,
      },
      perfilResidencia,
      atualizadoEm: new Date().toISOString(),
    };

    setSalvandoPerfilResidencia(true);
    window.setTimeout(() => {
      localStorage.setItem(
        "aquamarine-cadastro-complementar",
        JSON.stringify(dadosCadastro),
      );

      setPerfilResidenciaSalvo(true);
      setSalvandoPerfilResidencia(false);
      setMostrarModalResidencia(true);
      window.setTimeout(() => navigate("/home"), 1400);
    }, 650);
  };

  useEffect(() => {
    document.body.style.overflow = mostrarModalResidencia ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mostrarModalResidencia]);

  const finalizarCadastro = () => {
    navigate("/home");
  };

  return (
    <div className={styles.informacoesPage}>
      <section className={styles.informacoesContainer}>
        <img
          src={logoAquamarine}
          alt="Logo Aquamarine"
          className={styles.informacoesLogo}
        />

        <div className={styles.informacoesBackground}>
          <div id="dados-pessoais" className={styles.informacoesCard}>
            <div className={styles.informacoesTitle}>
              <h1>Informe seus dados adicionais</h1>
              <p>
                Precisamos de mais informações antes de finalizar seu cadastro
              </p>
            </div>

            <form className={styles.informacoesForm} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  type="tel"
                  inputMode="numeric"
                  maxLength={14}
                  placeholder="000.000.000-00"
                  value={cpf}
                  required
                  onChange={(event) => handleCpfChange(event.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="endereco">Endereço completo</label>
                <input
                  id="endereco"
                  type="text"
                  placeholder="Digite seu endereço"
                  value={endereco}
                  required
                  onChange={(event) => setEndereco(event.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cep">CEP</label>
                <input
                  id="cep"
                  type="tel"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="00000-000"
                  value={cep}
                  required
                  onChange={(event) => handleCepChange(event.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={13}
                  placeholder="00 00000-0000"
                  value={telefone}
                  required
                  onChange={(event) => handleTelefoneChange(event.target.value)}
                />
              </div>

              {erroCadastro && (
                <p className={styles.mensagemErro}>{erroCadastro}</p>
              )}

              <button type="submit" className={styles.informacoesButton}>
                Continuar para dados da casa
              </button>
            </form>
          </div>
        </div>
      </section>

      {mostrarModalResidencia && (
        <div className={styles.modalOverlay}>
          <section
            id="perfil-residencia"
            className={`${styles.modalCard} ${styles.residenciaCard}`}
            aria-labelledby="perfil-residencia-titulo"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className={styles.modalClose}
              aria-label="Fechar formulário"
              onClick={fecharModalResidencia}
            >
              <FiX />
            </button>

            <header className={styles.modalHeader}>
              <span className={styles.modalIcone}>
                <FiHome />
              </span>
              <div>
                <h2 id="perfil-residencia-titulo">Perfil da sua residência</h2>
                <p>
                  Essas informações ajudam o Aquamarine a entender o consumo de
                  água da casa e identificar comportamentos fora do padrão.
                </p>
              </div>
            </header>

            {perfilResidenciaSalvo ? (
              <div className={styles.estadoSalvo}>
                <FiCheckCircle />
                <h3>Informações salvas com sucesso</h3>
                <p>
                  O formulário ficará disponível para integração quando o
                  backend do projeto for criado.
                </p>
                <button
                  type="button"
                  className={styles.botaoModalPrimario}
                  onClick={finalizarCadastro}
                >
                  Finalizar
                </button>
              </div>
            ) : (
              <form
                className={styles.formularioResidencia}
                onSubmit={salvarPerfilResidencia}
              >
                <div className={styles.modalGrid}>
                  <label>
                    Quantas pessoas moram na casa?
                    <input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="Ex: 4"
                      value={perfilResidencia.moradores}
                      required
                      onChange={(event) =>
                        handlePerfilResidenciaChange(
                          "moradores",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label>
                    Quantos cômodos a casa possui?
                    <input
                      type="number"
                      min="1"
                      max="40"
                      placeholder="Ex: 8"
                      value={perfilResidencia.comodos}
                      required
                      onChange={(event) =>
                        handlePerfilResidenciaChange(
                          "comodos",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label>
                    Quantos banheiros existem?
                    <input
                      type="number"
                      min="1"
                      max="15"
                      placeholder="Ex: 2"
                      value={perfilResidencia.banheiros}
                      required
                      onChange={(event) =>
                        handlePerfilResidenciaChange(
                          "banheiros",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label>
                    Quantos pontos de água existem?
                    <input
                      type="number"
                      min="1"
                      max="80"
                      placeholder="Torneiras, chuveiros e descargas"
                      value={perfilResidencia.pontosAgua}
                      required
                      onChange={(event) =>
                        handlePerfilResidenciaChange(
                          "pontosAgua",
                          event.target.value,
                        )
                      }
                    />
                  </label>

                  <label>
                    A casa possui caixa d'água?
                    <select
                      value={perfilResidencia.caixaAgua}
                      required
                      onChange={(event) =>
                        handlePerfilResidenciaChange(
                          "caixaAgua",
                          event.target.value,
                        )
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </label>

                  <label>
                    Existe área externa com torneira?
                    <select
                      value={perfilResidencia.areaExterna}
                      required
                      onChange={(event) =>
                        handlePerfilResidenciaChange(
                          "areaExterna",
                          event.target.value,
                        )
                      }
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </label>
                </div>

                <label className={styles.campoCompleto}>
                  Em qual período a casa mais usa água?
                  <select
                    value={perfilResidencia.maiorUso}
                    required
                    onChange={(event) =>
                      handlePerfilResidenciaChange(
                        "maiorUso",
                        event.target.value,
                      )
                    }
                  >
                    <option value="">Selecione o período</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                    <option value="madrugada">Madrugada</option>
                  </select>
                </label>

                <label className={styles.campoCompleto}>
                  Alguma observação importante?
                  <textarea
                    rows={3}
                    placeholder="Ex: jardim regado à noite, lavanderia usada todos os dias, casa com idosos..."
                    value={perfilResidencia.observacoes}
                    onChange={(event) =>
                      handlePerfilResidenciaChange(
                        "observacoes",
                        event.target.value,
                      )
                    }
                  />
                </label>

                <div className={styles.acoesModal}>
                  <button
                    type="button"
                    className={styles.botaoModalSecundario}
                    onClick={fecharModalResidencia}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className={`${styles.botaoModalPrimario} ${
                      salvandoPerfilResidencia ? styles.botaoCarregando : ""
                    }`}
                    disabled={salvandoPerfilResidencia}
                    aria-busy={salvandoPerfilResidencia}
                  >
                    {salvandoPerfilResidencia
                      ? "Salvando..."
                      : "Salvar formulário"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default InformacoesPage;
