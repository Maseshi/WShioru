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
  return (
    <>
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
