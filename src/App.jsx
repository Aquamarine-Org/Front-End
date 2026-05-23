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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/verficaremail" element={<VerificarEmail />} />
        <Route path="/dados" element={<InformacoesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/ConfigValvulaPage" element={<ConfigValvulaPage />} />
        <Route path="/ConfigWifi" element={<ConfigWifi />} />
        <Route path="/CalibracaoConfig" element={<CalibracaoConfig />} />
      </Routes>
    </Router>
  );
}

export default App;
