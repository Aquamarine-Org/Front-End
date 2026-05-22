import styles from "./PlanosCard.module.css";

function PlanosCard({ plano }) {
  return (
    <article
      className={`${styles.card} ${plano.destaque ? styles.cardDestaque : ""}`}
    >
      {plano.destaque && (
        <div className={styles.badgeContainer}>
          <span className={styles.badge}>Mais popular</span>
        </div>
      )}

      <header className={styles.header}>
        <h3 className={styles.titulo}>{plano.nome}</h3>

        <p className={styles.descricao}>{plano.descricao}</p>
      </header>

      <div className={styles.precoContainer}>
        <span className={styles.preco}>{plano.preco}</span>

        {plano.periodo && (
          <span className={styles.periodo}>{plano.periodo}</span>
        )}
      </div>

      <ul className={styles.listaFuncionalidades}>
        {plano.funcionalidades.map((funcionalidade) => (
          <li key={funcionalidade} className={styles.funcionalidade}>
            <span className={styles.icone}>✓</span>

            <span className={styles.textoFuncionalidade}>{funcionalidade}</span>
          </li>
        ))}
      </ul>

      <button className={styles.botao} type="button">
        {plano.botao}
      </button>
    </article>
  );
}

export default PlanosCard;
