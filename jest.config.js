const dotEnv = require("dotenv");
const nextJest = require("next/jest");

dotEnv.config({ path: ".env.development" });

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testTimeout: 30000, // 30 seconds
});

module.exports = jestConfig;
