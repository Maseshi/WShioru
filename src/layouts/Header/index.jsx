import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { setCookie } from '../../utils/functions/setCookie'
import { translator } from '../../utils/functions/translator'

import config from '../../configs/data'

import './style.css'

export default function Header() {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)
  const [languagesSelect, setLanguagesSelect] = useState(translator().code)

  const location = useLocation()
  const translate = translator().translate

  useEffect(() => {
    const statics = ['/documents']
    const html = document.getElementsByTagName('html')[0]
    const body = document.getElementsByTagName('body')[0]
    const footer = document.getElementsByTagName('footer')[0]

    setPathname(window.location.pathname)

    if (statics.includes(pathname)) {
      window.scrollTo(0, 0)
      html.style.overflow = 'hidden'
      body.style.overflowY = 'hidden'
      footer.hidden = true
      document.querySelector('.navbar').className = 'navbar navbar-expand-lg navbar-light border-bottom'
    } else {
      if (html.attributes.getNamedItem('style')) html.attributes.removeNamedItem('style')
      if (body.attributes.getNamedItem('style')) body.attributes.removeNamedItem('style')
      if (footer.attributes.getNamedItem('hidden')) footer.attributes.removeNamedItem('hidden')
      document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg fixed-top navbar-light'
    }
  }, [location, pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (currentScrollPos > prevScrollPos) {
        document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg navbar-light navbar-hidden'
      } else {
        if (window.pageYOffset > 0) {
          document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg navbar-light navbar-show'
        } else {
          document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg navbar-light'
        }
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <header>
      <nav className="header-navbar navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="header-brand navbar-brand" to="./">
            <img src={process.env.PUBLIC_URL + '/static/media/favicon-96x96.png'} alt="shioru favicon" width="50" height="50" className="d-inline-block align-text-center" />
            <span>Shioru</span>
          </Link>
          <button className="header-navbar-toggle navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{translate.layouts.header.all_items}</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="header-navbar-nav navbar-nav justify-content-start align-items-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <HashLink className="nav-link" to="/#features">
                    {translate.layouts.header.features}
                  </HashLink>
                </li>
                <li className="nav-item">
                  <Link className={pathname === "/commands" ? "nav-link active" : "nav-link"} to="./commands">
                    {translate.layouts.header.commands}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={pathname === "/documents" ? "nav-link active" : "nav-link"} to="./documents">
                    {translate.layouts.header.documents}
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/invite">
                    {translate.layouts.header.invite_to_join}
                  </a>
                </li>
              </ul>
              <hr />
              <div className="header-navbar-form d-flex align-items-center justify-content-center">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="inputGroupSelectLanguage">
                    <i className="bi bi-translate"></i>
                  </label>
                  <select
                    className="form-select"
                    value={languagesSelect}
                    id="inputGroupSelectLanguage"
                    aria-label="languages options"
                    onChange={
                      (event) => {
                        setLanguagesSelect(event.target.value)
                        setCookie('languageSelect', event.target.value, 7)
                        window.location.reload()
                      }
                    }
                  >
                    <option value="languages" disabled>{translate.layouts.header.language}</option>
                    {
                      config.languages.map((lang, index) => {
                        const code = lang.code
                        const name = lang.name

                        return (
                          <option key={index} value={code}>{name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
