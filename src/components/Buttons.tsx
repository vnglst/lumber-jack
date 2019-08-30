import * as React from "react"
import "./Buttons.css"
import { Tree, Stump } from "./Icons"

interface Props {
  children?: React.ReactNode
  disabled: boolean
  className?: string
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>
  onTouchStart?: React.EventHandler<React.TouchEvent<HTMLElement>>
  x: number
  y: number
}

export const Button: React.FC<Props> = ({
  children,
  className,
  x,
  y,
  ...rest
}) => {
  let cx = "button"
  if (className) cx += " " + className
  return (
    <button
      style={{ position: "absolute", top: `${x}em`, left: `${y}em` }}
      type="button"
      className={cx}
      {...rest}
    >
      {children}
    </button>
  )
}

interface TreeButtonProps extends Props {
  health: number
}

export const TreeButton: React.FC<TreeButtonProps> = ({ health, ...rest }) => {
  const treeIsDead = health <= 0

  return (
    <Button disabled={treeIsDead} {...rest}>
      {treeIsDead ? <Stump /> : <Tree />}
    </Button>
  )
}
