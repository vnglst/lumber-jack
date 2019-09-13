import * as React from "react";
import { observer } from "mobx-react";
import { Howl } from "howler";
import { ITree } from "./models";
import { IconButton } from "./Buttons";
import * as Icons from "./Icons";

const plop = new Howl({
  src: ["./audio/throw-logs-short.mp3"]
});

const chop = new Howl({
  src: ["./audio/chop.wav"]
});

interface TreeProps {
  tree: ITree;
}

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
    <IconButton onClick={handleClick}>
      <Icons.Tree />
    </IconButton>
  );
});

export const Stump: React.FC = observer(() => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <IconButton disabled>
        <Icons.Stump />
      </IconButton>
    </>
  );
});

interface DoorProps {
  restartGame: () => void;
}

export const Door: React.FC<DoorProps> = observer(({ restartGame }) => {
  return (
    <>
      <Icons.Lumber className="lumber-animation" />
      <IconButton onClick={restartGame}>
        <Icons.Door />
      </IconButton>
    </>
  );
});
