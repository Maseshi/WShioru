import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";

export default function NoMatch() {
  const { t } = useTranslation();

  return (
    <>
      <title>{`${t("notFound.title", "Page Not Found")} | Shioru's`}</title>
      <meta name="robots" content="noindex" />
      <div className="hero min-h-screen">
        <div className="hero-content relative text-center">
          <div className="max-w-md">
            <MagnifyingGlassMinusIcon className="text-primary mx-auto my-4 size-14 text-5xl font-bold" />
            <h1 className="text-primary text-5xl font-bold">
              {t("notFound.heading", "It's gone!")}
            </h1>
            <p className="pb-6">
              {t(
                "notFound.description",
                "We searched every corner for this page, but found nothing.",
              )}
            </p>
            <Link className="btn btn-primary" to="/">
              {t("notFound.backHome", "Go back")}
            </Link>

            {/* Decorative Elements */}
            <div className="bg-primary/20 absolute inset-0 -z-10 size-96 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </>
  );
}
