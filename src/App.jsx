import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CadastroPage from "./pages/CadastroPage/CadastroPage";
import VerificarEmail from "./pages/VerificaEmail/VerificaEmailPage";
import InformacoesPage from "./pages/InformacoesPage/informacoces";
import HomePage from "./pages/HomePage/HomePage";
import ConfigValvulaPage from "./pages/ConfigValvulaPage/ConfigValvula";
import ConfigWifi from "./pages/ConfigWifi/configwifi";
import CalibracaoConfig from "./pages/Calibracaoconfig/calibracao";
import HistoricoPage from "./pages/HistoricoPage/historico";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AlertasPage from "./pages/AlertasPage/AlertasPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        <Route path="/dados" element={<InformacoesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/configurar-valvula" element={<ConfigValvulaPage />} />
        <Route path="/configurar-wifi" element={<ConfigWifi />} />
        <Route path="/configurar-calibracao" element={<CalibracaoConfig />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/alertas" element={<AlertasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
