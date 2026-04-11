import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import { initReactI18next } from "react-i18next";

// Configs
import configs from "@/config";

// Contexts
import { AuthProvider } from "@/contexts/AuthProvider";

// Layouts
import DefaultLayout from "@/layouts/Default";
import DashboardLayout from "@/layouts/Dashboard";

// Pages
import Home from "@/pages/Home";
import NoMatch from "@/pages/NoMatch";
import TermsOfUse from "@/pages/TermsOfUse";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Dashboard from "@/pages/Dashboard";
import GuildOverview from "@/pages/Dashboard/GuildOverview";
import LanguageSettings from "@/pages/Dashboard/LanguageSettings";
import DjsSettings from "@/pages/Dashboard/DjsSettings";
import NotificationSettings from "@/pages/Dashboard/NotificationSettings";
import AntibotSettings from "@/pages/Dashboard/AntibotSettings";
import Leaderboard from "@/pages/Dashboard/Leaderboard";
import CaptchaSettings from "@/pages/Dashboard/CaptchaSettings";
import ChatSettings from "@/pages/Dashboard/ChatSettings";

// Styles
import "@/styles/globals.css";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en-US",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
i18n.on("languageChanged", (lng) => {
  // Set HTML lang attribute when language changes
  document.documentElement.lang = lng;
});

// Initialize Firebase once outside of React
import { getApps } from "firebase/app";

const app = getApps().length ? getApps()[0] : initializeApp(configs.firebase);

if (import.meta.env.MODE === "production" && getApps().length <= 1) {
  getAnalytics(app);
  getPerformance(app);
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(configs.recaptcha),
    isTokenAutoRefreshEnabled: true,
  });
} else if (import.meta.env.MODE !== "production") {
  try {
    connectDatabaseEmulator(getDatabase(app), "localhost", 9000);
  } catch {
    // Already connected to emulator (HMR reload)
  }
}

export default function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          {/* Public pages with Header + Footer */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="invite"
              element={
                <Navigate
                  to="https://discord.com/oauth2/authorize?client_id=704706906505347183&permissions=8&scope=bot+applications.commands"
                  replace
                />
              }
            />
            <Route path="terms-of-use" element={<TermsOfUse />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<NoMatch />} />
          </Route>

          {/* Dashboard - wrapped in AuthProvider */}
          <Route
            element={
              <AuthProvider>
                <Outlet />
              </AuthProvider>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/:guildId" element={<DashboardLayout />}>
              <Route index element={<GuildOverview />} />
              <Route path="language" element={<LanguageSettings />} />
              <Route path="djs" element={<DjsSettings />} />
              <Route path="notification" element={<NotificationSettings />} />
              <Route path="antibot" element={<AntibotSettings />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="captcha" element={<CaptchaSettings />} />
              <Route path="chat" element={<ChatSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
