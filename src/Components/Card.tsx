import * as React from "react";
interface CardProps extends React.ComponentPropsWithoutRef<"div"> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  props: CardProps,
  forwardRef
) {
  const { children, ...rest } = props;
  return (
    <div
      ref={forwardRef}
      {...rest}
      className="rounded-xl border bg-card text-card-foreground shadow p-2 flex-1"
    >
      {children}
    </div>
  );
});

export { Card };
