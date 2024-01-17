import { Link } from "react-router-dom"
import { configCustom } from "../../img/imgs"
import "../../styles/Home.css"

const BudgetBuilderArea = () => {
    return(
        <section className="highLightsBoxs" id="budgetBuilderArea">
        <h1 className="h1" id="" title="Monte sua configuração ideal">
          MONTE SUA CONFIGURAÇÃO
        </h1>
        <div className="StyleBoxBudgetArea">
          <Link to='/BudgetBuilder'>
            <img
              className="img-hl-1"
              src={configCustom}
              alt="Imagem da Plataforma Intel"
            />
          </Link>
        </div>
      </section>
    )
}
export default BudgetBuilderArea 
