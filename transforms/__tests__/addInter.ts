import j from "jscodeshift";
import addInter from "../addInter";

const sampleFile = `import {Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/} from "@blitzjs/core"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument`;

test("addInter transformation", () => {
  expect(addInter(j(sampleFile)).toSource()).toMatchSnapshot();
});
