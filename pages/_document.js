// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "bf0e9fb9015b47e5ad621ec9dddaeec6"}'
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* ✅ Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "046815bb219843d2bd47d0ab125b8040"}'
        ></script>
      </body>
    </Html>
  );
}

