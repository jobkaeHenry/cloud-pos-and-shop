import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface Props
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "className"
  > {
  gap?: number;
  children?: ReactNode | ReactNode[];
  className?: string
}

export const RowWrapper = ({ gap, children, className }: Props) => {
  return (
    <div className={`flex-row flex ${gap ? `gap-${gap}` : ""} ${className}`}>
      {children}
    </div>
  );
};

export const ColumnWrapper = ({ gap, children, className }: Props) => {
  return (
    <div
      className={`flex-col flex ${
        gap ? `gap-${gap}` : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default RowWrapper;
