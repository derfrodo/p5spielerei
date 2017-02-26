import TetrisGameDrawer from "./TetrisGameDrawer";
import TetrisGameHelper from "./TetrisGameHelper";

import { ITetrisGameData } from "./../Models/IGame";
import { IGeneralSettings } from "./../Models/IGeneralSettings";


export const createSingletons = (sketch: Sketch, game: ITetrisGameData, generalSettings: IGeneralSettings) => {
    TetrisGameDrawer.Instance = new TetrisGameDrawer(sketch, game, generalSettings);
    TetrisGameHelper.Instance = new TetrisGameHelper(game, generalSettings);
};

