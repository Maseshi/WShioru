import type { JSX } from "react/jsx-runtime";
import type { ClassAttributes, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { DiscordIcon } from "@/components/Icons/Discord";

import { useAnchorScroller } from "@/hooks/useAnchorScroller";

export default function HeaderMenu(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLUListElement> &
    HTMLAttributes<HTMLUListElement>,
) {
  useAnchorScroller();

  const { t } = useTranslation();

  return (
    <ul {...props}>
      <li>
        <Link to="/#features">{t("features")}</Link>
      </li>
      <li>
        <Link to="/#stats">{t("stats")}</Link>
      </li>
      <li>
        <Link to="/#commands">{t("commands")}</Link>
      </li>
      <li>
        <Link to="/#chat">{t("chat")}</Link>
      </li>
      <li>
        <Link to="/#status">{t("status")}</Link>
      </li>
      <li className="inline-flex lg:hidden">
        <Link
          className="btn btn-soft btn-sm btn-primary btn-block"
          to="/invite"
        >
          <DiscordIcon className="size-5 fill-current" />
          {t("addToDiscord")}
        </Link>
      </li>
    </ul>
  );
}
