import type { RefAttributes } from "react";
import type { JSX } from "react/jsx-runtime";
import { Link, type LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

import shioruImage from "@/assets/images/shioru.webp";

export default function HeaderFavicon(
  props: JSX.IntrinsicAttributes & LinkProps & RefAttributes<HTMLAnchorElement>,
) {
  const { t } = useTranslation();

  return (
    <Link {...props}>
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img
            src={shioruImage}
            alt={t("shioruAvatarAlternate")}
            width="40px"
            height="40px"
          />
        </div>
      </div>
      <span>Shioru's</span>
    </Link>
  );
}
