import { replace, sort } from "@/modules/domain/utils/collectionUtils";

describe("collection utils", () => {
  it("can sort an array by a given property", () => {
    const item1 = { a: 1, b: 9 };
    const item2 = { a: 2, b: 7 };
    const item3 = { a: 3, b: 8 };
    const items = [item1, item2, item3];

    expect(sort(items).by("a")).toEqual([item1, item2, item3]);
    expect(sort(items).by("b")).toEqual([item2, item3, item1]);
  });

  it("can replace an item in array", () => {
    const item1 = { a: 1, b: 9 };
    const item2 = { a: 2, b: 7 };
    const item3 = { a: 3, b: 8 };
    const items = [item1, item2, item3];

    const updatedItem = { a: 5, b: 5 };

    expect(replace(item1).in(items).with(updatedItem)).toEqual([updatedItem, item2, item3]);
    expect(replace(item2).in(items).with(updatedItem)).toEqual([item1, updatedItem, item3]);
    expect(replace(item3).in(items).with(updatedItem)).toEqual([item1, item2, updatedItem]);
  });
});
