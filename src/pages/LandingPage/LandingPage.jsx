import { Link } from "react-router-dom";
import CardInformativoFuncionalidades from "../../features/CardInformativoFuncionalidaes/CardInformativoFuncionalidades";
import imagem1 from "@assets/landing_page/card_informativo/imagem1.png";
import imagem2 from "@assets/landing_page/card_informativo/imagem2.png";
import imagem3 from "@assets/landing_page/card_informativo/imagem3.png";

import "./LandingPage.css";

function LandingPage() {
  return (
    <div>
      <section className="main-section">
        <h1>
          Um vazamento não avisa. <br></br> A <span>Aquamarine</span> sim.
        </h1>
        <div className="link-buttons">
          <Link to="/cadastro">
            <button>Começar</button>
          </Link>
          <Link to="/planos">
            <button>Ver planos</button>
          </Link>
        </div>
      </section>
      <section>
        <h2>Tenha segurança no encanamento da sua casa</h2>
        <p>
          Um sistema que analisa o encanamento da sua casa em tempo real e te
          notifica se houver qualquer tipo de alerta.
        </p>

        <Link to="/planos">Ver planos</Link>

        <div>
          <CardInformativoFuncionalidades
            imagem={imagem1}
            alt="Produto da aquamarine"
            descricao="Análise de encanamentos em tempo real"
          />
          <CardInformativoFuncionalidades
            imagem={imagem2}
            alt="Produto da aquamarine"
            descricao="Sensor de vazamentos com precisão"
          />
          <CardInformativoFuncionalidades
            imagem={imagem3}
            alt="Produto da aquamarine"
            descricao="Fechamento de válvula remoto"
          />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
