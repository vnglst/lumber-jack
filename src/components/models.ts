import { types, Instance, getParent } from "mobx-state-tree";


export const Tree = types
  .model("Tree", {
    health: 40,
    hasDoor: false,
  })
  .actions(self => ({
    chop() {
      self.health -= 20;
      const game = getParent(self, 2);
      if (game.isCleared) self.hasDoor = true;
      if (self.health <= 0) game.addWood();
    }
  }))
  .views(self => ({
    get isDead() {
      return self.health <= 0;
    }
  }));

export interface ITree extends Instance<typeof Tree> { }


export const Game = types
  .model("Game", {
    forest: types.array(Tree),
    wood: 0,
  })
  .actions(self => ({
    addTree() {
      self.forest.push(Tree.create());
    },
    addWood() {
      self.wood += 1;
    },
    restart() {
      self.forest.forEach(tree => {
        tree.health = 40;
        tree.hasDoor = false;
      })
    }
  })
  ).views(self => ({
    get stats() {
      return {
        wood: self.wood
      }
    },
    get isCleared() {
      return self.forest.filter(tree => !tree.isDead).length === 0;
    }
  }))

export interface IGame extends Instance<typeof Game> { }

