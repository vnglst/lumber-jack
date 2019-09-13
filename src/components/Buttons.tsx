import * as React from "react";
import "./Buttons.css";

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
}

export const IconButton: React.FC<Props> = ({
  children,
  className,
  ...rest
}) => {
  let cx = "button icon-button";
  if (className) cx += " " + className;
  return (
    <button type="button" className={cx} {...rest}>
      {children}
    </button>
  );
};
