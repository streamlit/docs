import Document, { Html, Head, Main, NextScript } from "next/document";

export default function StreamlitDocument() {
  // TODO: Refactor this using useEffect()
  const setInitialTheme = `
    const query = window.location.search;
    function getUserPreference() {
      if(window.localStorage.getItem('theme')) {
        return window.localStorage.getItem('theme');
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-mode' : 'light-mode';
    }

    
    if(query !== '?oldStyles=false') {
      if(getUserPreference() == 'undefined') {
        document.body.dataset.theme = 'light-mode';
      } else {
        document.body.dataset.theme = getUserPreference();
      }
      
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
