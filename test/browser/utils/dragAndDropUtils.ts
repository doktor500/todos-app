/* eslint-disable playwright/no-wait-for-selector */
import { Page } from "@playwright/test";

// see https://stackoverflow.com/questions/64718915/playwright-drag-and-drop
export const dragAndDrop = async (page: Page, originSelector: string, destinationSelector: string) => {
  const originElement = await page.waitForSelector(originSelector);
  const destinationElement = await page.waitForSelector(destinationSelector);
  const originElementBox = await originElement.boundingBox();
  const destinationElementBox = await destinationElement.boundingBox();

  if (!originElementBox || !destinationElementBox) {
    return;
  }

  await page.mouse.move(
    originElementBox.x + originElementBox.width / 2,
    originElementBox.y + originElementBox.height / 2
  );

  await page.mouse.down();

  await page.mouse.move(
    destinationElementBox.x + destinationElementBox.width / 2,
    destinationElementBox.y + destinationElementBox.height / 2,
    { steps: 10 }
  );

  await page.mouse.up();
};
