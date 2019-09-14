import { types, Instance, getParent } from "mobx-state-tree";

const START_HEALTH = 20;
const HEALTH_GAIN = 20;
const CHOP_DAMAGE = 20;

export const Tree = types
  .model("Tree", {
    health: START_HEALTH,
    hasDoor: false,
    hasCoin: false,
  })
  .actions(self => ({
    chop() {
      self.health -= CHOP_DAMAGE;
      const game = getParent(self, 2);
      if (game.isCleared) self.hasDoor = true; // last tree is always door to next level
      if (self.health <= 0) game.addWood(); // increase user wood
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
    level: 0
  })
  .actions(self => ({
    addTree() {
      self.forest.push(Tree.create());
    },
    addWood() {
      self.wood += 1;
    },
    startNextLevel() {
      self.level += 1;
      self.forest.forEach(tree => {
        tree.health = START_HEALTH + self.level * HEALTH_GAIN;
        tree.hasDoor = false;
        tree.hasCoin = Math.random() * self.level > 3 // coins appear from level 3
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

