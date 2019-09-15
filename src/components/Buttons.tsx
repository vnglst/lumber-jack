import * as React from "react";
import * as SoundFx from "./soundFx";
import { ITree } from "./models";
import * as Icons from "./Icons";

import "./Buttons.css";

interface TreeProps {
  tree: ITree;
}

export const Tree: React.FC<TreeProps> = ({ tree }) => {
  return (
    <button
      aria-label="tree"
      type="button"
      className="button icon-button tree"
      onClick={e => {
        e.preventDefault();
        SoundFx.chop.play();
        tree.chop();
        setTimeout(() => {
          if (tree.isDead) {
            SoundFx.logs.play();
          }
        }, 100);
      }}
    >
      <Icons.Tree />
    </button>
  );
};

export const Stump: React.FC = () => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <button aria-label="stump" className="button icon-button" disabled>
        <Icons.Stump />
      </button>
    </>
  );
};

interface DoorProps {
  startNextLevel: () => void;
}

export const Door: React.FC<DoorProps> = ({ startNextLevel }) => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <button
        aria-label="door"
        className="button icon-button"
        onClick={e => {
          e.preventDefault();
          SoundFx.hesALumberjack.play();
          startNextLevel();
        }}
      >
        <Icons.Door />
      </button>
    </>
  );
};

interface JackProps {
  level: number;
}

export const Jack: React.FC<JackProps> = ({ level }) => {
  return (
    <button
      aria-label="jack"
      className="button jack"
      onClick={e => {
        e.preventDefault();
        SoundFx.imALumberjack.play();
      }}
    >
      <Icons.Lumberjack />
      <span className="level-number">{level}</span>
    </button>
  );
};
