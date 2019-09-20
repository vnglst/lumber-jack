import { types, Instance, getParent } from "mobx-state-tree";
import { levels } from "./levels";

const START_HEALTH = 25;
const HEALTH_GAIN = 20;
const CHOP_DAMAGE = 20;

export const Tree = types
  .model("Tree", {
    health: START_HEALTH,
    x: types.number,
    y: types.number,
    hasDoor: false,
  })
  .actions(self => ({
    chop() {
      self.health -= CHOP_DAMAGE;
      const game = getParent(self, 2);
      if (game.isCleared) self.hasDoor = true; // last tree is always door to next level
      if (self.health <= 5) game.addWood(); // increase user wood
    }
  }))
  .views(self => ({
    get isDead() {
      return self.health <= 5;
    },
    get isGone() {
      return self.health <= 0;
    }
  }));

export interface ITree extends Instance<typeof Tree> { }

export const Game = types
  .model("Game", {
    forest: types.array(Tree),
    wood: 0,
    level: 0,
  })
  .actions(self => ({
    initLevel() {
      self.forest.length = 0;
      const level = levels[self.level % levels.length];
      const rows = level.split("\n");
      rows.forEach((row, y) => {
        const objs = row.split("");
        objs.forEach((obj, x) => {
          if (obj === "_") self.forest.push(Tree.create({ x, y, health: 0 }));
          if (obj === "^") self.forest.push(Tree.create({ x, y, health: 5 }));
          if (obj === "*") self.forest.push(Tree.create({ x, y, health: START_HEALTH + self.level * HEALTH_GAIN }));
        });
      });
    },
    addWood() {
      self.wood += 1;
    },
    startNextLevel() {
      self.level += 1;
      this.initLevel()
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
