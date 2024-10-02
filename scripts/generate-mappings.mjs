import * as fs from "fs";

const tsConfigLocal = JSON.parse(fs.readFileSync("tsconfig.local.json", "utf8"));

const generateLocalFakesMappings = (tsConfigFakeMappings) => {
  const singleFilePathMapping = (path) => !path.includes("*");

  return Object.keys(tsConfigFakeMappings)
    .filter(singleFilePathMapping)
    .reduce((mappings, key) => ({ ...mappings, [key]: tsConfigFakeMappings[key][0] }), {});
};

const localFakes = tsConfigLocal.compilerOptions.paths || {};

const localMappings = generateLocalFakesMappings(localFakes);

export { localMappings };
