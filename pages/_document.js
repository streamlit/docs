import Document, { Html, Head, Main, NextScript } from "next/document";

export default function StreamlitDocument() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export async function getInitialProps(ctx) {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps };
}
