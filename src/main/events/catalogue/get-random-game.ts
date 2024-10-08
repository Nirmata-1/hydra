import { shuffle } from "lodash-es";

import { getSteam250List } from "@main/services";

import { registerEvent } from "../register-event";
import type { Steam250Game } from "@types";

const state = { games: Array<Steam250Game>(), index: 0 };

const getRandomGame = async (_event: Electron.IpcMainInvokeEvent) => {
  if (state.games.length == 0) {
    const steam250List = await getSteam250List();

    state.games = shuffle(steam250List);
  }

  if (state.games.length == 0) {
    return "";
  }

  state.index += 1;

  if (state.index == state.games.length) {
    state.index = 0;
    state.games = shuffle(state.games);
  }

  return state.games[state.index];
};

registerEvent("getRandomGame", getRandomGame);
