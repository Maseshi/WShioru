import DocumentMeta from 'react-document-meta'

import Welcome from './Welcome'
import Features from './Features'
import Survey from './Survey'
import Commands from './Commands'
import About from './About'
import Invite from './Invite'
import Bubbles from './Bubbles'

import CookieAccept from '../../components/CookieAccept/index'
import ScrollToTop from '../../components/ScrollToTop/index'
import Waves from '../../components/Waves/index'

import { translator } from '../../utils/functions/translator'

import './style.css'

export default function Home() {
  const meta = {
    title: translator().translate.pages.home.meta_title,
    description: translator().translate.pages.home.meta_description,
    canonical: '/',
    meta: {
      name: {
        keywords: 'shioru, shioru-discord, discord-bot, bot',
        subject: translator().translate.pages.home.meta_subject,
        language: 'TH',
        robots: 'index, follow',

        'og:type': 'website',
        'og:image': '/shioru_banner.jpg',
        'og:site_name': 'Shioru'
      }
    }
  }

  return (
    <DocumentMeta {...meta}>
      <Welcome language={translator().translate} />
      <Waves class={'home-wave'} r={130} g={190} b={255} />
      <div className="home-background">
        <Features language={translator().translate} />
        <Survey language={translator().translate} />
        <Commands language={translator().translate} />
        <About language={translator().translate} />
        <Invite language={translator().translate} />
        <Bubbles />
      </div>
      <CookieAccept />
      <ScrollToTop />
    </DocumentMeta>
  )
}
