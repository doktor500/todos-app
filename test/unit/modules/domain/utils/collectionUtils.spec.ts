import { moveItemFrom, replace, sort } from "@/modules/domain/utils/collectionUtils";

describe("collection utils", () => {
  it("can move an item from one position to another in the array", () => {
    const item0 = { value: "A" };
    const item1 = { value: "B" };
    const item2 = { value: "C" };
    const items = [item0, item1, item2];

    expect(moveItemFrom(items).at(0).to(0)).toEqual(items);
    expect(moveItemFrom(items).at(0).to(1)).toEqual([item1, item0, item2]);
    expect(moveItemFrom(items).at(0).to(2)).toEqual([item1, item2, item0]);
    expect(moveItemFrom(items).at(0).to(3)).toEqual([item1, item2, item0]);
    expect(moveItemFrom(items).at(1).to(2)).toEqual([item0, item2, item1]);
    expect(moveItemFrom(items).at(1).to(3)).toEqual([item0, item2, item1]);
    expect(moveItemFrom(items).at(2).to(0)).toEqual([item2, item0, item1]);
    expect(moveItemFrom(items).at(2).to(1)).toEqual([item0, item2, item1]);
  });

  it("can replace an item in array", () => {
    const item0 = { a: 1, b: 9 };
    const item1 = { a: 2, b: 7 };
    const item2 = { a: 3, b: 8 };
    const items = [item0, item1, item2];

    const updatedItem = { a: 5, b: 5 };

    expect(replace(item0).in(items).with(updatedItem)).toEqual([updatedItem, item1, item2]);
    expect(replace(item1).in(items).with(updatedItem)).toEqual([item0, updatedItem, item2]);
    expect(replace(item2).in(items).with(updatedItem)).toEqual([item0, item1, updatedItem]);
  });

  it("can sort an array by a given property", () => {
    const item0 = { a: 1, b: 9 };
    const item1 = { a: 2, b: 7 };
    const item2 = { a: 3, b: 8 };
    const items = [item0, item1, item2];

    expect(sort(items).by("a")).toEqual([item0, item1, item2]);
    expect(sort(items).by("b")).toEqual([item1, item2, item0]);
  });
});
