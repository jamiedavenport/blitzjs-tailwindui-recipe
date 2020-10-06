import { RecipeBuilder } from "@blitzjs/installer";

import pkg from "./package.json";

export default RecipeBuilder()
  .setName("Tailwind UI")
  .setOwner(pkg.author)
  .setRepoLink(pkg.repository.url)
  .build();
