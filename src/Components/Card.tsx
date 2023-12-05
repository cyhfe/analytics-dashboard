import * as React from "react";
import { cn } from "../utils";
interface CardProps extends React.ComponentPropsWithoutRef<"div"> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  props: CardProps,
  forwardRef
) {
  const { children, className, ...rest } = props;
  return (
    <div
      ref={forwardRef}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow flex-auto",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export { Card };
