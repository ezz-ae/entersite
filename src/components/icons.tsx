import type { SVGProps } from "react";

export function EntreSiteLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm-40 120h-32v-24h32a8 8 0 0 1 0 16Zm-40-40h40a8 8 0 0 1 0 16h-40v24h-16v-48h56a8 8 0 0 1 0 16H88v16Zm-16 56H56a8 8 0 0 1 0-16h16v-24h32v40Zm104-56h-48a8 8 0 0 1 0-16h48v40h-16v-24h-32v-16h48a8 8 0 0 1 0 16Z"
      />
    </svg>
  );
}
