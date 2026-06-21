import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "destructive";

type ButtonProps = {
  variant?: Variant;
  className?: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        getVariantStyles(variant),
        "transition-colors px-3 py-1 rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
        className,
      )}
    />
  );
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:bg-violet-500";
    case "secondary":
      return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400";
    case "destructive":
      return "hover:bg-red-700 text-red-600 hover:text-red-200";
    default:
      throw new Error(`Unknown variant: ${variant satisfies never}`);
  }
}
