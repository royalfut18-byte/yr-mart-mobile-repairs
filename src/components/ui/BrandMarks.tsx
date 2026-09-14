/**
 * Marks for the handset brands the shop repairs.
 *
 * Drawn here rather than pulled in as manufacturer logo files: YR MART is an
 * independent repairer, so these are simplified monograms in each brand's own
 * colour, recognisable at a glance in a scrolling lane, without passing
 * themselves off as official artwork.
 */

const SHELL = "grid h-9 w-9 shrink-0 place-items-center";

function Monogram({
  children,
  bg,
  fg = "#fff",
  shape = "rounded-xl",
  size = "text-[0.9rem]",
}: {
  children: string;
  bg: string;
  fg?: string;
  shape?: string;
  size?: string;
}) {
  return (
    <span className={`${SHELL} ${shape}`} style={{ background: bg }} aria-hidden="true">
      <span
        className={`font-display font-extrabold leading-none tracking-tight ${size}`}
        style={{ color: fg }}
      >
        {children}
      </span>
    </span>
  );
}

function AppleMark() {
  return (
    <span className={`${SHELL} rounded-xl bg-ink`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff">
        <path d="M17.05 12.54c-.03-2.9 2.37-4.3 2.48-4.37-1.35-1.98-3.45-2.25-3.71-2.28-1.58-.16-3.09.93-3.89.93-.8 0-2.04-.91-3.35-.88-1.72.02-3.31 1-4.19 2.54-1.79 3.1-.46 7.69 1.28 10.2.85 1.23 1.86 2.61 3.19 2.56 1.28-.05 1.77-.83 3.32-.83 1.55 0 1.99.83 3.35.8 1.38-.02 2.25-1.25 3.09-2.49.97-1.42 1.37-2.8 1.4-2.87-.03-.01-2.68-1.03-2.71-4.08z" />
        <path d="M14.88 4.02c.71-.86 1.19-2.05 1.06-3.24-1.02.04-2.26.68-2.99 1.53-.66.76-1.23 1.97-1.08 3.13 1.14.09 2.3-.58 3.01-1.42z" />
      </svg>
    </span>
  );
}

function GoogleMark() {
  return (
    <span className={`${SHELL} rounded-xl bg-white ring-1 ring-ink/10`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
        />
        <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z" />
        <path
          fill="#EA4335"
          d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"
        />
      </svg>
    </span>
  );
}

function MotorolaMark() {
  return (
    <span className={`${SHELL} rounded-full`} style={{ background: "#5C92FA" }} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]">
        <path
          d="M4 17.5V9l4 4.8L12 8l4 5.8L20 9v8.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function HuaweiMark() {
  return (
    <span className={`${SHELL} rounded-xl`} style={{ background: "#CF0A2C" }} aria-hidden="true">
      {/* Four petals, echoing the flower mark */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#fff">
        <path d="M12 2c1.8 2.6 2.7 4.7 2.7 6.4 0 1.8-.9 2.9-2.7 3.3-1.8-.4-2.7-1.5-2.7-3.3C9.3 6.7 10.2 4.6 12 2Z" />
        <path d="M12 22c-1.8-2.6-2.7-4.7-2.7-6.4 0-1.8.9-2.9 2.7-3.3 1.8.4 2.7 1.5 2.7 3.3 0 1.7-.9 3.8-2.7 6.4Z" />
        <path d="M2 12c2.6-1.8 4.7-2.7 6.4-2.7 1.8 0 2.9.9 3.3 2.7-.4 1.8-1.5 2.7-3.3 2.7C6.7 14.7 4.6 13.8 2 12Z" />
        <path d="M22 12c-2.6 1.8-4.7 2.7-6.4 2.7-1.8 0-2.9-.9-3.3-2.7.4-1.8 1.5-2.7 3.3-2.7 1.7 0 3.8.9 6.4 2.7Z" />
      </svg>
    </span>
  );
}

// Samsung's mark is a blue ellipse, so the monogram keeps that silhouette.
const SamsungMark = () => <Monogram bg="#1428A0" shape="rounded-full">S</Monogram>;
const XiaomiMark = () => <Monogram bg="#FF6900" shape="rounded-2xl" size="text-[0.8rem]">MI</Monogram>;
const OnePlusMark = () => <Monogram bg="#EB0028" shape="rounded-lg" size="text-[0.8rem]">1+</Monogram>;
const OppoMark = () => <Monogram bg="#046A38" shape="rounded-full">O</Monogram>;
const NokiaMark = () => <Monogram bg="#124191">N</Monogram>;
const VivoMark = () => <Monogram bg="#415FFF">v</Monogram>;
const RealmeMark = () => <Monogram bg="#FFC915" fg="#16171f">r</Monogram>;

export const brandMarks = {
  apple: AppleMark,
  google: GoogleMark,
  samsung: SamsungMark,
  motorola: MotorolaMark,
  huawei: HuaweiMark,
  xiaomi: XiaomiMark,
  oneplus: OnePlusMark,
  oppo: OppoMark,
  nokia: NokiaMark,
  vivo: VivoMark,
  realme: RealmeMark,
} as const;

export type BrandMarkName = keyof typeof brandMarks;
