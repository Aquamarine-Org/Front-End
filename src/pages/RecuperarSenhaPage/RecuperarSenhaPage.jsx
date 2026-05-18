function RecuperarSenhaPage() {
  return (
    <div>
      <img src="/public/logo.png" alt="Logo" />
      <div>
        <h2>Verifique seu email</h2>
        <p>Um código de 6 digitos</p>

        <form action="">
          <input type="text" placeholder="-" />
          <input type="text" placeholder="-" />
          <input type="text" placeholder="-" />
          <input type="text" placeholder="-" />
          <input type="text" placeholder="-" />
          <input type="text" placeholder="-" />
        </form>

        <button>Verificar Código</button>

        <button>Reenviar código</button>
      </div>
    </div>
  );
}

export default RecuperarSenhaPage;
