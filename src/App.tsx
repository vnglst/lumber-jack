import React from "react";
import * as Variants from "./components/Variants";
import { observer, inject } from "mobx-react";
import { IGame } from "./components/models";
import * as Icons from "./components/Icons";
import "./App.css";

interface Props {
  game: IGame;
}

const App: React.FC<Props> = ({ game }) => {
  return (
    <>
      {game.forest.map((tree, index) => {
        if (tree.isDead && tree.hasDoor)
          return <Variants.Door restartGame={game.restart} key={index} />;

        if (tree.isDead) return <Variants.Stump key={index} />;

        return <Variants.Tree tree={tree} key={index} />;
      })}
      <span className="score">
        <Icons.Lumber />
        <span className="score-number">{game.stats.wood}</span>
      </span>
    </>
  );
};

export default inject("game")(observer(App));
