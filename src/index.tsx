import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { onPatch, onSnapshot } from "mobx-state-tree";
import { Game } from "./models";
import "./index.css";

const STORAGE_KEY = "lumber-jack";

let initialState;

const storedState = localStorage.getItem(STORAGE_KEY);
if (storedState) {
  const json = JSON.parse(storedState);
  if (Game.is(json)) initialState = json;
}

const game = Game.create(initialState);

game.initLevel();

onSnapshot(game, snapshot => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
});

if (process.env.NODE_ENV === "development") {
  onPatch(game, patch => {
    console.log(patch);
  });
}

ReactDOM.render(
  <Provider game={game}>
    <App game={game} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
