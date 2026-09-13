import type { IconName } from "@/lib/data";
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ScreenIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.6" />
      <path d="M13.5 6.5 9 12h4l-2.2 5.2" />
    </svg>
  );
}

export function BatteryIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="7" width="16" height="10" rx="3" />
      <path d="M21.5 10.5v3" />
      <path d="M6 10.5v3M9.5 10.5v3M13 10.5v3" />
    </svg>
  );
}

export function GlassIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="5.5" y="2.5" width="13" height="19" rx="2.6" />
      <path d="M5.8 9.5 10 12l-1.4 3.4M18 8l-3.6 2.6 2.1 2.4-3.3 2.1" />
    </svg>
  );
}

export function PortIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="8" y="13" width="8" height="8.5" rx="2" />
      <path d="M12 13V8.5" />
      <path d="M8.5 8.5h7a2 2 0 0 0 2-2V4.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

export function CameraIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="2.5" y="6" width="19" height="14" rx="3" />
      <circle cx="12" cy="13" r="3.6" />
      <path d="M8.5 6l1.3-2.2h4.4L15.5 6" />
    </svg>
  );
}

export function WaterIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.8c3.4 4 5.6 6.8 5.6 9.6a5.6 5.6 0 1 1-11.2 0c0-2.8 2.2-5.6 5.6-9.6Z" />
      <path d="M9.4 13.6a2.7 2.7 0 0 0 2.7 2.7" />
    </svg>
  );
}

export function TabletIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="2.5" width="17" height="19" rx="2.6" />
      <path d="M10.6 18.6h2.8" />
    </svg>
  );
}

export function ShieldIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2.6 20 5.4v6c0 4.6-3.2 8.2-8 10-4.8-1.8-8-5.4-8-10v-6Z" />
      <path d="m8.8 11.9 2.3 2.3 4.1-4.4" />
    </svg>
  );
}

export function SimIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M5.5 2.5h8.2L18.5 7v14.5h-13Z" />
      <rect x="8.5" y="11" width="7" height="6.5" rx="1.6" />
      <path d="M11.9 11v6.5M8.5 14.2h7" />
    </svg>
  );
}

export function DataIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M8 6.5 4.5 10 8 13.5" />
      <path d="M16 10.5 19.5 14 16 17.5" />
      <path d="M4.5 10h11.4a3.6 3.6 0 0 1 3.6 3.6v.4" />
    </svg>
  );
}

export function PhoneIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M6.3 3.5h2.2l1.7 4.2-2 1.3a11.6 11.6 0 0 0 5.3 5.3l1.3-2 4.2 1.7v2.2a2.3 2.3 0 0 1-2.5 2.3A15.6 15.6 0 0 1 4 6a2.3 2.3 0 0 1 2.3-2.5Z" />
    </svg>
  );
}

export function PinIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21.5s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </svg>
  );
}

export function ClockIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.8V12l3.4 2" />
    </svg>
  );
}

export function BoltIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M13.2 2.5 4.8 13h6l-1.4 8.5L18.5 11h-6.2Z" />
    </svg>
  );
}

export function WalletIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <rect x="2.8" y="5.5" width="18.4" height="13.5" rx="3" />
      <path d="M2.8 9.8h18.4" />
      <circle cx="17.2" cy="14.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2l-1.7-5.8L4.5 10.7 10.3 9Z" />
      <path d="M18.6 3.4v3.2M20.2 5h-3.2" />
    </svg>
  );
}

export function ArrowIcon(p: Props) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9Z" />
    </svg>
  );
}

export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z"
      />
    </svg>
  );
}

export const serviceIcons: Record<IconName, (p: Props) => React.JSX.Element> = {
  screen: ScreenIcon,
  battery: BatteryIcon,
  glass: GlassIcon,
  port: PortIcon,
  camera: CameraIcon,
  water: WaterIcon,
  tablet: TabletIcon,
  shield: ShieldIcon,
  sim: SimIcon,
  data: DataIcon,
};
