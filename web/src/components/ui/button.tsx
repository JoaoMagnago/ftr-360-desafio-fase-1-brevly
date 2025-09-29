import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Spinner } from "./spinner";

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
    isLoading?: boolean
    spinnerColor?: 'white' | 'text-gray-500' | 'text-gray-600'
  };

export function Button({ size, color, className, asChild, isLoading = false, spinnerColor = 'white', children, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
     <Component
      disabled={isLoading || props.disabled}
      className={buttonVariants({ size, color, className })}
      {...props}
    >
      {isLoading ? (
        <Spinner
          size={16}
          className={spinnerColor}
        />
      ) : children}
    </Component>
  );
}