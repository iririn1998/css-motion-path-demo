import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "oxc"],
  rules: {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { allowConstantExport: true }],
    "prefer-arrow-callback": "error",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "typescript/consistent-type-definitions": ["error", "type"],
  },
});
