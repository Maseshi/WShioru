import React from 'react'

export default function Welcome(props) {
    const translate = props.language

    return (
        <section className="home-welcome">
            <div className="container">
                <div className="home-welcome-content">
                    <img src="./android-icon-144x144.png" alt="shioru-favicon" width="120px" height="120px" />
                    <h2>{translate.pages.home.welcome_the_best_bot}</h2>
                    <p>{translate.pages.home.welcome_ready_to_join_your_server}</p>
                    <div className="d-grid gap-2 d-md-block">
                        <a className="home-welcome-btn-radius btn btn-primary mx-1" href="https://discord.com/api/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=applications.commands%20bot">{translate.pages.home.welcome_invite}</a>
                        <a className="home-welcome-btn-radius btn btn-outline-primary mx-1" href="https://www.buymeacoffee.com/maseshi">{translate.pages.home.welcome_support}</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
