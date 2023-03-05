import { useState } from 'react'

export default function Body(props) {
    const [query, setQuery] = useState()

    const translateProps = props.translate
    const codeProps = props.code
    const infoProps = props.info
    const loadedProps = props.loaded

    return (
        <section className="commands-body" id="scroll">
            <div className="container">
                <div className="commands-body-title row mb-3">
                    <div className="col-md-6">
                        <small>
                            <strong>ALL COMMANDS</strong>
                        </small>
                        <br />
                        <h1>{translateProps.pages.commands.body_all_commands}</h1>
                        <p dangerouslySetInnerHTML={{__html: translateProps.pages.commands.body_description}}></p>
                    </div>
                </div>
                <div className="commands-body-search card mb-3">
                    <div className="card-body">
                        <h2 className="card-title mb-3 text-center">
                            <i className="bi bi-search"></i> {translateProps.pages.commands.body_search_commands}
                        </h2>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="commandsSearch"
                                onChange={event => setQuery(event.target.value)}
                                disabled={loadedProps && infoProps ? false : true}
                                placeholder={translateProps.pages.commands.body_type_to_search_commands}
                            />
                            <label htmlFor="commandsSearch">{translateProps.pages.commands.body_type_to_search_commands}</label>
                        </div>
                    </div>
                </div>
                {
                    loadedProps && infoProps ? (
                        <div className="commands-body-guide-note alert alert-primary" role="alert">
                            <h4 className="alert-heading">{translateProps.pages.commands.body_note}</h4>
                            <p>{translateProps.pages.commands.body_note_description}</p>
                            <ul style={{ marginBottom: 0 }}>
                                <li>{translateProps.pages.commands.body_note_first_condition_mean}</li>
                                <li>{translateProps.pages.commands.body_note_second_condition_mean}</li>
                            </ul>
                        </div>
                    ) : ''
                }
                <div className="commands-body-accordion accordion mb-5" id="accordionCommands">
                    {
                        loadedProps ? (
                            infoProps ? (
                                Object.keys(infoProps).sort().map((folder, index) => {
                                    let folderName = folder.toLowerCase()

                                    if (folderName === 'owner') folderName = ('🔒 ' + folderName.charAt(0).toUpperCase() + folderName.slice(1))
                                    if (folderName === 'developer') folderName = ('⌨ ' + folderName.charAt(0).toUpperCase() + folderName.slice(1))
                                    if (folderName === 'settings') folderName = ('⚙️ ' + folderName.charAt(0).toUpperCase() + folderName.slice(1))
                                    if (!/\p{Emoji}/u.test(folderName)) folderName = ('🏷️ ' + folderName.charAt(0).toUpperCase() + folderName.slice(1))

                                    return (
                                        <div className="accordion-item" key={index}>
                                            <h2 className="accordion-header" id={'heading-' + index}>
                                                <button
                                                    className={
                                                        index === 0 ? 'accordion-button' : query ? (
                                                            'accordion-button'
                                                        ) : (
                                                            'accordion-button collapsed'
                                                        )
                                                    }
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={'#collapse-' + index}
                                                    aria-expanded={
                                                        index === 0 ? 'true' : query ? (
                                                            'true'
                                                        ) : (
                                                            'false'
                                                        )
                                                    }
                                                    aria-controls={'collapse-' + index}
                                                >
                                                    {folderName}
                                                </button>
                                            </h2>
                                            <div
                                                id={'collapse-' + index}
                                                className={
                                                    index === 0 ? 'accordion-collapse collapse show' : query ? (
                                                        'accordion-collapse collapse show'
                                                    ) : (
                                                        'accordion-collapse collapse'
                                                    )
                                                }
                                                aria-labelledby={'heading-' + index}
                                                data-bs-parent="#accordionCommands"
                                            >
                                                <div className="accordion-body">
                                                    <div className="row row-cols-1 row-cols-md-4 g-4">
                                                        {
                                                            Object.keys(infoProps[folder]).sort()
                                                                .filter(file => {
                                                                    if (query) {
                                                                        if (query !== '') {
                                                                            if (infoProps[folder][file].name.toLowerCase().includes(query.toLowerCase())) {
                                                                                return file
                                                                            } else {
                                                                                return null
                                                                            }
                                                                        } else {
                                                                            return file
                                                                        }
                                                                    } else {
                                                                        return file
                                                                    }
                                                                })
                                                                .map((file, index) => {
                                                                    let languageCode = codeProps
                                                                    
                                                                    if (languageCode === 'en') languageCode = 'en-US'

                                                                    const command = infoProps[folder][file]
                                                                    const commandName = command.name
                                                                    const commandNameUpper = (commandName.charAt(0).toUpperCase() + commandName.slice(1))
                                                                    const commandDescription = command.description[languageCode] ?? command.description["en-US"]
                                                                    const commandUsage = command.usage
                                                                    const commandPermissionsClient = command.permissions.client
                                                                    const commandPermissionsUser = command.permissions.user
                                                                    const commandFunctionCommand = command.function.command
                                                                    const commandFunctionContext = command.function.context

                                                                    const BitwisePermissionFlags = {
                                                                        0x1: "Create Invite",
                                                                        0x2: "Kick Members",
                                                                        0x4: "Ban Members",
                                                                        0x8: "Administrator",
                                                                        0x10: "Manage Channels",
                                                                        0x20: "Manage Server",
                                                                        0x40: "Add Reactions",
                                                                        0x80: "View Audit Log",
                                                                        0x100: "Priority Speaker",
                                                                        0x200: "Video",
                                                                        0x400: "Read Text Channels & See Voice Channels",
                                                                        0x800: "Send Messages",
                                                                        0x1000: "Send TTS Messages",
                                                                        0x2000: "Manage Messages",
                                                                        0x4000: "Embed Links",
                                                                        0x8000: "Attach Files",
                                                                        0x10000: "Read Message History",
                                                                        0x20000: "Mention @everyone, @here, and All Roles",
                                                                        0x40000: "Use External Emojis",
                                                                        0x80000: "View Server Insights",
                                                                        0x100000: "Connect",
                                                                        0x200000: "Speak",
                                                                        0x400000: "Mute Members",
                                                                        0x800000: "Deafen Members",
                                                                        0x1000000: "Move Members",
                                                                        0x2000000: "Use Voice Activity",
                                                                        0x4000000: "Change Nickname",
                                                                        0x8000000: "Manage Nicknames",
                                                                        0x10000000: "Manage Roles",
                                                                        0x20000000: "Manage Webhooks",
                                                                        0x40000000: "Manage Emojis & Stickers",
                                                                        0x80000000: "Use Application Commands",
                                                                        0x100000000: "Request to Speak",
                                                                        0x200000000: "Manage Events",
                                                                        0x400000000: "Manage Threads",
                                                                        0x800000000: "Create Public Threads",
                                                                        0x1000000000: "Create Private Threads",
                                                                        0x2000000000: "Use External Stickers",
                                                                        0x4000000000: "Send Messages in Threads",
                                                                        0x8000000000: "Use Embedded Activities",
                                                                        0x10000000000: "Moderate Members"
                                                                    }

                                                                    return (
                                                                        <div className="col" key={index}>
                                                                            <div className="card h-100 text-bg-primary">
                                                                                <div className="card-body">
                                                                                    <h5 className="card-title">
                                                                                        {commandName} {commandFunctionCommand ? <i className="bi bi-slash-square"></i> : ''} {commandFunctionContext ? <i className="bi bi-app-indicator"></i> : ''}
                                                                                    </h5>
                                                                                    <p className="card-text">{commandDescription}</p>
                                                                                </div>
                                                                                <div className="accordion accordion-flush" id={"accordionCommand" + commandNameUpper}>

                                                                                    <div className="accordion-item">
                                                                                        <h2 className="accordion-header" id={"flush-headingOne-" + commandName}>
                                                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseOne-" + commandName} aria-expanded="false" aria-controls={"flush-collapseOne-" + commandName}>
                                                                                                {translateProps.pages.commands.body_how_to_use}
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id={"flush-collapseOne-" + commandName} className="accordion-collapse collapse" aria-labelledby={"flush-headingOne-" + commandName} data-bs-parent={"#accordionCommand" + commandNameUpper}>
                                                                                            <div className="accordion-body">
                                                                                                {commandUsage}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="accordion-item">
                                                                                        <h2 className="accordion-header" id={"flush-headingTwo-" + commandName}>
                                                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapseTwo-" + commandName} aria-expanded="false" aria-controls={"flush-collapseTwo-" + commandName}>
                                                                                                {translateProps.pages.commands.body_permissions}
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id={"flush-collapseTwo-" + commandName} className="accordion-collapse collapse" aria-labelledby={"flush-headingTwo-" + commandName} data-bs-parent={"#accordionCommand" + commandNameUpper}>
                                                                                            <div className="accordion-body">
                                                                                                <span>
                                                                                                    <strong>{translateProps.pages.commands.body_permission_bot}:</strong> {commandPermissionsClient.length ? commandPermissionsClient.map((client) => BitwisePermissionFlags[client]).join(", ") : translateProps.pages.commands.body_permission_none}
                                                                                                </span>
                                                                                                <br />
                                                                                                <span>
                                                                                                    <strong>{translateProps.pages.commands.body_permission_user}:</strong> {commandPermissionsUser.length ? commandPermissionsUser.map((user) => BitwisePermissionFlags[user]).join(", ") : translateProps.pages.commands.body_permission_none}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="commands-body-not-found card">
                                    <div className="card-body text-center">
                                        <h1>
                                            <i className="bi bi-exclamation-triangle-fill"></i>
                                        </h1>
                                        <h2>{translateProps.pages.commands.body_data_not_found}</h2>
                                        <p>{translateProps.pages.commands.body_data_not_found_detail}</p>
                                        <small>ERROR: DATA_NOT_FOUND</small>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="accordion" id="accordionLoading">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <span className="placeholder col-2"></span>
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionLoading">
                                        <div className="accordion-body">
                                            <div className="row row-cols-1 row-cols-md-4 g-4">
                                                <div className="col">
                                                    <div className="card w-100 text-bg-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title placeholder-glow">
                                                                <span className="placeholder col-5"></span>
                                                            </h5>
                                                            <p className="card-text placeholder-glow">
                                                                <span className="placeholder col-2"></span>
                                                                <span className="placeholder col-3"></span>
                                                                <span className="placeholder col-4"></span>
                                                            </p>
                                                        </div>
                                                        <div className="accordion accordion-flush" id="accordionLoadingCommand">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingOne">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" disabled>
                                                                        <span className="placeholder col-3"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" disabled>
                                                                        <span className="placeholder col-5"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card w-100 text-bg-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title placeholder-glow">
                                                                <span className="placeholder col-5"></span>
                                                            </h5>
                                                            <p className="card-text placeholder-glow">
                                                                <span className="placeholder col-2"></span>
                                                                <span className="placeholder col-3"></span>
                                                                <span className="placeholder col-4"></span>
                                                            </p>
                                                        </div>
                                                        <div className="accordion accordion-flush" id="accordionLoadingCommand">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingOne">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" disabled>
                                                                        <span className="placeholder col-3"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" disabled>
                                                                        <span className="placeholder col-5"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card w-100 text-bg-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title placeholder-glow">
                                                                <span className="placeholder col-5"></span>
                                                            </h5>
                                                            <p className="card-text placeholder-glow">
                                                                <span className="placeholder col-2"></span>
                                                                <span className="placeholder col-3"></span>
                                                                <span className="placeholder col-4"></span>
                                                            </p>
                                                        </div>
                                                        <div className="accordion accordion-flush" id="accordionLoadingCommand">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingOne">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" disabled>
                                                                        <span className="placeholder col-3"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" disabled>
                                                                        <span className="placeholder col-5"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card w-100 text-bg-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title placeholder-glow">
                                                                <span className="placeholder col-5"></span>
                                                            </h5>
                                                            <p className="card-text placeholder-glow">
                                                                <span className="placeholder col-2"></span>
                                                                <span className="placeholder col-3"></span>
                                                                <span className="placeholder col-4"></span>
                                                            </p>
                                                        </div>
                                                        <div className="accordion accordion-flush" id="accordionLoadingCommand">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingOne">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" disabled>
                                                                        <span className="placeholder col-3"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" disabled>
                                                                        <span className="placeholder col-5"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card w-100 text-bg-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title placeholder-glow">
                                                                <span className="placeholder col-5"></span>
                                                            </h5>
                                                            <p className="card-text placeholder-glow">
                                                                <span className="placeholder col-2"></span>
                                                                <span className="placeholder col-3"></span>
                                                                <span className="placeholder col-4"></span>
                                                            </p>
                                                        </div>
                                                        <div className="accordion accordion-flush" id="accordionLoadingCommand">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingOne">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" disabled>
                                                                        <span className="placeholder col-3"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" disabled>
                                                                        <span className="placeholder col-5"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card w-100 text-bg-primary">
                                                        <div className="card-body">
                                                            <h5 className="card-title placeholder-glow">
                                                                <span className="placeholder col-5"></span>
                                                            </h5>
                                                            <p className="card-text placeholder-glow">
                                                                <span className="placeholder col-2"></span>
                                                                <span className="placeholder col-3"></span>
                                                                <span className="placeholder col-4"></span>
                                                            </p>
                                                        </div>
                                                        <div className="accordion accordion-flush" id="accordionLoadingCommand">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingOne">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" disabled>
                                                                        <span className="placeholder col-3"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header" id="flush-headingTwo">
                                                                    <button className="accordion-button collapsed placeholder-glow" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" disabled>
                                                                        <span className="placeholder col-5"></span>
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button placeholder-glow collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" disabled>
                                            <span className="placeholder col-2"></span>
                                        </button>
                                    </h2>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button placeholder-glow collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" disabled>
                                            <span className="placeholder col-2"></span>
                                        </button>
                                    </h2>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    loadedProps && infoProps ? (
                        <div className="commands-body-not-found text-center">
                            <h2>{translateProps.pages.commands.body_commands_not_found}</h2>
                            <p>{translateProps.pages.commands.body_commands_not_found_description}</p>
                            <a className="btn btn-primary" href="https://github.com/Maseshi/Shioru/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=" role="button">{translateProps.pages.commands.body_commands_give_feedback}</a>
                        </div>
                    ) : ''
                }
            </div>
        </section>
    )
}
