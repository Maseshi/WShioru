import { Link } from 'react-router-dom'

import Waves from '../../components/Waves/index'
import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Footer() {
  return (
    <footer>
      <Waves class="footer-waves" r={248} g={249} b={250} />
      <div className="footer-content">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link className="footer-brand" to="./">
                <img className="d-inline-block align-text-center" src={process.env.PUBLIC_URL + '/static/media/favicon-96x96.png'} alt="shioru favicon" width="50" height="50" />
                Shioru
              </Link>
              <br />
              <br />
              <p>{translator().translate.layouts.footer.footer_description}</p>
              <span>{translator().translate.layouts.footer.if_you_need_to_contact}</span>
              <br />
              <a href="mailto:dermhioasw123@gmail.com">dermhioasw123@gmail.com</a>
            </div>
            <div className="col-md-4 mb-3">
              <h3>{translator().translate.layouts.footer.other_links}</h3>
              <br />
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="https://shioru.statuspage.io/" target="_blank" rel="noreferrer">
                    {translator().translate.layouts.footer.other_links_status}
                  </a>
                </li>
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">
                    {translator().translate.layouts.footer.other_links_privacy_policy}
                  </a>
                </li>
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">
                    {translator().translate.layouts.footer.other_links_terms_of_service}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>{translator().translate.layouts.footer.resources}</h3>
              <br />
              <ul className="footer-links">
                <li className="footer-link-item">
                  <a href="https://maseshi.web.app/projects?id=shioru" target="_blank" rel="noreferrer">
                    {translator().translate.layouts.footer.resources_open_source}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-law">
        <div className="container">
          <a href="https://maseshi.web.app/privacy-policy" target="_blank" rel="noreferrer">
            {translator().translate.layouts.footer.privacy_policy}
          </a>
          <span> • </span>
          <a href="https://maseshi.web.app/terms-of-service" target="_blank" rel="noreferrer">
            {translator().translate.layouts.footer.terms_of_service}
          </a>
          <br />
          <span dangerouslySetInnerHTML={{ __html: translator().translate.layouts.footer.all_rights_reserved }}></span>
        </div>
      </div>
    </footer>
  )
}
