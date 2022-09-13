import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState, toDoSelector } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const cates = useRecoilValue(categories);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>To Dos</h1>
      <CreateCategory />
      <hr style={{ marginBottom: "10px" }} />
      <select
        style={{ marginBottom: "10px" }}
        value={category}
        onInput={onInput}
      >
        <>
          {cates.map((data, idx) => {
            return (
              <option key={idx} value={data}>
                {data}
              </option>
            );
          })}
        </>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
