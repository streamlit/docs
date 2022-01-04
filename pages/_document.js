// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";

export default function StreamlitDocument() {
  const setInitialTheme = `
        function getUserPreference() {
            if(window.localStorage.getItem('theme')) {
            return window.localStorage.getItem('theme')
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark-mode'
            : 'light-mode'
        }
        document.body.dataset.theme = getUserPreference();
    `;

  return (
    <Html>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
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
