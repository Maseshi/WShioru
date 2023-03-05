import { useState, useEffect } from 'react'

import { setCookie } from '../../utils/functions/setCookie'
import { getCookie } from '../../utils/functions/getCookie'
import { translator } from '../../utils/functions/translator'

import './style.css'

export default function CookieAccept() {
    const [accepted, setAccepted] = useState(true)

    useEffect(() => {
        if (!getCookie('acceptCookie')) setAccepted(false)
    }, [])

    return (
        <div id="cookieAccept" className={!accepted ? "toast fade show" : "toast fade"} role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
            <div className="toast-body d-flex flex-row">
                <div className="align-self-center p-1">
                    <h1 className="m-0">🍪</h1>
                </div>
                <div className="align-self-center p-1">
                    <p className="m-0">{translator().translate.components.cookieAccept.we_use_cookie}</p>
                    <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=th" target="_blank" rel="noreferrer">{translator().translate.components.cookieAccept.learn_more}</a>
                </div>
                <div className="align-self-center p-1">
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => setCookie('acceptCookie', '1', 30)} data-bs-dismiss="toast">{translator().translate.components.cookieAccept.accept}</button>
                </div>
            </div>
        </div>
    )
}
