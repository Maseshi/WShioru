import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { getDatabase, ref, get } from "firebase/database";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

interface Command {
  category: string;
  cooldown: number;
  description: Record<string, string>;
  name: string;
  permissions: Array<string>;
  usage: string;
}

export default function HomeCommands() {
  const [active, setActive] = useState<number>(0);
  const [commands, setCommands] = useState<Record<string, Command[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const getCommands = async () => {
      try {
        const database = getDatabase();
        const commandsRef = ref(database, "information/commands");
        const commandsSnapshot = await get(commandsRef);

        if (commandsSnapshot.exists()) {
          const commandsData = commandsSnapshot.val();
          setCommands(commandsData);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };
    getCommands();
  }, []);

  return (
    <section className="bg-primary/5 py-16" id="commands">
      <div className="container mx-auto px-4">
        <div className="py-4 text-center text-5xl font-bold">🚀</div>
        <h2 className="text-center text-4xl font-bold">
          <Trans i18nKey="powerfulCommands" t={t}>
            Simple But <u>Powerful</u>
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
              Commands
            </span>
          </Trans>
        </h2>
        <p className="mx-auto max-w-md py-2 text-center">
          {t("powerfulCommandsDescription")}
        </p>
        <div className="mockup-window bg-base-100 border-base-300 my-8 w-full rounded-xl border">
          <div className="place-content-center">
            {error ? (
              <div className="mx-auto max-w-sm p-8 text-center">
                <WrenchScrewdriverIcon className="text-warning mx-auto size-8" />
                <br />
                <h3 className="text-warning text-2xl font-bold">
                  {t("errorOccurred")}
                </h3>
                <p>{t("cannotLoadCommands")}</p>
              </div>
            ) : (
              <>
                <div role="tablist" className="tabs tabs-box rounded-none">
                  {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <a key={index} role="tab" className="tab skeleton mr-1">
                          <div className="skeleton h-4 w-12" />
                        </a>
                      ))
                    : commands
                      ? Object.keys(commands).map((category, index) => (
                          <a
                            key={index}
                            role="tab"
                            className={`tab ${active === index ? "tab-active text-primary-content [--tab-bg:var(--color-primary)] [--tab-border-color:var(--color-primary)]" : ""}`}
                            onClick={() => setActive(index)}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </a>
                        ))
                      : null}
                </div>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>{t("commands")}</th>
                        <th>{t("description")}</th>
                        <th>{t("usage")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array.from({ length: 6 }).map((_, index) => (
                            <tr key={index}>
                              <td>
                                <div className="flex items-center gap-3">
                                  <div className="avatar">
                                    <div className="mask mask-squircle skeleton h-12 w-12"></div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <div className="skeleton font-bold">
                                      <div className="skeleton h-4 w-12" />
                                    </div>
                                    <div className="skeleton text-sm opacity-50">
                                      <div className="skeleton h-2 w-8" />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="skeleton h-4 w-10" />
                              </td>
                              <td>
                                <div className="skeleton h-4 w-24" />
                              </td>
                            </tr>
                          ))
                        : commands
                          ? Object.keys(commands).map(
                              (category, index) =>
                                active === index &&
                                Object.values(commands[category]).map(
                                  (command, cmdIndex) => (
                                    <tr key={cmdIndex}>
                                      <td>
                                        <div className="flex items-center gap-3">
                                          <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                              <img
                                                src="/android-chrome-512x512.png"
                                                alt={t("shioruAvatarAlternate")}
                                              />
                                            </div>
                                          </div>
                                          <div>
                                            <div className="font-bold">
                                              {command.name}
                                            </div>
                                            <div className="text-sm opacity-50">
                                              {command.category}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        {command.description[i18n.language]}
                                      </td>
                                      <td>/{command.usage}</td>
                                    </tr>
                                  ),
                                ),
                            )
                          : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>{t("commands")}</th>
                        <th>{t("description")}</th>
                        <th>{t("usage")}</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="text-center">
          <Trans i18nKey="moreCommands" t={t}>
            And many more commands to use! Explore them all at
            <code className="bg-primary text-primary-content rounded-sm px-1 py-0.5">
              /help
            </code>
          </Trans>
        </p>
      </div>
    </section>
  );
}
