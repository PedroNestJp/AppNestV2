import { Link } from "react-router-dom";
import {
    imgBbdMonitor,
    imgBbdPc,
    imgBbdPeripherals,
  } from "../img/imgs";

const Departments = () => {
    return(
        <section className="departments" id="departmentsHome">
        <h1 className="h1" id="departmentsTitle">🗄DEPARTAMENTOS</h1>
        <div className="bbdBoxs">
          <Link to="/allPcsPage">
            <div className="styleBox">
              <img
                className="imgBbd"
                srcSet={imgBbdPc}
                alt="PCS"
                title="Mostrar Todos os PCs"
              />
              <h2 className="h2">PCS</h2>
            </div>
          </Link>
          <Link to="/monitorsPage">
            <div className="styleBox">
              <img
                className="imgBbd"
                srcSet={imgBbdMonitor}
                alt="MONITORES"
                title="Mostrar Todos os monitores"
              />
              <h2 className="h2">MONITORES</h2>
            </div>
          </Link>
          <Link to="/peripheralsPage">
            <div className="styleBox">
              <img
                className="imgBbd"
                srcSet={imgBbdPeripherals}
                alt="PERIFERICOS"
                title="Mostrar todos os periféricos"
              />
              <h2 className="h2">PERIFERICOS</h2>
            </div>
          </Link>
        </div>
      </section>
    )
}
export default Departments