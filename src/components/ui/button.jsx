import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300  font-light",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        destructive:
          "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",

        //custom
        Happy:
          "bg-yellow-100 text-yellow-700 shadow-sm hover:shadow-md hover:bg-yellow-200 dark:border-yellow-500 dark:bg-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-700 h-12 rounded-lg px-6 py-3",
        Sad: "bg-blue-100 text-blue-700 shadow-sm hover:shadow-md hover:bg-blue-200 dark:border-blue-500 dark:bg-blue-800 dark:text-blue-300 dark:hover:bg-blue-700 h-12 rounded-lg px-6 py-3",
        Angry:
          "bg-red-100 text-red-700 shadow-sm hover:shadow-md hover:bg-red-200 dark:border-red-500 dark:bg-red-800 dark:text-red-300 dark:hover:bg-red-700 h-12 rounded-lg px-6 py-3",
        Afraid:
          "bg-purple-100 text-purple-700 shadow-sm hover:shadow-md hover:bg-purple-200 dark:border-purple-500 dark:bg-purple-800 dark:text-purple-300 dark:hover:bg-purple-700 h-12 rounded-lg px-6 py-3",
        Surprised:
          "bg-pink-100 text-pink-700 shadow-sm hover:shadow-md hover:bg-pink-200 dark:border-pink-500 dark:bg-pink-800 dark:text-pink-300 dark:hover:bg-pink-700 h-12 rounded-lg px-6 py-3",
        Disgusted:
          "bg-amber-100 text-amber-700 shadow-sm hover:shadow-md hover:bg-amber-200 dark:border-amber-500 dark:bg-amber-800 dark:text-amber-300 dark:hover:bg-amber-700 h-12 rounded-lg px-6 py-3",
        Calm: "bg-gray-100 text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-200 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 h-12 rounded-lg px-6 py-3",
        Excited:
          "bg-orange-100 text-orange-700 shadow-sm hover:shadow-md hover:bg-orange-200 dark:border-orange-500 dark:bg-orange-800 dark:text-orange-300 dark:hover:bg-orange-700 h-12 rounded-lg px-6 py-3",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  (
    { type = "button", className, variant, size, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
