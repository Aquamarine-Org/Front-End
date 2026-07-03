import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUp,
  FiGift,
  FiRefreshCcw,
  FiShield,
  FiSlash,
  FiStar,
} from "react-icons/fi";
import styles from "./BrindeGamePage.module.css";

const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;
const TARGET_SCORE = 8;
const START_TIME = 45;
const START_LIVES = 3;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const sameCell = (a, b) => a.x === b.x && a.y === b.y;

const randomPosition = (blocked = []) => {
  const options = [];

  for (let y = 0; y < BOARD_HEIGHT; y += 1) {
    for (let x = 0; x < BOARD_WIDTH; x += 1) {
      if (!blocked.some((cell) => cell.x === x && cell.y === y)) {
        options.push({ x, y });
      }
    }
  }

  return options[Math.floor(Math.random() * options.length)] || { x: 0, y: 0 };
};

const createInitialGame = () => {
  const player = { x: 3, y: 6 };
  const drop = randomPosition([player]);
  const leak = randomPosition([player, drop]);

  return {
    status: "ready",
    player,
    drop,
    leak,
    score: 0,
    lives: START_LIVES,
    time: START_TIME,
    message: "Pressione Espaço para iniciar a dinâmica.",
  };
};

const movePlayer = (state, direction) => {
  if (state.status !== "playing") {
    return state;
  }

  const nextPlayer = {
    x: clamp(
      state.player.x +
        (direction === "left" ? -1 : direction === "right" ? 1 : 0),
      0,
      BOARD_WIDTH - 1,
    ),
    y: clamp(
      state.player.y +
        (direction === "up" ? -1 : direction === "down" ? 1 : 0),
      0,
      BOARD_HEIGHT - 1,
    ),
  };

  if (sameCell(nextPlayer, state.leak)) {
    const nextLives = state.lives - 1;
    const nextLeak = randomPosition([nextPlayer, state.drop]);

    return {
      ...state,
      player: nextPlayer,
      leak: nextLeak,
      lives: nextLives,
      status: nextLives <= 0 ? "lost" : "playing",
      message:
        nextLives <= 0
          ? "O vazamento venceu. Aperte Espaço para tentar novamente."
          : "Você pisou no vazamento. Desvie e continue.",
    };
  }

  return {
    ...state,
    player: nextPlayer,
    message:
      sameCell(nextPlayer, state.drop) || sameCell(nextPlayer, state.leak)
        ? "Boa! Pressione Espaço para interagir."
        : "Continue explorando a grade.",
  };
};

const applySpaceAction = (state) => {
  if (state.status === "ready" || state.status === "lost" || state.status === "won") {
    return createInitialGame();
  }

  if (sameCell(state.player, state.drop)) {
    const nextScore = state.score + 1;
    const reachedTarget = nextScore >= TARGET_SCORE;
    const nextDrop = reachedTarget
      ? state.drop
      : randomPosition([state.player, state.leak]);

    return {
      ...state,
      score: nextScore,
      drop: nextDrop,
      status: reachedTarget ? "won" : "playing",
      message: reachedTarget
        ? "Missão concluída. O brinde foi desbloqueado!"
        : "Gota coletada. Busque a próxima!",
    };
  }

  if (sameCell(state.player, state.leak)) {
    const nextScore = state.score + 2;
    const reachedTarget = nextScore >= TARGET_SCORE;
    const nextLeak = randomPosition([state.player, state.drop]);

    return {
      ...state,
      score: nextScore,
      leak: nextLeak,
      status: reachedTarget ? "won" : "playing",
      message: reachedTarget
        ? "Vazamento selado. Brinde liberado!"
        : "Vazamento selado com sucesso.",
    };
  }

  return {
    ...state,
    message: "Fique em cima de uma gota azul ou do vazamento vermelho e pressione Espaço.",
  };
};

function BrindeGamePage() {
  const [game, setGame] = useState(createInitialGame);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
      }

      setGame((current) => {
        if (event.key === "ArrowUp") return movePlayer(current, "up");
        if (event.key === "ArrowDown") return movePlayer(current, "down");
        if (event.key === "ArrowLeft") return movePlayer(current, "left");
        if (event.key === "ArrowRight") return movePlayer(current, "right");

        if (event.key === " ") {
          return applySpaceAction(current);
        }

        return current;
      });
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (game.status !== "playing") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setGame((current) => {
        if (current.status !== "playing") {
          return current;
        }

        if (current.time <= 1) {
          return {
            ...current,
            time: 0,
            status: "lost",
            message: "O tempo acabou. Aperte Espaço para jogar outra vez.",
          };
        }

        return {
          ...current,
          time: current.time - 1,
        };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [game.status]);

  const cells = useMemo(() => {
    const board = [];

    for (let y = 0; y < BOARD_HEIGHT; y += 1) {
      for (let x = 0; x < BOARD_WIDTH; x += 1) {
        const isPlayer = game.player.x === x && game.player.y === y;
        const isDrop = game.drop.x === x && game.drop.y === y;
        const isLeak = game.leak.x === x && game.leak.y === y;

        board.push(
          <button
            key={`${x}-${y}`}
            type="button"
            className={`${styles.cell} ${isPlayer ? styles.player : ""} ${
              isDrop ? styles.drop : ""
            } ${isLeak ? styles.leak : ""}`}
            aria-label={`Linha ${y + 1}, coluna ${x + 1}`}
            onClick={() => {
              setGame((current) => ({
                ...current,
                message:
                  current.status === "playing"
                    ? "Use as setas para mover e o Espaço para interagir."
                    : current.message,
              }));
            }}
          >
            {isPlayer ? <span className={styles.playerDot} /> : null}
            {isDrop ? <span className={styles.dropDot} /> : null}
            {isLeak ? <span className={styles.leakDot} /> : null}
          </button>,
        );
      }
    }

    return board;
  }, [game]);

  const progress = (game.score / TARGET_SCORE) * 100;
  const statusLabel =
    game.status === "won"
      ? "Brinde liberado"
      : game.status === "lost"
        ? "Tente novamente"
        : game.status === "playing"
          ? "Em andamento"
          : "Pronto para jogar";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.kicker}>
            <FiShield aria-hidden="true" />
            Dinâmica da banca
          </span>

          <h1>Salve as gotas, controle o vazamento e ganhe o brinde.</h1>

          <p>
            Um jogo simples, rápido e visualmente alinhado com a Aquamarine.
            Use as setas para mover e o Espaço para coletar a gota azul ou selar
            o vazamento vermelho.
          </p>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setGame(createInitialGame())}
            >
              <FiRefreshCcw aria-hidden="true" />
              {game.status === "playing" ? "Reiniciar partida" : "Começar jogo"}
            </button>

            <Link to="/" className={styles.secondaryButton}>
              Voltar para a home
            </Link>
          </div>

          <div className={styles.instructions}>
            <div>
              <FiArrowUp aria-hidden="true" />
              <span>Setas movem</span>
            </div>
            <div>
              <FiStar aria-hidden="true" />
              <span>Espaço interage</span>
            </div>
            <div>
              <FiGift aria-hidden="true" />
              <span>8 pontos liberam o brinde</span>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <span className={styles.summaryTag}>{statusLabel}</span>
              <span className={styles.summaryTime}>{game.time}s</span>
            </div>

            <div className={styles.statRow}>
              <div>
                <span>Pontos</span>
                <strong>{game.score}</strong>
              </div>
              <div>
                <span>Vidas</span>
                <strong>{game.lives}</strong>
              </div>
            </div>

            <div className={styles.progressTrack} aria-hidden="true">
              <span style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>

            <p className={styles.summaryMessage}>{game.message}</p>
          </div>

          {game.status === "won" ? (
            <div className={`${styles.rewardCard} ${styles.rewardCardWin}`}>
              <FiGift aria-hidden="true" />
              <div>
                <h2>Brinde desbloqueado</h2>
                <p>
                  Parabéns. Você completou a dinâmica e pode entregar o mimo da
                  banca.
                </p>
              </div>
            </div>
          ) : null}

          {game.status === "lost" ? (
            <div className={`${styles.rewardCard} ${styles.rewardCardLost}`}>
              <FiSlash aria-hidden="true" />
              <div>
                <h2>Quase lá</h2>
                <p>
                  Reinicie a partida e tente pegar as gotas antes que o tempo
                  acabe.
                </p>
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      <section className={styles.boardSection} aria-label="Tabuleiro do jogo">
        <div className={styles.boardHeader}>
          <div>
            <p>Tabuleiro Aquamarine</p>
            <h2>Desafio do fluxo</h2>
          </div>
          <span>
            {BOARD_WIDTH}x{BOARD_HEIGHT}
          </span>
        </div>

        <div className={styles.board}>{cells}</div>
      </section>
    </main>
  );
}

export default BrindeGamePage;
