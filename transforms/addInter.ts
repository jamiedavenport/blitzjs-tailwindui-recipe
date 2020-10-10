import j from "jscodeshift";
import { Collection } from "jscodeshift/src/Collection";

export default function transform(program: Collection<j.Program>) {
  program.findJSXElements("DocumentHead").replaceWith((nodePath) => {
    return j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier("DocumentHead")),
      j.jsxClosingElement(j.jsxIdentifier("DocumentHead")),
      [
        j.jsxText("\n"),
        j.jsxElement(
          j.jsxOpeningElement(
            j.jsxIdentifier("link"),
            [
              j.jsxAttribute(j.jsxIdentifier("rel"), j.literal("stylesheet")),
              j.jsxAttribute(
                j.jsxIdentifier("href"),
                j.literal("https://rsms.me/inter/inter.css")
              ),
            ],
            true
          ),
          null,
          []
        ),
        j.jsxText("\n"),
      ]
    );
  });
  return program;
}
