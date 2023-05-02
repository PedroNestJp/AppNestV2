import { Link } from "react-router-dom"
import '../styles/Footer.css'

const Footer = () => {
    return (

        <section className="footer">
            <div className="info-footer">
                <div className="texts-info-footer">
                    <div className="institutional">
                        <p>Institutional</p>
                        <li>
                            <Link className="texts-links-footer whoAreWe-footer " to='/aboutUs'>Quem somos</Link>
                        </li>
                        <li>
                            <Link className="texts-links-footer termsFooter " to='/terms'>Termos e Condições de Venda</Link>
                        </li>
                        <li>
                            <Link className="texts-links-footer exchangeAndReturnPolicy-footer ">Política de Troca e Devoluções</Link>
                        </li>
                    </div>
                    <div className="doubts">
                        <p> Dúvidas </p>
                        <li>
                            <Link className="texts-links-footer howToBuy-footer">Como comprar</Link>
                        </li>
                        <li>
                            <Link className="texts-links-footer deadlineAndDelivery-footer">Prazos e entregas</Link>
                        </li>
                        <li>
                            <Link className="texts-links-footer paymentMethods-footer">Formas de Pagamentos</Link>
                        </li>
                    </div>
                    {/* <div className="client">
                {/* <p> Clientes </p>
                    <li>
                        <Link className=" myAccount-footer">Minha conta</Link>
                    </li>
                    <li>
                        <Link className="myRequests-footer">Meus pedidos</Link>
                    </li>
                    <li>
                        <Link className="myTickets-footer">Meus tickets</Link>
                    </li>
                </div> */}
                    <div className="help">
                        <p> Ajuda </p>
                        <li>
                            <Link className="texts-links-footer tutorialVideos-footer">Videos Tutoriais</Link>
                        </li>
                        <li>
                            <Link className="texts-links-footer productHandling-footer">Manuseio do Produto</Link>
                        </li>
                        <li>
                            <Link target="blank" className="texts-links-footer contactUs-footer" to='https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0'>Fale Conosco</Link>
                        </li>
                    </div>

                </div>
            </div>

        </section>

    )
}

const SubFooter = () => {
    return (
        <section className="subFooter">
            <div className="certifications"></div>
            <div className="businessInformation">
                <div className="logoSubFooter">
                    <Link href="/">
                        <img className="logoSubFooter"
                            src={'https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2FlogoNestNew.png?alt=media&token=ffd0bd44-299a-4604-b341-d2805997cac2'} alt='logo' />
                    </Link>
                </div>
                <div className="businessTexts">
                    <p> NEST INFORMÁTICA ATACADO E VAREJO DE PRODUTOS DE INFORMATICA LTDA </p>
                    <p> CNPJ: 43.061.678/0001-97 | JOÃO PESSOA-PB </p>
                </div>
                <div className="openingHours">
                    <p> ATENDIMENTO </p>
                    <p> De segunda a sexta das 8:30 às 12H / 13H às 18H </p>
                    <p> SOMOS E-COMMERCE  NÃO TEMOS ATENDIMENTO LOCAL </p>
                </div>
            </div>
        </section>
    )
}
export { Footer, SubFooter }
