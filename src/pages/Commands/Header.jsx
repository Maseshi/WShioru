export default function Header(props) {
    const translateProps = props.translate

    return (
        <div className="commands-header">
            <div className="commands-header-object">
                <div className="commands-header-circle"></div>
                <div className="commands-header-circle"></div>
            </div>
            <div className="commands-header-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="commands-header-icon">
                                <i className="bi bi-terminal"></i>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h1>{translateProps.pages.commands.header_commands}</h1>
                            <h3>{translateProps.pages.commands.header_description}</h3>
                            <br />
                            <a className="btn btn-outline-light mx-2 my-2" href="#scroll">
                                <i className="bi bi-arrow-down-square-fill"></i> {translateProps.pages.commands.header_learn_more}
                            </a>
                            <button className="btn btn-dark mx-2 my-2" type="button" disabled>
                                <i className="bi bi-discord"></i> {translateProps.pages.commands.header_join_discord_server}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
