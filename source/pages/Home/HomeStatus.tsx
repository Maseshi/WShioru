import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  ArrowTurnDownRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import shioruSitImage from "@/assets/images/shioru-sit.webp";

import configs from "@/config";

import { timeAgo } from "@/utils/timeAgo";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

interface Component {
  id: string;
  name: string;
  status:
    | "operational"
    | "degraded_performance"
    | "partial_outage"
    | "major_outage"
    | "under_maintenance";
  created_at: string;
  updated_at: string;
  position: number;
  description: string | null;
  showcase: boolean;
  start_date: string | null;
  group_id: string | null;
  page_id: string;
  group: boolean;
  only_show_if_degraded: boolean;
  components?: string[];
}
interface Summary {
  page: {
    id: string;
    name: string;
    url: string;
    time_zone: string;
    updated_at: string;
  };
  components: Component[];
  status: {
    indicator: "none" | "minor" | "major" | "critical";
    description:
      | "All Systems Operational"
      | "Partially Degraded Service"
      | "Partial System Outage";
  };
}

export default function HomeStatus() {
  const [summary, setSummary] = useState<Summary>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  const backgroundStyle = {
    none: "bg-success/20",
    minor: "bg-info/20",
    major: "bg-warning/20",
    critical: "bg-error/20",
  };
  const statusStyle = {
    none: "status-success",
    minor: "status-info",
    major: "status-warning",
    critical: "status-error",
  };
  const textStyle = {
    none: "text-success",
    minor: "text-info",
    major: "text-warning",
    critical: "text-error",
  };
  const badgeStyle = {
    operational: "badge-success",
    degraded_performance: "badge-warning",
    partial_outage: "badge-warning",
    major_outage: "badge-error",
    under_maintenance: "badge-info",
  };

  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await fetch(
          `https://${configs.statuspageId}.statuspage.io/api/v2/summary.json`,
        );
        const data = await response.json();

        setSummary(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Error fetching status summary:", error);
      }
    };
    getSummary();
  }, []);

  function sortComponents(components: Component[]): Component[] {
    const componentMap: { [key: string]: Component } = {};
    const groupedComponents: { [key: string]: Component[] } = {};

    // Create a map of components by their IDs
    components.forEach((component) => {
      componentMap[component.id] = component;
    });

    // Group components by their group_id
    components.forEach((component) => {
      if (component.group_id) {
        if (!groupedComponents[component.group_id]) {
          groupedComponents[component.group_id] = [];
        }
        groupedComponents[component.group_id].push(component);
      }
    });

    // Sort components within each group by position
    Object.keys(groupedComponents).forEach((groupId) => {
      groupedComponents[groupId].sort((a, b) => a.position - b.position);
    });

    // Create the final sorted list with nested components
    const sortedComponents: Component[] = [];

    components.forEach((component) => {
      if (!component.group_id) {
        sortedComponents.push(component);
        if (component.group && component.components) {
          component.components.forEach((componentId) => {
            if (componentMap[componentId]) {
              sortedComponents.push(componentMap[componentId]);
            }
          });
        }
      }
    });

    return sortedComponents;
  }

  return (
    <section className="bg-primary/5 relative" id="status">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold">
          <Trans i18nKey="healthIsImportant" t={t}>
            <span className="from-primary to-secondary bg-linear-to-r bg-clip-text text-transparent">
              Health
            </span>
            is Also Important
          </Trans>{" "}
          💊
        </h2>
        <p className="py-2">{t("shioruIsUnderCare")}</p>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <img
            className="animate-breathe mx-auto size-auto max-w-sm self-end lg:order-last"
            src={shioruSitImage}
            srcSet={`
              ${shioruSitImage} 320w,
              ${shioruSitImage} 480w,
              ${shioruSitImage} 768w,
              ${shioruSitImage} 1024w
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={t("shioruSitAlternate")}
          />
          <div className="text-center lg:order-first">
            <div className="card bg-base-100/50 my-8 rounded-xl shadow-xl backdrop-blur-sm">
              <div className="card-body p-2">
                {loading ? (
                  <>
                    <div className="card bg-base-200 skeleton">
                      <div className="card-body flex-row items-center justify-between">
                        <div className="skeleton h-4 w-20" />
                        <div className="skeleton h-4 w-28" />
                      </div>
                    </div>
                    <table className="rounded-box bg-base-200 skeleton table">
                      <thead>
                        <tr>
                          <th>
                            <div className="skeleton h-4 w-12" />
                          </th>
                          <th>
                            <div className="skeleton h-4 w-12" />
                          </th>
                          <th>
                            <div className="skeleton h-4 w-12" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 8 }).map((_, index) => (
                          <tr key={index}>
                            <td>
                              <div className="skeleton h-4 w-20" />
                            </td>
                            <td>
                              <div className="skeleton h-4 w-18" />
                            </td>
                            <th>
                              <div className="skeleton h-4 w-20" />
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : error ? (
                  <div className="mx-auto max-w-sm p-8 text-center">
                    <WrenchScrewdriverIcon className="text-warning mx-auto size-8" />
                    <br />
                    <h3 className="text-warning text-2xl font-bold">
                      {t("cannotViewHealthMonitoring")}
                    </h3>
                    <p>{t("healthMonitoringMayError")}</p>
                  </div>
                ) : summary ? (
                  <>
                    <div
                      className={`card ${backgroundStyle[summary.status.indicator]} rounded-xl`}
                    >
                      <div className="card-body flex-row items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="inline-grid *:[grid-area:1/1]">
                            <div
                              className={`status status-xl ${statusStyle[summary.status.indicator]} animate-ping`}
                            />
                            <div
                              className={`status status-xl ${statusStyle[summary.status.indicator]}`}
                            />
                          </div>
                          <h3
                            className={`text-xl ${textStyle[summary.status.indicator]} font-bold`}
                          >
                            {t(`summaryStatus.${summary.status.indicator}`)}
                          </h3>
                        </div>
                        <span>
                          {t("lastUpdatedAt", {
                            date: timeAgo(
                              summary.page.updated_at,
                              i18n.language,
                            ),
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="bg-base-200 rounded-box overflow-x-auto">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>{t("components")}</th>
                            <th>{t("status")}</th>
                            <th>{t("updatedAt")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortComponents(summary.components).map(
                            (component) => (
                              <tr key={component.id}>
                                <td>
                                  <div className="flex items-center gap-3">
                                    {component.group_id ? (
                                      <ArrowTurnDownRightIcon className="size-5" />
                                    ) : null}
                                    <div className="font-bold">
                                      {component.name}
                                    </div>
                                    <div className="text-sm opacity-50">
                                      {component.description}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span
                                    className={`badge ${badgeStyle[component.status]} badge-sm`}
                                  >
                                    {component.status === "operational" ? (
                                      <CheckCircleIcon className="size-4" />
                                    ) : component.status ===
                                      "degraded_performance" ? (
                                      <MinusCircleIcon className="size-4" />
                                    ) : component.status === "major_outage" ? (
                                      <XCircleIcon className="size-4" />
                                    ) : component.status ===
                                      "partial_outage" ? (
                                      <ExclamationCircleIcon className="size-4" />
                                    ) : component.status ===
                                      "under_maintenance" ? (
                                      <MagnifyingGlassCircleIcon className="size-4" />
                                    ) : null}
                                    {t(`componentsStatus.${component.status}`)}
                                  </span>
                                </td>
                                <th>
                                  {timeAgo(component.updated_at, i18n.language)}
                                </th>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <small className="text-center">
              <Trans
                i18nKey="contactUsToReportProblem"
                t={t}
                values={{ email: "dermhioasw123@gmail.com" }}
                components={{
                  a: (
                    <a
                      key="email"
                      className="link link-primary"
                      href="mailto:dermhioasw123@gmail.com"
                      aria-label={t("emailContact")}
                    />
                  ),
                }}
              />
            </small>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className={`${backgroundStyle[error ? "major" : (summary?.status.indicator ?? "none")]} absolute top-70 -right-20 -z-10 hidden size-64 rounded-full blur-3xl md:block`}
      />
      <div
        className={`${backgroundStyle[error ? "major" : (summary?.status.indicator ?? "none")]} absolute inset-0 left-80 -z-10 hidden size-120 rounded-full blur-3xl md:block`}
      />
      <div
        className={`${backgroundStyle[error ? "major" : (summary?.status.indicator ?? "none")]} absolute -bottom-32 -left-20 -z-10 hidden size-80 rounded-full blur-3xl md:block`}
      />
    </section>
  );
}
