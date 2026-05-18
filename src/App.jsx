import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import VerificacaoDeEmailPage from "./pages/VerificacaoDeEmailPage";
import DashboardPage from "./pages/DashboardPage";
import RecuperarSenhaPage from "./pages/RecuperarSenhaPage/RecuperarSenhaPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route
          path="/verificacao-de-email"
          element={<VerificacaoDeEmailPage />}
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
