import { Link } from "react-router-dom";
import {
  imgBbdMonitor,
  imgBbdPc,
  imgBbdPeripherals,
} from "../img/imgs";

const departments = [
  {
    name: "PCS",
    link: "/allPcsPage",
    img: imgBbdPc,
  },
  {
    name: "MONITORES",
    link: "/monitorsPage",
    img: imgBbdMonitor,
  },
  {
    name: "PERIFÉRICOS",
    link: "/peripheralsPage",
    img: imgBbdPeripherals,
  },
];

const Departments = () => {
  return (
    <section className="departments" id="departmentsHome" aria-labelledby="Tutulos de departamnetos">
      <h1 className="h1" id="departmentsTitle">🗄DEPARTAMENTOS</h1>
      <div className="bbdBoxs">
        {departments.map((department) => (
          <div className="styleBoxDepartments " key={department.name}>
            <Link to={department.link}>
              <img
                key={department.name}
                id={department.name}
                className="imgBbd"
                srcSet={department.img}
                alt={department.name}
                title={department.name}
              />
              <h2 className="h2">{department.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
export default Departments