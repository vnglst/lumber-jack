import { types, Instance } from "mobx-state-tree";


export const Tree = types
  .model("Tree", {
    health: 100
  })
  .actions(self => ({
    chop() {
      self.health -= 20;
    }
  }))
  .views(self => ({
    isDead() {
      return self.health <= 0;
    }
  }));

export interface ITree extends Instance<typeof Tree> { }

export const Forest = types
  .model("Forest", {
    trees: types.array(Tree)
  })
  .actions(self => ({
    addTree() {
      self.trees.push(Tree.create());
    }
  }))
  .views(self => ({
    total() {
      return self.trees.filter(tree => tree.isDead()).length;
    }
  }));

export interface IForest extends Instance<typeof Forest> { }
