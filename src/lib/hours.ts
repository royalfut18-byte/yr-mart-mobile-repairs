import { hours } from "./data";

const TZ = "Australia/Sydney";

export type OpenState = {
  /** True while the shop is currently trading. */
  isOpen: boolean;
  /** Index into `hours` for the current Sydney day. */
  dayIndex: number;
  /** Short human label, e.g. "Open now" or "Closed - opens Sat 10am". */
  label: string;
  /** Secondary detail, e.g. "Closes 6pm". */
  detail: string;
};

/** Read the wall-clock day and time-of-day in Sydney, wherever the visitor is. */
function sydneyNow(date: Date) {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = Math.max(0, weekdays.indexOf(get("weekday").slice(0, 3)));
  // Intl renders midnight as "24" in some runtimes; normalise it back to 0.
  const hour = Number(get("hour")) % 24;
  const minute = Number(get("minute"));
  const second = Number(get("second"));

  return {
    dayIndex,
    minutes: hour * 60 + minute,
    seconds: hour * 3600 + minute * 60 + second,
  };
}

export type Countdown = {
  isOpen: boolean;
  /** "Closing in" or "Opening in". */
  label: string;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Seconds until the shop next opens or closes, for the live counter. Rolls
 * forward across midnight so an evening visitor sees the wait until tomorrow.
 */
export function getCountdown(date: Date = new Date()): Countdown {
  const { dayIndex, seconds: now } = sydneyNow(date);
  const today = hours[dayIndex];
  const openAt = today.open * 3600;
  const closeAt = today.close * 3600;

  let target: number;
  let isOpen: boolean;

  if (now >= openAt && now < closeAt) {
    isOpen = true;
    target = closeAt - now;
  } else if (now < openAt) {
    isOpen = false;
    target = openAt - now;
  } else {
    isOpen = false;
    const tomorrow = hours[(dayIndex + 1) % 7];
    // Remainder of today plus tomorrow's opening hour.
    target = 24 * 3600 - now + tomorrow.open * 3600;
  }

  return {
    isOpen,
    label: isOpen ? "Closing in" : "Opening in",
    hours: Math.floor(target / 3600),
    minutes: Math.floor((target % 3600) / 60),
    seconds: target % 60,
  };
}

export function formatHour(hour: number) {
  const suffix = hour >= 12 ? "pm" : "am";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${suffix}`;
}

export function getOpenState(date: Date = new Date()): OpenState {
  const { dayIndex, minutes } = sydneyNow(date);
  const today = hours[dayIndex];
  const openMins = today.open * 60;
  const closeMins = today.close * 60;

  if (minutes >= openMins && minutes < closeMins) {
    const minsLeft = closeMins - minutes;
    return {
      isOpen: true,
      dayIndex,
      label: "Open now",
      detail:
        minsLeft <= 60
          ? `Closing in ${minsLeft} min`
          : `Closes ${formatHour(today.close)} today`,
    };
  }

  // Before opening today, otherwise roll forward to the next trading day.
  if (minutes < openMins) {
    return {
      isOpen: false,
      dayIndex,
      label: "Closed",
      detail: `Opens ${formatHour(today.open)} today`,
    };
  }

  const next = hours[(dayIndex + 1) % 7];
  return {
    isOpen: false,
    dayIndex,
    label: "Closed",
    detail: `Opens tomorrow ${formatHour(next.open)}`,
  };
}

/** schema.org openingHours strings, e.g. "Su 10:00-18:00". */
export function schemaHours() {
  const codes = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return hours.map(
    (h, i) =>
      `${codes[i]} ${String(h.open).padStart(2, "0")}:00-${String(h.close).padStart(2, "0")}:00`,
  );
}
