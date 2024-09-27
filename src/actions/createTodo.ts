export const createTodo = async (formData: FormData) => {
  "use server";

  console.log(formData.get("userId"));
  console.log(formData.get("todo"));
};
