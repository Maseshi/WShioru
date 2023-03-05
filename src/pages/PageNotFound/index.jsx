import { Link } from 'react-router-dom'
import DocumentMeta from 'react-document-meta'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function PageNotFound() {
  const meta = {
    title: translator().translate.pages.pageNotFound.meta_title,
    description: translator().translate.pages.pageNotFound.meta_description,
    canonical: '/',
    meta: {
      name: {
        keywords: 'shioru, shioru-discord, discord-bot, bot',
        subject: translator().translate.pages.pageNotFound.meta_subject,
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
      <section className="page-not-found">
        <div className="page-not-found-center">
          <div className="container">
            <div className="page-not-found-code">
              <span className="page-not-found-status">404</span>
            </div>
            <div className="page-not-found-description">
              <h4 dangerouslySetInnerHTML={{ __html: translator().translate.pages.pageNotFound.description }}></h4>
              <br />
              <div className="page-not-found-link d-grid gap-2 d-md-block">
                <Link className="page-not-found-btn btn btn-primary mx-1" to="/">
                  {translator().translate.pages.pageNotFound.back_to_home_page}
                </Link>
                <a className="page-not-found-btn btn btn-outline-primary mx-1" href="https://shioru.statuspage.io/" target="_blank" rel="noreferrer">
                  {translator().translate.pages.pageNotFound.check_status}
                </a>
              </div>
            </div>
            <br />
            <small className="page-not-found-detail">PAGE_NOT_FOUND</small>
          </div>
        </div>
      </section>
    </DocumentMeta>
  )
}
