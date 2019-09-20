import * as React from "react";
import * as SoundFx from "./soundFx";
import { ITree } from "../models";
import * as Icons from "./Icons";

import "./Buttons.css";

interface Props {
  tree: ITree;
}

export const Tree: React.FC<Props> = ({ tree }) => {
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

export const Stump: React.FC<Props> = () => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <button aria-label="stump" className="button icon-button" disabled>
        <Icons.Stump />
      </button>
    </>
  );
};

export const Nothing: React.FC = () => {
  return (
    <button aria-label="nothing" className="button icon-button" disabled>
      <Icons.Nothing />
    </button>
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
      onClick={e => {
        e.preventDefault();
        SoundFx.imALumberjack.play();
      }}
      className="button jack"
    >
      <Icons.Lumberjack />
      <span className="level-number">{level}</span>
    </button>
  );
};

interface StatsProps {
  wood: number;
}

export const Stats: React.FC<StatsProps> = ({ wood }) => {
  return (
    <button className="button stats">
      <Icons.Lumber />
      <span className="stats-number">{wood}</span>
    </button>
  );
};
