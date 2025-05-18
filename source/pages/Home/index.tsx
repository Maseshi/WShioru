import { useTranslation } from "react-i18next";

import Cookies from "@/components/Cookies";

import Main from "@/layouts/Main";
import HomeGreeting from "./HomeGreeting";
import HomeFeatures from "./HomeFeatures";
import HomeStats from "./HomeStats";
import HomeCommands from "./HomeCommands";
import HomeChat from "./HomeChat";
import HomeInvite from "./HomeInvite";
import HomeStatus from "./HomeStatus";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <title>{`Shioru's - ${t("discordBot")}`}</title>
      <meta name="description" content={t("aboutThisWebsite")} />
      <meta property="og:title" content={`Shioru's - ${t("discordBot")}`} />
      <meta property="og:description" content={t("aboutThisWebsite")} />
      <meta property="og:url" content="https://shiorus.web.app" />
      <Main className="relative overflow-clip">
        <HomeGreeting />
        <HomeFeatures />
        <HomeStats />
        <HomeCommands />
        <HomeChat />
        <HomeStatus />
        <HomeInvite />
      </Main>
      <Cookies />
    </>
  );
}
