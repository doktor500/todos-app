export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export const toggle = (todo: Todo): Todo => {
  return { ...todo, completed: !todo.completed };
};
