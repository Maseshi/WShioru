import { getCookie } from '../../utils/functions/getCookie'

import './style.css'

export default function PageNotFound() {
  const language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language
  const translate = require('../../languages/' + language + '.json')

  document.title = translate.pages.pageNotFound.meta_title

  return (
    <section className="page-not-found">
      <div className="page-not-found-center">
        <div className="container">
          <div className="page-not-found-code">
            <span className="page-not-found-status">404</span>
          </div>
          <div className="page-not-found-description">
            <h4 dangerouslySetInnerHTML={{ __html: translate.pages.pageNotFound.description }}></h4>
            <br />
            <div className="page-not-found-link d-grid gap-2 d-md-block">
              <a className="page-not-found-btn btn btn-primary mx-1" href="/">{translate.pages.pageNotFound.back_to_home_page}</a>
              <a className="page-not-found-btn btn btn-outline-primary mx-1" href="https://stats.uptimerobot.com/gXGx1iqxop" target="_blank" rel="noreferrer">{translate.pages.pageNotFound.check_status}</a>
            </div>
          </div>
          <br />
          <small className="page-not-found-detail">PAGE_NOT_FOUND</small>
        </div>
      </div>
    </section>
  )
}
