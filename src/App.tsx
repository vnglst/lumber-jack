import React from "react";
import { Tree } from "./components/Tree";
import { observer, inject } from "mobx-react";
import "./App.css";
import { IForest } from "./components/models";
import * as Icons from "./components/Icons";

interface Props {
  forest: IForest;
}

const App: React.FC<Props> = ({ forest }) => {
  return (
    <>
      {forest.trees.map((tree, index) => (
        <Tree tree={tree} key={index} />
      ))}
      <span className="score">
        <Icons.Lumber />
        <span> {forest.total()} </span>
      </span>
    </>
  );
};

export default inject("forest")(observer(App));
