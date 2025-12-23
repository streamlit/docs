import Document, { Html, Head, Main, NextScript } from "next/document";
import { getThemeBootstrapScript } from "../lib/next/theme";

export default function StreamlitDocument() {
  return (
    <Html>
      <Head>
        {/* Prevent light->dark flash by applying theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: getThemeBootstrapScript(),
          }}
        />
        {/* OneTrust Consent SDK */}
        <script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charset="UTF-8"
          data-domain-script="01990a3a-a865-7092-a22e-9094bfac985a"
        ></script>
        <script src="/scripts/onetrustsetup.js"></script>
        {/* Segment's OneTrust Consent Wrapper */}
        <script src="https://cdn.jsdelivr.net/npm/@segment/analytics-consent-wrapper-onetrust@latest/dist/umd/analytics-onetrust.umd.js"></script>
        {/* Segment Analytics Snippet */}
        <script src="/scripts/segment.js"></script>
      </Head>
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
