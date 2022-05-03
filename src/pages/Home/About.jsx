import React from 'react'

export default function About(props) {
  const translate = props.language;

  return (
    <section className="home-about" id="about">
      <div className="container">
        <div className="home-about-header" id="developers">
          <small>DEVELOPERS</small>
          <h2>{translate.pages.home.about_developer}</h2>
          <p>{translate.pages.home.about_developer_description}</p>
        </div>
        <br />
        <div className="home-about-content">
          <div className="card">
            <img src={require('../../assets/images/maseshi-creator.webp')} alt="maseshi-creator" width="120" height="120" />
            <div className="card-body">
              <h5 className="card-title">Maseshi<span className="home-about-discord-tag">#9467</span></h5>
              <p className="card-text">{translate.pages.home.about_main_developer_of_shioru}</p>
              <div className="home-about-dev-social-media">
                <a className="pe-2" href="https://web.facebook.com/chaiwat.fb/" target="_blank" rel="noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
                <a className="pe-2" href="https://github.com/Maseshi" target="_blank" rel="noreferrer">
                  <i className="bi bi-github"></i>
                </a>
                <a className="pe-2" href="https://www.instagram.com/chaiwat_itg/" target="_blank" rel="noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
                <a className="pe-2" href="https://twitter.com/chaiwat_twt" target="_blank" rel="noreferrer">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://maseshi.web.app" target="_blank" rel="noreferrer">
                  <i className="bi bi-globe"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
