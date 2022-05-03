import Waves from '../../components/Waves/index'

export default function Invite(props) {
    const translate = props.language

    return (
        <>
            <Waves position="top" r={173} g={216} b={230} />
            <section className="home-invite">
                <div className="container">
                    <i className="bi bi-app-indicator"></i>
                    <h2>{translate.pages.home.invite_are_you_ready}</h2>
                    <span dangerouslySetInnerHTML={{__html: translate.pages.home.invite_are_you_ready_description}}></span>
                    <br />
                    <br />
                    <a className="home-invite-btn-radius btn btn-primary" href="https://discord.com/api/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=applications.commands%20bot">{translate.pages.home.invite_invite_now}</a>
                </div>
            </section>
        </>
    )
}
