import Welcome from './Welcome'
import Features from './Features'
import Survey from './Survey'
import Commands from './Commands'
import About from './About'
import Invite from './Invite'

import CookieAccept from '../../components/CookieAccept/index'
import ScrollToTop from '../../components/ScrollToTop/index'
import Waves from '../../components/Waves/index'

import './style.css'

export default function Home() {
  document.title = 'Shioru - บอท Discord สำหรับทุกคน'

  return (
    <>
      <Welcome />
      <Waves class={'home-wave'} r={130} g={190} b={255} />
      <div className="home-background">
        <Features />
        <Survey />
        <Commands />
        <About />
        <Invite />
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
