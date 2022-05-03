import Welcome from './Welcome'
import Features from './Features'
import Survey from './Survey'
import Commands from './Commands'
import About from './About'
import Invite from './Invite'

import CookieAccept from '../../components/CookieAccept/index'
import ScrollToTop from '../../components/ScrollToTop/index'
import Waves from '../../components/Waves/index'

import { getCookie } from '../../utils/functions/getCookie'

import './style.css'

export default function Home() {
  const language = getCookie('languageSelect') || window.navigator.userLanguage || window.navigator.language
  const translate = require('../../languages/' + language + '.json')

  document.title = translate.pages.home.meta_title

  return (
    <>
      <Welcome language={translate} />
      <Waves class={'home-wave'} r={130} g={190} b={255} />
      <div className="home-background">
        <Features language={translate} />
        <Survey language={translate} />
        <Commands language={translate} />
        <About language={translate} />
        <Invite language={translate} />
        <div className="home-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </div>
      </div>
      <CookieAccept />
      <ScrollToTop />
    </>
  )
}
