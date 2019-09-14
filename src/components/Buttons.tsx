import * as React from "react";
import { observer } from "mobx-react";
import { Howl } from "howler";
import { ITree } from "./models";
import * as Icons from "./Icons";

import "./Buttons.css";

const plop = new Howl({
  src: ["./audio/throw-logs-short.mp3"]
});

const chop = new Howl({
  src: ["./audio/chop.wav"]
});

interface TreeProps {
  tree: ITree;
}

const imALumberjack = new Howl({
  src: ["./audio/im-a-lumberjack.mp3"]
});

const hesALumberjack = new Howl({
  src: ["./audio/hes-a-lumberjack.mp3"]
});

export const Tree: React.FC<TreeProps> = observer(({ tree }) => {
  function handleClick(e: React.SyntheticEvent) {
    e.preventDefault();
    chop.play();
    tree.chop();
    setTimeout(() => {
      if (tree.isDead) {
        plop.play();
      }
    }, 100);
  }

  return (
    <button type="button" className="button icon-button" onClick={handleClick}>
      <Icons.Tree />
    </button>
  );
});

export const Stump: React.FC = observer(() => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <button className="button icon-button" disabled>
        <Icons.Stump />
      </button>
    </>
  );
});

interface DoorProps {
  startNextLevel: () => void;
}

export const Door: React.FC<DoorProps> = observer(({ startNextLevel }) => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <button
        className="button icon-button"
        onClick={e => {
          e.preventDefault();
          hesALumberjack.play();
          startNextLevel();
        }}
      >
        <Icons.Door />
      </button>
    </>
  );
});

interface JackProps {
  level: number;
}

export const Jack: React.FC<JackProps> = ({ level }) => {
  return (
    <button
      className="button jack"
      onClick={e => {
        e.preventDefault();
        imALumberjack.play();
      }}
    >
      <Icons.Lumberjack />
      <span className="level-number">{level}</span>
    </button>
  );
};
