import {
  BellIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import { useTranslation, Trans } from "react-i18next";

export default function HomeFeatures() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ChatBubbleLeftIcon className="size-6" />,
      title: t("smartCommands"),
      description: t("smartCommandsDescription"),
    },
    {
      icon: <BellIcon className="size-6" />,
      title: t("serverManagement"),
      description: t("serverManagementDescription"),
    },
    {
      icon: <HeartIcon className="size-6" />,
      title: t("funInteractions"),
      description: t("funInteractionsDescription"),
    },
    {
      icon: <MusicalNoteIcon className="size-6" />,
      title: t("musicPlayer"),
      description: t("musicPlayerDescription"),
    },
  ];

  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-4">
        <div className="py-4 text-center text-5xl font-bold">✨</div>
        <h2 className="text-center text-4xl font-bold">
          <Trans i18nKey="outstandingFeatures" t={t}>
            คุณสมบัติที่ทำให้
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
              Shioru
            </span>
            <u>พิเศษกว่า</u>
          </Trans>
        </h2>
        <p className="mx-auto max-w-md py-2 text-center">
          {t("outstandingFeaturesDescription")}
        </p>
        <div className="grid grid-cols-1 gap-6 pt-12 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              className="card card-lg bg-primary/20 rounded-xl shadow-sm"
              key={index}
            >
              <div className="card-body items-center text-center">
                <div className="card-actions">
                  <button className="bg-primary text-primary-content rounded-xl p-4">
                    {feature.icon}
                  </button>
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
