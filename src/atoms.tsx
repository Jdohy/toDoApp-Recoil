import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "To Do",
  "DOING" = "Doing",
  "DONE" = "Done",
}
const { persistAtom } = recoilPersist({
  key: "toDoLocal",
  storage: localStorage,
});

export const categories = atom<string[]>({
  key: "categories",
  default: ["To Do", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
