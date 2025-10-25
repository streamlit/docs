import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function StreamlitDocument() {
  return (
    <Html>
      <Head>
        {/* OneTrust Consent SDK */}
        <Script
          strategy="beforeInteractive"
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charset="UTF-8"
          data-domain-script="01990a3a-a865-7092-a22e-9094bfac985a"
        ></Script>
        <Script strategy="beforeInteractive" type="text/javascript">
          {`
            function OptanonWrapper() { }

            function getCookie(name) {
              var value = "; " + document.cookie;
              var parts = value.split("; " + name + "=");
              if (parts.length == 2) {
                return true;
              }
            }

            function reloadOTBanner() {
              var otConsentSdk = document.getElementById("onetrust-consent-sdk");
              if (otConsentSdk) {
                otConsentSdk.remove();
              }

              if (window.OneTrust != null) {
                OneTrust.Init();

                setTimeout(function() {
                  OneTrust.LoadBanner();

                  var toggleDisplay = document.getElementsByClassName("ot-sdk-show-settings");
                  for (var i = 0; i < toggleDisplay.length; i++) {
                    toggleDisplay[i].onclick = function(event) {
                      event.stopImmediatePropagation();
                      window.OneTrust.ToggleInfoDisplay();
                    };
                  }
                }, 1000);
              }
            }
          `}
        </Script>
        {/* Segment's OneTrust Consent Wrapper */}
        <Script
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/@segment/analytics-consent-wrapper-onetrust@latest/dist/umd/analytics-onetrust.umd.js"
        ></Script>
        {/* Segment Analytics Snippet */}
        <Script strategy="beforeInteractive" src="/scripts/segment.js"></Script>
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
