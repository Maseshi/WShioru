import { Link } from 'react-router-dom'
import DocumentMeta from 'react-document-meta'

import CookieAccept from '../../components/CookieAccept/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Invited() {
    const meta = {
        title: translator().translate.pages.invited.meta_title,
        description: translator().translate.pages.invited.meta_description,
        canonical: '/',
        meta: {
            name: {
                keywords: 'shioru, shioru-discord, discord-bot, bot',
                subject: translator().translate.pages.invited.meta_subject,
                language: 'TH',
                robots: 'noindex, nofollow',

                'og:type': 'website',
                'og:image': '/shioru_banner.jpg',
                'og:site_name': 'Shioru'
            }
        }
    }

    return (
        <DocumentMeta {...meta}>
            <section className="invited">
                <div className="invited-center">
                    <div className="container">
                        <div className="invited-header">
                            <span className="invited-thanks-you">{translator().translate.pages.invited.thanks_you}</span>
                        </div>
                        <br />
                        <h4 className="invited-content" dangerouslySetInnerHTML={{ __html: translator().translate.pages.invited.we_will_always_try_to_improve }}></h4>
                        <br />
                        <div className="invited-link">
                            <Link className="invited-btn btn btn-primary mx-1" to="/">
                                <i className="bi bi-chevron-left"></i> {translator().translate.pages.invited.home_page}
                            </Link>
                            <a className="invited-btn btn btn-outline-primary mx-1" href="https://www.buymeacoffee.com/maseshi" target="_blank" rel="noreferrer">
                                <i className="bi bi-coin"></i> {translator().translate.pages.invited.support}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <CookieAccept />
        </DocumentMeta>
    )
}
