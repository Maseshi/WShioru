import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getPerformance } from "firebase/performance";
import {
  initializeAppCheck,
  ReCaptchaV3Provider
} from 'firebase/app-check'
import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Configs
import config from './configs/data'

// Layouts
import Header from './layouts/Header/index'
import Main from './layouts/Main/index'
import Footer from './layouts/Footer/index'

// Styles
import './styles.css'

export default function App() {
  const app = initializeApp({
    "apiKey": config.server.API_KEY,
    "authDomain": config.server.AUTH_DOMAIN,
    "databaseURL": config.server.DATABASE_URL,
    "projectId": config.server.PROJECT_ID,
    "storageBucket": config.server.STORAGE_BUCKET,
    "messagingSenderId": config.server.MESSAGING_SENDER_ID,
    "appId": config.server.APP_ID,
    "measurementId": config.server.MEASUREMENT_ID
  })

  if (process.env.NODE_ENV === 'production') {
    getAnalytics(app)
    getPerformance(app)
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(config.RECAPTCHA_V3_PROVIDER),
      isTokenAutoRefreshEnabled: true
    })
  }

  return (
    <BrowserRouter>
      <Header />
      <Main />
      <Footer />
    </BrowserRouter>
  )
}