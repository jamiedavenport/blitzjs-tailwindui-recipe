import { RecipeBuilder, paths, addImport } from "@blitzjs/installer";
import { join } from "path";
import j from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";
import addInter from "./transforms/addInter";

import pkg from "./package.json";

export default RecipeBuilder()
  .setName("Tailwind UI")
  .setOwner(pkg.author)
  .setRepoLink(pkg.repository.url)
  .addAddDependenciesStep({
    stepId: "addDeps",
    stepName: "Add npm dependencies",
    explanation: `Tailwind CSS requires a couple of dependencies to get up and running.`,
    packages: [
      { name: "tailwindcss", version: "1" },
      { name: "postcss-preset-env", version: "latest", isDevDep: true },
      { name: "@tailwindcss/ui", version: "latest" },
    ],
  })
  .addNewFilesStep({
    stepId: "addConfig",
    stepName: "Add Tailwind CSS and PostCSS config files",
    explanation: `In order to set up Tailwind CSS properly, we need to include a few configuration files. We'll configure Tailwind CSS to know where your app's pages live, and PostCSS for elimination of unused styles.
These config files can be extended for additional customization, but for now we'll just give the minimum required to get started.`,
    targetDirectory: ".",
    templatePath: join(__dirname, "templates", "config"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addStyles",
    stepName: "Add base Tailwind CSS styles",
    explanation: `Next, we need to actually create some stylesheets! These stylesheets can either be modified to include global styles for your app, or you can stick to just using classnames in your components.`,
    targetDirectory: "./app",
    templatePath: join(__dirname, "templates", "styles"),
    templateValues: {},
  })
  .addTransformFilesStep({
    stepId: "importStyles",
    stepName: "Import stylesheets",
    explanation: `Finaly, we can import the stylesheets we just created into our application. For now we'll put them in document.tsx, but if you'd like to only style a part of your app with tailwind you could import the styles lower down in your component tree.`,
    singleFileSearch: paths.app(),
    transform(program: Collection<j.Program>) {
      const stylesImport = j.importDeclaration(
        [],
        j.literal("app/styles/index.css")
      );
      return addImport(program, stylesImport);
    },
  })
  .addTransformFilesStep({
    stepId: "addInterFont",
    stepName: "Add Inter Font",
    explanation: `Tailwind UI examples are built with the Inter font so we'll add it here to ensure your app has the same look and feel`,
    singleFileSearch: paths.document(),
    transform: addInter,
  })
  .build();
