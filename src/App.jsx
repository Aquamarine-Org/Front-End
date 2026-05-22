import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CadastroPage from "./pages/CadastroPage/CadastroPage";
import VerificarEmail from "./pages/VerificaEmail/VerificaEmailPage";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/verficaremail" element={<VerificarEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
