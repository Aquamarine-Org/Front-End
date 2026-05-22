import styles from "./CardInformativoFuncionalidades.module.css";

function CardInformativoFuncionalidades({ imagem, alt, descricao }) {
  return (
    <div className={styles.card}>
      <img src={imagem} alt={alt} />
      <div className={styles.cardDescription}>
        <p>{descricao}</p>
      </div>
    </div>
  );
}

export default CardInformativoFuncionalidades;
