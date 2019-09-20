import React from "react";
import posed, { PoseGroup } from "react-pose";
import { observer, inject } from "mobx-react";
import * as Buttons from "./components/Buttons";
import { IGame } from "./models";
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
      <PoseGroup>
        <Container initialPose="exit" pose="enter" key={game.level}>
          {game.forest.map((tree, index) => {
            if (tree.isGone) return <Buttons.Nothing key={index} />;
            if (tree.isDead && tree.hasDoor)
              return (
                <Buttons.Door
                  startNextLevel={game.startNextLevel}
                  key={index}
                />
              );
            if (tree.isDead) return <Buttons.Stump tree={tree} key={index} />;
            return (
              <P className="animated-tree" key={index}>
                <Buttons.Tree tree={tree} />
              </P>
            );
          })}
        </Container>
      </PoseGroup>
      <Buttons.Jack level={game.level} />
      <Buttons.Stats wood={game.stats.wood} />
    </main>
  );
};

export default inject("game")(observer(App));
