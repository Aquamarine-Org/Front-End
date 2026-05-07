import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Bem-vindo ao Aquamarine</h1>
      <p>Este é um exemplo de landing page simples para o sistema.</p>
      <button onClick={() => alert("Botão clicado!")}>Clique aqui</button>

      <Link to="/login">Ir para Login</Link>
      <Link to="/verificacao-de-email">Ir para a pagina de E-mail</Link>
      <hr />
      <Link to="/dashboard">Clique para acessar o Dashboard</Link>
    </div>
  );
}

export default LandingPage;
