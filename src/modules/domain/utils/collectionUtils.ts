import { arrayMoveImmutable } from "array-move";
import { equals, find, indexOf, insert, isEmpty, prop, sortBy, without } from "ramda";

const moveItemFrom = <T extends object>(items: T[]) => {
  return {
    at: (sourceIndex: number) => {
      return {
        to: (destinationIndex: number): T[] => {
          return arrayMoveImmutable(items, sourceIndex, destinationIndex);
        },
      };
    },
  };
};

const sort = <T extends object>(items: T[]) => {
  return {
    by: (property: keyof T) => sortBy(prop(property))(items),
  };
};

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

export { isEmpty, moveItemFrom, replace, sort };
