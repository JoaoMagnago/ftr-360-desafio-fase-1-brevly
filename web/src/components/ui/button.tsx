import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: ["flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:border-transparent transition-all duration-100"],

  variants: {
    size: {
      sm: "p-2 gap-1.5 rounded-sm",
      md: "h-12 rounded-lg",
    },
    color: {
      primary: "bg-gray-200 border border-transparent hover:border-blue-base",
      secondary: "bg-blue-base hover:bg-blue-dark"
    }
  },

  defaultVariants: {
    size: "sm",
    color: 'primary'
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ size, color, className, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component className={buttonVariants({ size, color, className })} {...props} />
  );
}