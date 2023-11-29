import * as dateFns from "date-fns";
import esLocale from "date-fns/locale/es/index.js";

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

const formatNumber = (num) => new Intl.NumberFormat().format(num);

function formatAbbreviatedNumber(num) {
  return num < 1_000
    ? formatNumber(num)
    : num < 1_000_000
    ? `${formatNumber(Number((num / 1_000).toFixed(2)))}k`
    : num < 1_000_000_000
    ? `${formatNumber(Number((num / 1_000_000).toFixed(2)))}m`
    : num < 1_000_000_000_000
    ? `${formatNumber(Number((num / 1_000_000_000).toFixed(2)))}b`
    : "a lot";
}

function formatDate(dateString, format = "PPP") {
  if (typeof dateString !== "string") {
    dateString = dateString.toISOString();
  }
  return dateFns.format(parseDate(dateString), format, {
    locale: esLocale,
  });
}

function parseDate(dateString) {
  return dateFns.add(dateFns.parseISO(dateString), {
    minutes: new Date().getTimezoneOffset(),
  });
}

function getDomainUrl(request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  if (!host) {
    throw new Error("Could not determine domain URL.");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

function getRequiredEnvVar(key, env = process.env) {
  if (key in env && typeof env[key] === "string") {
    return env[key] ?? "";
  }

  throw new Error(`Environment variable ${key} is not defined`);
}

function removeTrailingSlash(s) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}



export {
  formatAbbreviatedNumber,
  getDomainUrl,
  getRequiredEnvVar,
  removeTrailingSlash,
  formatDate,
};
