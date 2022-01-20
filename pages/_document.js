import Document, { Html, Head, Main, NextScript } from "next/document";

export default function StreamlitDocument() {
  const setInitialTheme = `
    const query = window.location.search;
    function getUserPreference() {
      if(window.localStorage.getItem('theme')) {
        return window.localStorage.getItem('theme');
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode';
    }

    
    if(query !== '?oldStyles=false') {
      document.body.dataset.theme = getUserPreference();
      
      if(getUserPreference() === 'dark-mode') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    }
    window.initial = { prism: false };
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
