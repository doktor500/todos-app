/* eslint-disable no-restricted-imports */
import * as fs from "fs";

import { keys } from "../src/modules/domain/utils/objectUtils";

const tsConfigLocal = JSON.parse(fs.readFileSync("tsconfig.local.json", "utf8"));

const generateLocalMappings = (tsConfigMappings: object) => {
  const singleFilePathMapping = (path: string) => !path.includes("*");

  return keys(tsConfigMappings)
    .filter(singleFilePathMapping)
    .reduce((mappings, key) => ({ ...mappings, [key]: tsConfigMappings[key][0] }), {});
};

const localMappings = generateLocalMappings(tsConfigLocal.compilerOptions.paths);

export { localMappings };
