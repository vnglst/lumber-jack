import { types } from "mobx-state-tree"
import { Howl } from "howler"

const plop2 = new Howl({
  src: ["./audio/plop2.wav"]
})

const chop = new Howl({
  src: ["./audio/chop.wav"]
})

export const Tree = types
  .model("Tree", {
    health: 100,
    x: types.number,
    y: types.number
  })
  .actions(self => ({
    chop(damage) {
      chop.play()
      self.health -= damage
      if (self.health <= 0) plop2.play()
    }
  }))

export const Forest = types
  .model("Forest", {
    trees: types.array(Tree)
  })
  .actions(self => ({
    addTree(x, y) {
      self.trees.push(Tree.create(x, y))
    }
  }))
  .views(self => ({
    total() {
      return self.trees.filter(tree => tree.health <= 0).length
    }
  }))
