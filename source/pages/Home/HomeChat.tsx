import { useTranslation, Trans } from "react-i18next";

import maseshiImage from "@/assets/images/maseshi.png";

export default function HomeChat() {
  const { t } = useTranslation();

  const chats = [
    {
      avatarURL: maseshiImage,
      username: "Maseshi",
      created_at: "12:45",
      content: (
        <span className="badge badge-soft badge-secondary">@Shioru</span>
      ),
    },
    {
      avatarURL: "/android-chrome-512x512.png",
      username: "Shioru",
      created_at: "12:45",
      content: t("chats.messages.isComing"),
    },
    {
      avatarURL: maseshiImage,
      username: "Maseshi",
      created_at: "12:46",
      content: (
        <>
          <span className="badge badge-soft badge-secondary">@Shioru</span>{" "}
          {t("chats.messages.nothing")}
        </>
      ),
    },
    {
      avatarURL: "/android-chrome-512x512.png",
      username: "Shioru",
      created_at: "12:46",
      content: "ψ(._. )>",
    },
  ];
  const commands = [
    {
      avatarURL: "/android-chrome-512x512.png",
      username: "Shioru",
      command: "/play",
      description: t("chats.commands.playDescription"),
    },
    {
      avatarURL: "/android-chrome-512x512.png",
      username: "Shioru",
      command: "/ping",
      description: t("chats.commands.pingDescription"),
    },
  ];

  return (
    <section className="bg-primary/5 py-16" id="chat">
      <div className="container mx-auto">
        <div className="hero">
          <div className="hero-content grid grid-cols-1 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold">
                <Trans i18nKey="yourFriendInLonelyTimes" t={t}>
                  Your Friend in
                  <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
                    Lonely
                  </span>
                  Times
                </Trans>{" "}
                🤗
              </h2>
              <p className="py-6">
                <Trans i18nKey="yourFriendInLonelyTimesDescription" t={t}>
                  Whether it's notifying people in and out, playing music,
                  creating board games, or just being a lonely companion on days
                  when he doesn't need them, she's always there to talk to.
                  Whenever you miss her, just type
                  <span className="badge badge-secondary">@Shioru</span>
                  and start chatting!
                </Trans>
              </p>
            </div>
            <div className="animate-float relative min-h-96">
              <div className="card bg-base-200 border-base-300 absolute top-0 left-0 w-96 translate-y-0 rounded-xl border shadow-2xl">
                <div className="card-body">
                  {chats.map((chat, index) => (
                    <div className="chat chat-start" key={index}>
                      <div className="avatar chat-image">
                        <div className="w-10 rounded-full">
                          <img
                            alt={chat.username}
                            src={chat.avatarURL}
                            width="40px"
                            height="40px"
                          />
                        </div>
                      </div>
                      <div className="chat-header">
                        {chat.username}
                        <time className="text-xs opacity-50">
                          {chat.created_at}
                        </time>
                      </div>
                      <div className="chat-bubble">{chat.content}</div>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="list bg-base-300/50 border-base-300 absolute right-0 bottom-0 w-96 rounded-xl border shadow-2xl backdrop-blur-sm">
                {commands.map((command, index) => (
                  <li className="list-row" key={index}>
                    <div>
                      <img
                        className="rounded-box size-10"
                        src={command.avatarURL}
                        alt={command.username}
                      />
                    </div>
                    <div>
                      <div>{command.command}</div>
                      <div className="text-xs font-semibold uppercase opacity-60">
                        {command.description}
                      </div>
                    </div>
                    <span className="self-center">{command.username}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
