export default function Features(props) {
    const translate = props.language

    return (
        <section className="home-features" id="features">
            <div className="container">
                <div className="home-features-header">
                    <small>FEATURES</small>
                    <h2>{translate.pages.home.features_outstanding_features}</h2>
                    <p>{translate.pages.home.features_outstanding_features_description}</p>
                </div>
                <br />
                <div className="home-features-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="home-features-circle mb-3">
                                        <i className="bi bi-bell-fill"></i>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="home-features-info-content">
                                        <h2>{translate.pages.home.features_notify_members_join_or_leave}</h2>
                                        <p>{translate.pages.home.features_notify_members_join_or_leave_description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="home-features-circle mb-3">
                                        <i className="bi bi-play-fill"></i>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="home-features-info-content">
                                        <h2>{translate.pages.home.features_playing_music}</h2>
                                        <p>{translate.pages.home.features_playing_music_description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="home-features-circle mb-3">
                                        <i className="bi bi-layers-fill"></i>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="home-features-info-content">
                                        <h2>{translate.pages.home.features_leveling_and_experience}</h2>
                                        <p>{translate.pages.home.features_leveling_and_experience_description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="home-features-circle mb-3">
                                        <i className="bi bi-joystick"></i>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="home-features-info-content">
                                        <h2>{translate.pages.home.features_discord_together}</h2>
                                        <p dangerouslySetInnerHTML={{__html: translate.pages.home.features_discord_together_description}}></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="home-features-circle mb-3">
                                        <i className="bi bi-chat-fill"></i>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="home-features-info-content">
                                        <h2>{translate.pages.home.features_be_your_friend}</h2>
                                        <p>{translate.pages.home.features_be_your_friend_description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="home-features-circle mb-3">
                                        <i className="bi bi-bell-fill"></i>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="home-features-info-content">
                                        <h2>{translate.pages.home.features_more_commands}</h2>
                                        <p dangerouslySetInnerHTML={{__html: translate.pages.home.features_more_commands_description}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
