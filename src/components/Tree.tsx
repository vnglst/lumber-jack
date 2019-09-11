import * as React from "react";
import { Howl } from "howler";
import { ITree } from "./models";
import { StumpButton, TreeButton } from "./Buttons";

const plop = new Howl({
  src: ["./audio/plop.mp3"]
});

const chop = new Howl({
  src: ["./audio/chop.wav"]
});

interface Tree {
  tree: ITree;
}

export const Tree: React.FC<Tree> = ({ tree }) => {
  if (tree.isDead()) return <StumpButton />;

  function handleClick(e: React.SyntheticEvent) {
    e.preventDefault();
    tree.chop();
    if (tree.isDead()) {
      plop.play();
    } else {
      chop.play();
    }
  }

  return <TreeButton onClick={handleClick} onTouchStart={handleClick} />;
};
