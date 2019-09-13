import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { onPatch } from "mobx-state-tree";
import { Game } from "./components/models";
import "./index.css";

const game = Game.create();

for (let x = 0; x < 6; x++) {
  for (let y = 0; y < 6; y++) {
    game.addTree();
  }
}

onPatch(game, patch => {
  console.log(patch);
});

ReactDOM.render(
  <Provider game={game}>
    <App game={game} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
