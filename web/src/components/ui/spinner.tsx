import { SpinnerIcon } from "@phosphor-icons/react";

export interface SpinnerProps {
  size?: number;
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export const Spinner = ({
  size = 20,
  className = "text-white",
}: SpinnerProps) => {
  return (
    <SpinnerIcon
      size={size}
      weight={'bold'}
      className={`animate-spin ${className}`}
    />
  );
}