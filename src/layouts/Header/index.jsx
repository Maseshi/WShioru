import { useState, useEffect } from 'react'
import './style.css'

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (currentScrollPos > prevScrollPos) {
        document.querySelector('.navbar').className = 'header-navbar navbar fixed-top navbar-expand-lg navbar-light navbar-hidden'
      } else {
        if (window.pageYOffset > 0) {
          document.querySelector('.navbar').className = 'header-navbar navbar fixed-top navbar-expand-lg navbar-light navbar-show'
        } else {
          document.querySelector('.navbar').className = 'header-navbar navbar fixed-top navbar-expand-lg navbar-light'
        }
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">รายการทั้งหมด</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start align-items-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link" href="./#features">คุณสมบัติ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./#commands">คำสั่ง</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="./#about" id="navbarScrollingAboutDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    เกี่ยวกับ
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarScrollingAboutDropdown">
                    <li><a className="dropdown-item" href="./#developers">ผู้พัฒนา</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://stats.uptimerobot.com/gXGx1iqxop" target="_blank" rel="noreferrer">สถานะ</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://discord.com/api/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=applications.commands%20bot" target="_blank" rel="noreferrer">เชิญเข้าร่วม</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
