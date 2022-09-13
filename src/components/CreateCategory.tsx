import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categories } from "../atoms";

interface IForm {
  category: string;
}

function CreateCategory() {
  const setCategories = useSetRecoilState(categories);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategories((oloCategories) => [...oloCategories, category]);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please add your own category",
        })}
        placeholder="Add your own category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;
