import type { SVGProps } from "react";

export function FireIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11.5 6.5c0-2.5-2-4-4-4s-4 1.5-4 4c0 1.95 1.15 3.53 2.73 4.25.26.12.5.25.77.25s.51-.13.77-.25C10.35 10.03 11.5 8.45 11.5 6.5z" />
      <path d="M12.5 9.5c0 3.5-2 6-5 6s-5-2.5-5-6c0-1.29.53-2.47 1.34-3.32" />
      <path d="M14.5 12.5c0 4.5-2 8-7 8s-7-3.5-7-8c0-2.43 1.1-4.58 2.7-5.95" />
    </svg>
  );
}

export function FloodIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4h8v5" />
      <path d="M12 9h6v5" />
      <path d="M12 14h4v5" />
      <path d="M8.25 10.25c-.28-.28-.28-.72 0-1s.72-.28 1 0" />
      <path d="M5.25 7.25c-.28-.28-.28-.72 0-1s.72-.28 1 0" />
      <path d="M11.25 16.25c-.28-.28-.28-.72 0-1s.72-.28 1 0" />
    </svg>
  );
}
