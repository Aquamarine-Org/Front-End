function CardInformativoFuncionalidades({ imagem, alt, descricao }) {
  return (
    <div>
      <img src={imagem} alt={alt} />
      <p>{descricao}</p>
    </div>
  );
}

export default CardInformativoFuncionalidades;
