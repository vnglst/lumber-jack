import * as React from "react";
import "./Buttons.css";
import * as Icons from "./Icons";

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>;
}

export const Button: React.FC<Props> = ({ children, className, ...rest }) => {
  let cx = "button";
  if (className) cx += " " + className;
  return (
    <button type="button" className={cx} {...rest}>
      {children}
    </button>
  );
};

export const TreeButton: React.FC<Props> = props => {
  return (
    <Button {...props}>
      <Icons.Tree />
    </Button>
  );
};

export const StumpButton: React.FC<Props> = props => {
  return (
    <Button disabled {...props}>
      <Icons.Stump />
    </Button>
  );
};
