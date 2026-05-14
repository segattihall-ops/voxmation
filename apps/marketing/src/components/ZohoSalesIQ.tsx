import Script from "next/script";

export default function ZohoSalesIQ() {
  return (
    <Script id="zsiqchat" strategy="afterInteractive">
      {`
        var $zoho = $zoho || {};
        $zoho.salesiq = $zoho.salesiq || {
          widgetcode: "siq1713844660d5d8f0aa23fe45b5492bc8c9f31e4445e51522218544f108fdcf6a",
          values: {},
          ready: function () {}
        };

        var d = document;
        var s = d.createElement("script");
        s.type = "text/javascript";
        s.id = "zsiqscript";
        s.defer = true;
        s.src = "https://salesiq.zoho.com/widget";

        var t = d.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(s, t);
      `}
    </Script>
  );
}
