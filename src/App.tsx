import React from "react";
import posed, { PoseGroup } from "react-pose";
import { observer, inject } from "mobx-react";
import * as Buttons from "./components/Buttons";
import { IGame } from "./components/models";
import * as Icons from "./components/Icons";
import "./App.css";

const Container = posed.div({
  enter: { staggerChildren: 10, staggerDirection: -1 }
});

const P = posed.span({
  enter: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 }
});

interface Props {
  game: IGame;
}

const App: React.FC<Props> = ({ game }) => {
  return (
    <main>
      <div className="center">
        <Buttons.Jack level={game.level} />
      </div>
      <PoseGroup>
        <Container initialPose="exit" pose="enter" key={game.level}>
          {game.forest.map((tree, index) => {
            if (tree.isDead && tree.hasDoor)
              return (
                <Buttons.Door
                  startNextLevel={game.startNextLevel}
                  key={index}
                />
              );
            if (tree.isDead) return <Buttons.Stump key={index} />;
            return (
              <P className="animated-tree" key={index}>
                <Buttons.Tree tree={tree} />
              </P>
            );
          })}
        </Container>
      </PoseGroup>
      <span className="score">
        <Icons.Lumber />
        <span className="score-number">{game.stats.wood}</span>
      </span>
    </main>
  );
};

export default inject("game")(observer(App));
