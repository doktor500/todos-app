import { equals, find, indexOf, insert, without } from "ramda";

const replace = <TYPE>(item: TYPE) => {
  return {
    in: (list: TYPE[]) => ({
      with: (newItem: TYPE) => {
        const listWithoutItem = without([item], list);
        const foundItem = find((currentItem) => equals(currentItem, item))(list);

        return foundItem ? insert(indexOf(item, list), newItem, listWithoutItem) : list;
      },
    }),
  };
};

export { replace };
