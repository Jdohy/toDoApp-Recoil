import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      if (newToDo.category) {
        return [
          ...oldToDos.slice(0, targetIndex),
          newToDo,
          ...oldToDos.slice(targetIndex + 1),
        ];
      } else return oldToDos.filter((toDo, idx) => idx !== targetIndex);
    });
  };
  const xx = useRecoilValue(categories);
  const cates = xx.filter((data) => data !== category);
  return (
    <li>
      <span>{text}</span>
      {cates.map((data, idx) => {
        return (
          <button key={idx} name={data} onClick={onClick}>
            {data}
          </button>
        );
      })}
      <button name="" onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;
