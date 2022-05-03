import CookieAccept from '../../components/CookieAccept/index'

import { getCookie } from '../../utils/functions/getCookie'

import './style.css'

export default function Invited() {
    const language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language
    const translate = require('../../languages/' + language + '.json')

    document.title = translate.pages.invited.meta_title

    return (
        <>
            <section className="invited">
                <div className="invited-center">
                    <div className="container">
                        <div className="invited-header">
                            <span className="invited-thanks-you">{translate.pages.invited.thanks_you}</span>
                        </div>
                        <br />
                        <h4 className="invited-content" dangerouslySetInnerHTML={{ __html: translate.pages.invited.we_will_always_try_to_improve }}></h4>
                        <br />
                        <div className="invited-link">
                            <a className="invited-btn btn btn-primary mx-1" href="/">{translate.pages.invited.home_page}</a>
                            <a className="invited-btn btn btn-outline-primary mx-1" href="https://www.buymeacoffee.com/maseshi" target="_blank" rel="noreferrer">{translate.pages.invited.support}</a>
                        </div>
                    </div>
                </div>
            </section>
            <CookieAccept />
        </>
    )
}
