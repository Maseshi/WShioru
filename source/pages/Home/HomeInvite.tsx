import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { DiscordIcon } from "@/components/Icons/Discord";

export default function HomeInvite() {
  const { t } = useTranslation();

  return (
    <section className="bg-primary/5 py-16" id="invite">
      <div className="container mx-auto px-4">
        <div className="card bg-primary/30 text-primary-content drop-shadow-primary rounded-3xl drop-shadow-2xl">
          <div className="card-body items-center lg:flex-row">
            <div className="size-32">
              <DotLottieReact
                src="/assets/animations/puissance.lottie"
                loop
                autoplay
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold">{t("readyToInvite")}</h2>
              <p>{t("inviteToJoinWithManyServer")}</p>
            </div>
            <Link className="btn btn-soft btn-primary lg:ml-auto" to="/invite">
              <DiscordIcon className="size-5 fill-current" />{" "}
              {t("addToDiscord")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
