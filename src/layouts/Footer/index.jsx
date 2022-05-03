import Waves from '../../components/Waves/index'
import { getCookie } from '../../utils/functions/getCookie'

import './style.css'

export default function Footer() {
  const language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language
  const translate = require('../../languages/' + language + '.json')

  return (
    <footer>
      <Waves class="footer-waves" r={250} g={250} b={255} />
      <div className="footer-content">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <a className="footer-brand" href="./">
                <img className="d-inline-block align-text-center" src="./favicon-96x96.png" alt="shioru icon" width="50" height="50" />
                Shioru
              </a>
              <br />
              <br />
              <p>{translate.layouts.footer.footer_description}</p>
              <span>{translate.layouts.footer.if_you_need_to_contact}</span>
              <br />
              <a href="mailto:dermhioasw123@gmail.com">dermhioasw123@gmail.com</a>
            </div>
            <div className="col-md-4 mb-3">
              <h3>{translate.layouts.footer.other_links}</h3>
              <br />
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">{translate.layouts.footer.other_links_privacy_policy}</a>
                </li>
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">{translate.layouts.footer.other_links_terms_of_service}</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>{translate.layouts.footer.resources}</h3>
              <br />
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/projects?project=shioru" target="_blank" rel="noreferrer">{translate.layouts.footer.resources_open_source}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-law">
        <div className="container">
          <a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">
            {translate.layouts.footer.privacy_policy}
          </a>
          <span> • </span>
          <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">
            {translate.layouts.footer.terms_of_service}
          </a>
          <br />
          <span dangerouslySetInnerHTML={{ __html: translate.layouts.footer.all_rights_reserved }}></span>
        </div>
      </div>
    </footer>
  )
}
