// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import base from "@packages/eslint-config";

export default [...base, {
  ignores: [
    "node_modules/**",
    "dist/**",
    ".umi/**",
    "temp/**",
  ],
}, ...storybook.configs["flat/recommended"]];

