import React from "react";
import { TreeButton } from "./components/Buttons";
import { observer, inject } from "mobx-react";
import "./App.css";
import { Lumber } from "./components/Icons";

const DAMAGE = 20;

const App = ({ forest }) => {
  return (
    <>
      {forest.trees.map((tree, index) => {
        return (
          <TreeButton
            x={tree.x}
            y={tree.y}
            health={tree.health}
            key={index}
            onClick={e => {
              e.preventDefault();
              tree.chop(DAMAGE);
            }}
          />
        );
      })}
      <span className="score">
        <Lumber />
        <span>{forest.total()}</span>
      </span>
    </>
  );
};

export default inject("forest")(observer(App));
