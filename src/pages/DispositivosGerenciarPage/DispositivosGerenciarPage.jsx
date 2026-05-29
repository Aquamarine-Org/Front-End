import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@src/layouts/DashboardLayout/DashboardLayout.jsx";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiEdit3,
  FiRefreshCcw,
  FiSave,
  FiX,
} from "react-icons/fi";
import { LuGauge } from "react-icons/lu";

import styles from "./DispositivosGerenciarPage.module.css";

const DISPOSITIVOS_INICIAIS = [
  {
    id: "sensor-cozinha",
    nome: "Sensor da cozinha",
    tipo: "Sensor",
    local: "Cozinha",
    leitura: "12 MPa de pressão",
    ultimaCalibracao: "Hoje",
    status: "Ativo",
  },
  {
    id: "sensor-sala",
    nome: "Sensor da sala",
    tipo: "Sensor",
    local: "Sala",
    leitura: "Há 1 dia",
    ultimaCalibracao: "Ontem",
    status: "Ativo",
  },
  {
    id: "sensor-caixa-agua",
    nome: "Sensor da caixa d'água",
    tipo: "Sensor",
    local: "Caixa d'água",
    leitura: "Há 2 dias",
    ultimaCalibracao: "13/04/2025",
    status: "Atenção",
  },
  {
    id: "valvula-principal",
    nome: "Válvula principal",
    tipo: "Válvula",
    local: "Entrada principal",
    leitura: "Há 1 mês",
    ultimaCalibracao: "13/03/2025",
    status: "Ativo",
  },
];

function ModalBase({ children, titulo, descricao, onClose }) {
  return (
    <div className={styles.modalOverlay} role="presentation">
      <section
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className={styles.modalCloseButton}
          aria-label="Fechar modal"
          onClick={onClose}
        >
          <FiX />
        </button>

        <header className={styles.modalHeader}>
          <h2 id="modal-title">{titulo}</h2>
          <p>{descricao}</p>
        </header>

        {children}
      </section>
    </div>
  );
}

function DispositivosGerenciarPage() {
  const navigate = useNavigate();
  const [dispositivos, setDispositivos] = useState(DISPOSITIVOS_INICIAIS);
  const [dispositivoEmEdicao, setDispositivoEmEdicao] = useState(null);
  const [rascunhoDispositivo, setRascunhoDispositivo] = useState(null);
  const [calibracaoAberta, setCalibracaoAberta] = useState(false);
  const [calibrando, setCalibrando] = useState(false);
  const [progressoCalibracao, setProgressoCalibracao] = useState(0);
  const [dispositivosSelecionados, setDispositivosSelecionados] = useState(
    () => DISPOSITIVOS_INICIAIS.map((dispositivo) => dispositivo.id)
  );

  const todosSelecionados = useMemo(
    () => dispositivosSelecionados.length === dispositivos.length,
    [dispositivosSelecionados.length, dispositivos.length]
  );

  useEffect(() => {
    if (!calibrando || progressoCalibracao >= 100) {
      return undefined;
    }

    const timer = setInterval(() => {
      setProgressoCalibracao((progressoAtual) => {
        const proximoProgresso = progressoAtual + 4;

        if (proximoProgresso >= 100) {
          setCalibrando(false);
          return 100;
        }

        return proximoProgresso;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [calibrando, progressoCalibracao]);

  const abrirEdicao = (dispositivo) => {
    setDispositivoEmEdicao(dispositivo);
    setRascunhoDispositivo(dispositivo);
  };

  const voltarParaDispositivos = () => {
    navigate("/dispositivos");
  };

  const fecharEdicao = () => {
    setDispositivoEmEdicao(null);
    setRascunhoDispositivo(null);
  };

  const atualizarRascunho = (campo, valor) => {
    setRascunhoDispositivo((rascunhoAtual) => ({
      ...rascunhoAtual,
      [campo]: valor,
    }));
  };

  const voltarDispositivoOriginal = () => {
    const dispositivoOriginal = DISPOSITIVOS_INICIAIS.find(
      (dispositivo) => dispositivo.id === dispositivoEmEdicao.id
    );

    if (!dispositivoOriginal) {
      return;
    }

    setRascunhoDispositivo({ ...dispositivoOriginal });
  };

  const salvarEdicao = (event) => {
    event.preventDefault();

    setDispositivos((dispositivosAtuais) =>
      dispositivosAtuais.map((dispositivo) =>
        dispositivo.id === dispositivoEmEdicao.id
          ? { ...rascunhoDispositivo }
          : dispositivo
      )
    );
    fecharEdicao();
  };

  const abrirCalibracao = () => {
    setCalibracaoAberta(true);
    setCalibrando(false);
    setProgressoCalibracao(0);
  };

  const fecharCalibracao = () => {
    setCalibracaoAberta(false);
    setCalibrando(false);
    setProgressoCalibracao(0);
  };

  const alternarDispositivoCalibracao = (id) => {
    setDispositivosSelecionados((selecionadosAtuais) =>
      selecionadosAtuais.includes(id)
        ? selecionadosAtuais.filter((dispositivoId) => dispositivoId !== id)
        : [...selecionadosAtuais, id]
    );
  };

  const alternarTodosDispositivos = () => {
    setDispositivosSelecionados(
      todosSelecionados ? [] : dispositivos.map((dispositivo) => dispositivo.id)
    );
  };

  const iniciarCalibracao = () => {
    if (dispositivosSelecionados.length === 0) {
      return;
    }

    setProgressoCalibracao(0);
    setCalibrando(true);
  };

  const calibracaoConcluida = progressoCalibracao === 100 && !calibrando;

  return (
    <DashboardLayout pageTitle="Dispositivos" currentPage="dispositivos">
      <section className={styles.paginaDispositivos}>
        <div className={styles.topoDispositivos}>
          <button
            type="button"
            className={styles.botaoVoltar}
            onClick={voltarParaDispositivos}
          >
            <FiArrowLeft />
            Voltar para dispositivos
          </button>
        </div>

        <article className={styles.painelDispositivos}>
          <header className={styles.cabecalhoPainel}>
            <div>
              <span className={styles.etiquetaPainel}>Gerenciamento</span>
              <h2>Dispositivos cadastrados</h2>
            </div>

            <button
              type="button"
              className={styles.botaoCalibrar}
              onClick={abrirCalibracao}
            >
              <LuGauge />
              Calibrar dispositivos
            </button>
          </header>

          <div className={styles.listaDispositivos}>
            {dispositivos.map((dispositivo) => (
              <article className={styles.itemDispositivo} key={dispositivo.id}>
                <div className={styles.infoDispositivo}>
                  <strong>{dispositivo.nome}</strong>
                  <span>{dispositivo.tipo}</span>
                </div>

                <span className={styles.leituraDispositivo}>
                  {dispositivo.leitura}
                </span>

                <span
                  className={`${styles.statusDispositivo} ${
                    dispositivo.status === "Atenção" ? styles.statusAtencao : ""
                  }`}
                >
                  {dispositivo.status}
                </span>

                <button
                  type="button"
                  className={styles.botaoEditar}
                  aria-label={`Editar ${dispositivo.nome}`}
                  onClick={() => abrirEdicao(dispositivo)}
                >
                  <FiEdit3 />
                </button>
              </article>
            ))}
          </div>
        </article>

        {dispositivoEmEdicao && rascunhoDispositivo && (
          <ModalBase
            titulo="Editar dispositivo"
            descricao="Atualize os dados do dispositivo selecionado."
            onClose={fecharEdicao}
          >
            <form className={styles.formularioModal} onSubmit={salvarEdicao}>
              <label>
                Nome do dispositivo
                <input
                  type="text"
                  value={rascunhoDispositivo.nome}
                  onChange={(event) =>
                    atualizarRascunho("nome", event.target.value)
                  }
                />
              </label>

              <div className={styles.gradeModal}>
                <label>
                  Tipo
                  <select
                    value={rascunhoDispositivo.tipo}
                    onChange={(event) =>
                      atualizarRascunho("tipo", event.target.value)
                    }
                  >
                    <option value="Sensor">Sensor</option>
                    <option value="Válvula">Válvula</option>
                  </select>
                </label>

                <label>
                  Status
                  <select
                    value={rascunhoDispositivo.status}
                    onChange={(event) =>
                      atualizarRascunho("status", event.target.value)
                    }
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Atenção">Atenção</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </label>
              </div>

              <label>
                Local de instalação
                <input
                  type="text"
                  value={rascunhoDispositivo.local}
                  onChange={(event) =>
                    atualizarRascunho("local", event.target.value)
                  }
                />
              </label>

              <div className={styles.gradeModal}>
                <label>
                  Última leitura
                  <input
                    type="text"
                    value={rascunhoDispositivo.leitura}
                    onChange={(event) =>
                      atualizarRascunho("leitura", event.target.value)
                    }
                  />
                </label>

                <label>
                  Última calibração
                  <input
                    type="text"
                    value={rascunhoDispositivo.ultimaCalibracao}
                    onChange={(event) =>
                      atualizarRascunho(
                        "ultimaCalibracao",
                        event.target.value
                      )
                    }
                  />
                </label>
              </div>

              <div className={styles.acoesModal}>
                <button
                  type="button"
                  className={`${styles.botaoModalSecundario} ${styles.botaoOriginal}`}
                  onClick={voltarDispositivoOriginal}
                >
                  <FiRefreshCcw />
                  Voltar ao original
                </button>

                <button
                  type="button"
                  className={styles.botaoModalSecundario}
                  onClick={fecharEdicao}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.botaoModalPrimario}>
                  <FiSave />
                  Salvar edição
                </button>
              </div>
            </form>
          </ModalBase>
        )}

        {calibracaoAberta && (
          <ModalBase
            titulo="Calibrar dispositivos"
            descricao="Selecione quais dispositivos devem passar pela calibração."
            onClose={fecharCalibracao}
          >
            <div className={styles.calibracaoModal}>
              <button
                type="button"
                className={styles.botaoSelecionarTodos}
                onClick={alternarTodosDispositivos}
              >
                {todosSelecionados ? "Desmarcar todos" : "Selecionar todos"}
              </button>

              <div className={styles.listaCalibracao}>
                {dispositivos.map((dispositivo) => (
                  <label key={dispositivo.id} className={styles.itemCalibracao}>
                    <input
                      type="checkbox"
                      checked={dispositivosSelecionados.includes(dispositivo.id)}
                      onChange={() =>
                        alternarDispositivoCalibracao(dispositivo.id)
                      }
                      disabled={calibrando}
                    />
                    <span>
                      <strong>{dispositivo.nome}</strong>
                      <small>{dispositivo.tipo}</small>
                    </span>
                  </label>
                ))}
              </div>

              <div className={styles.areaProgresso}>
                <div className={styles.barraProgresso}>
                  <span style={{ width: `${progressoCalibracao}%` }}></span>
                </div>
                <strong>{progressoCalibracao}%</strong>
                {calibracaoConcluida && (
                  <p>
                    <FiCheckCircle />
                    Calibração concluída com sucesso
                  </p>
                )}
              </div>

              <div className={styles.acoesModal}>
                <button
                  type="button"
                  className={styles.botaoModalSecundario}
                  onClick={fecharCalibracao}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className={styles.botaoModalPrimario}
                  disabled={
                    dispositivosSelecionados.length === 0 || calibrando
                  }
                  onClick={iniciarCalibracao}
                >
                  <FiRefreshCcw />
                  {calibrando ? "Calibrando..." : "Iniciar calibração"}
                </button>
              </div>
            </div>
          </ModalBase>
        )}
      </section>
    </DashboardLayout>
  );
}

export default DispositivosGerenciarPage;
