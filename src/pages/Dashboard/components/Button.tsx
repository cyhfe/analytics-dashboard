import React from "react";
import { cn } from "../../../utils";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props: ButtonProps,
  forwardRef
) {
  const { children, className, active = false, ...rest } = props;
  const activeCn = active ? "bg-white font-medium  text-slate-800 shadow" : "";
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm text-slate-400 font-normal ",
        activeCn,
        className
      )}
      ref={forwardRef}
      {...rest}
    >
      {children}
    </button>
  );
});

export { Button };
