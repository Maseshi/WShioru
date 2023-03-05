import Modal from '../../components/Modal/index'

// Assets
import buyMeCoffeeLogo from '../../assets/icons/buy-me-a-coffee.webp'
import trueMoneyLogo from '../../assets/icons/true-money.webp'
import patreonLogo from '../../assets/icons/patreon.webp'
import qrCodeTrueMoney from '../../assets/images/qrcode-true-money.webp'

export default function Welcome(props) {
    const translate = props.language

    return (
        <section className="home-welcome">
            <div className="container">
                <div className="home-welcome-content">
                    <img src="./static/media/android-icon-144x144.png" alt="shioru-favicon" width="120px" height="120px" />
                    <h2>{translate.pages.home.welcome_the_best_bot}</h2>
                    <p>{translate.pages.home.welcome_ready_to_join_your_server}</p>
                    <div className="d-grid gap-2 d-md-block">
                        <a className="home-welcome-btn-radius btn btn-primary mx-1" href="/invite">
                            <i className="bi bi-plus-circle"></i> {translate.pages.home.welcome_invite}
                        </a>
                        <button className="home-welcome-btn-radius btn btn-outline-primary mx-1" type="button" data-bs-toggle="modal" data-bs-target="#donateModal">
                            <i className="bi bi-coin"></i> {translate.pages.home.welcome_support}
                        </button>
                    </div>
                    <button type="button" className="btn btn-link" disabled>{translate.pages.home.welcome_discord_server}</button>
                </div>
            </div>
            <Modal
                id="donate"
                title={translate.pages.home.welcome_support_method}
                body={
                    <>
                        <div className="d-grid gap-2">
                            <a className="home-welcome-btn-radius home-welcome-btn-funding-bmc btn btn-whatever btn-lg w-100" href="https://www.buymeacoffee.com/maseshi" target="_blank" rel="noreferrer">
                                <img src={buyMeCoffeeLogo} width="30px" height="30px" alt="" /> {translate.pages.home.welcome_buy_me_coffee} <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                            <button className="home-welcome-btn-radius btn btn-warning btn-lg w-100" type="button" data-bs-toggle="modal" data-bs-target="#trueMoneyModal">
                                <img src={trueMoneyLogo} width="30px" height="30px" alt="" /> True Money
                            </button>
                            <a className="home-welcome-btn-radius btn btn-danger btn-lg w-100" href="https://www.patreon.com/maseshi" target="_blank" rel="noreferrer">
                                <img src={patreonLogo} width="30px" height="30px" alt="" /> Patreon <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                        <br />
                        <p className="text-center m-0">
                            {translate.pages.home.welcome_support_modal_description}
                            <br />
                            {translate.pages.home.welcome_support_modal_thank_you}
                        </p>
                    </>
                }
            />
            <Modal
                id="trueMoney"
                title={translate.pages.home.welcome_support_through_true_money}
                body={
                    <img src={qrCodeTrueMoney} alt="" width="100%" height="100%" />
                }
            />
        </section>
    )
}
