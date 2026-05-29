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
import ConfiguracoesPage from "./pages/ConfiguracoesPage/ConfiguracoesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/verficar-email" element={<VerificarEmail />} />
        <Route path="/informacoes" element={<InformacoesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/configurar-valvula" element={<ConfigValvulaPage />} />
        <Route path="/ConfigValvulaPage" element={<ConfigValvulaPage />} />
        <Route path="/configurar-wifi" element={<ConfigWifi />} />
        <Route path="/ConfigWifi" element={<ConfigWifi />} />
        <Route path="/calibracao" element={<CalibracaoConfig />} />
        <Route path="/CalibracaoConfig" element={<CalibracaoConfig />} />
        <Route path="/calbiracao" element={<CalibracaoConfig />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
