import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CadastroPage from "./pages/CadastroPage/CadastroPage";
import VerificarEmail from "./pages/VerificaEmail/VerificaEmailPage";
import InformacoesPage from "./pages/InformacoesPage/informacoces";
import HomePage from "./pages/HomePage/HomePage";
import ConfigDispositivoPage from "./pages/ConfigDispositivoPage/ConfigDispositivo";
import ConfigWifi from "./pages/ConfigWifi/configwifi";
import CalibracaoConfig from "./pages/Calibracaoconfig/calibracao";
import HistoricoPage from "./pages/HistoricoPage/historico";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AlertasPage from "./pages/AlertasPage/AlertasPage";
import DispositivosPage from "./pages/DispositivosPage/DispositivosPage";
import DispositivosGerenciarPage from "./pages/DispositivosGerenciarPage/DispositivosGerenciarPage";
import PlantaCasaPage from "./pages/PlantaCasaPage/PlantaCasaPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage/ConfiguracoesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        <Route path="/dados" element={<InformacoesPage />} />
        <Route path="/informacoes" element={<InformacoesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/configurar-dispositivo"
          element={<ConfigDispositivoPage />}
        />
        <Route path="/configurar-wifi" element={<ConfigWifi />} />
        <Route path="/configurar-calibracao" element={<CalibracaoConfig />} />
        <Route path="/historico" element={<HistoricoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/planta-da-casa" element={<PlantaCasaPage />} />
        <Route path="/alertas" element={<AlertasPage />} />
        <Route path="/dispositivos" element={<DispositivosPage />} />
        <Route
          path="/dispositivos/gerenciar"
          element={<DispositivosGerenciarPage />}
        />
        <Route path="/configuracoes" element={<ConfiguracoesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
