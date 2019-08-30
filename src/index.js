import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "mobx-react"
import { onPatch } from "mobx-state-tree"
import { Forest } from "./components/models"

const forest = Forest.create()

for (let x = 0; x < 20; x += 2.2) {
  for (let y = 0; y < 20; y += 2.2) {
    if (Math.random() > 0.1)
      forest.addTree({
        x,
        y
      })
  }
}

onPatch(forest, patch => {
  console.log(patch)
})

ReactDOM.render(
  <Provider forest={forest}>
    <App />
  </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
