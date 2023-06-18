import { Link } from "react-router-dom";
import imgIntelType from "../assets/buyByPlatform/buyByPlatform-img-intel.png";
import imgAmdType from "../assets/buyByPlatform/buyByPlatform-img-amd.png";

const BBPf = () => {
    return(
        <section className="bbPfSc" id="buyByPlatformHome">
        <h1 className="h1" id="bBPf">
          POR PLATAFORMA
        </h1>
        <div className="bbPfDv">
          <Link to='/filterByPlatformIntel'>
            <h2
              className="h2"
              id="textPlatformIntel"
              title="Mostrar apenas computadores da plataforma Intel">
              INTEL
            </h2>
            <img
              className="platformImg"
              src={imgIntelType}
              alt="Imagem da Plataforma Intel"
            />
          </Link>
          <Link to='/filterByPlatformAmd'>
            <h2
              className="h2"
              id="textPlatformAmd"
              title="Mostrar apenas computadores da plataforma amd ">
              AMD
            </h2>
            <img
              className="platformImg"
              src={imgAmdType}
              alt="Imagem da Plataforma AMD"
            />
          </Link>
        </div>
      </section>
    )
}
export default BBPf