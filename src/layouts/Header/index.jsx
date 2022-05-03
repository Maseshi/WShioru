import { useState, useEffect } from 'react'
import { setCookie } from '../../utils/functions/setCookie'
import { getCookie } from '../../utils/functions/getCookie'

import config from '../../configs/data'

import './style.css'

export default function Header() {
  const language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language
  const translate = require('../../languages/' + language + '.json')

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)
  const [languagesSelect, setLanguagesSelect] = useState(language)

  const pathname = window.location.pathname

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (currentScrollPos > prevScrollPos) {
        document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg fixed-top navbar-light navbar-hidden'
      } else {
        if (window.pageYOffset > 0) {
          document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg fixed-top navbar-light navbar-show'
        } else {
          document.querySelector('.navbar').className = 'header-navbar navbar navbar-expand-lg fixed-top navbar-light'
        }
      }

      setPrevScrollPos(currentScrollPos)
    }

    const header = document.getElementsByTagName('header')[0]
    if (header.classList.contains('header-static')) {
      document.querySelector('.navbar').className = 'navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top'
    } else {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return (
    <header>
      <nav className="header-navbar navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="header-brand navbar-brand" href="./">
            <img src="./favicon-96x96.png" alt="shioru icon" width="50" height="50" className="d-inline-block align-text-center" />
            Shioru
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
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
                  <a className="nav-link" href="./#features">{translate.layouts.header.features}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./#commands">{translate.layouts.header.commands}</a>
                </li>
                <li className="header-navbar-dropdown nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="./#about" id="navbarScrollingAboutDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {translate.layouts.header.about}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingAboutDropdown">
                    <li><a className="dropdown-item" href="./#developers">{translate.layouts.header.developers}</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://stats.uptimerobot.com/gXGx1iqxop" target="_blank" rel="noreferrer">{translate.layouts.header.status}</a>
                </li>
                <li className="nav-item">
                  <a className={pathname === "/documents" ? "nav-link active" : "nav-link"} href="./documents">{translate.layouts.header.documents}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://discord.com/api/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=applications.commands%20bot">{translate.layouts.header.invite_to_join}</a>
                </li>
              </ul>
              <form className="header-navbar-from d-flex">
                <div className="input-group">
                  <label className="input-group-text" htmlFor="inputGroupSelectLanguage">
                    <i className="bi bi-translate"></i>
                  </label>
                  <select className="form-select" value={languagesSelect} onChange={
                    (event) => {
                      setLanguagesSelect(event.target.value)
                      setCookie('languageSelect', event.target.value, 7)
                      window.location.reload()
                    }
                  } id="inputGroupSelectLanguage" aria-label="languages options">
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
              </form>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
