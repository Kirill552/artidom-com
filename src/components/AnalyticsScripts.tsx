import Script from 'next/script';

const METRIKA_ID = 107732709;
const GA_ID = 'G-3BPCM5087W';
const ANALYTICS_DELAY_MS = 3500;

export default function AnalyticsScripts() {
  return (
    <>
      <Script
        id="analytics-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var metrikaId = ${METRIKA_ID};
              var gaId = '${GA_ID}';
              var loaded = false;
              var pendingYmCalls = [];
              var lastTrackedPath = '';

              window.ym = window.ym || function () {
                var args = Array.prototype.slice.call(arguments);
                pendingYmCalls.push(args);
              };
              window.ym.l = 1 * new Date();

              window.dataLayer = window.dataLayer || [];
              window.gtag = window.gtag || function () {
                window.dataLayer.push(arguments);
              };

              function appendScript(src, id) {
                if (document.getElementById(id)) return;

                var script = document.createElement('script');
                script.async = true;
                script.id = id;
                script.src = src;
                document.head.appendChild(script);
              }

              function loadAnalytics() {
                if (loaded) return;
                loaded = true;

                appendScript('https://mc.yandex.ru/metrika/tag.js', 'yandex-metrika-tag');
                window.ym = function () {
                  (window.ym.a = window.ym.a || []).push(arguments);
                };
                window.ym.l = 1 * new Date();
                window.ym(metrikaId, 'init', {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true,
                  ecommerce: 'dataLayer'
                });

                pendingYmCalls.splice(0).forEach(function (args) {
                  window.ym.apply(null, args);
                });

                appendScript('https://www.googletagmanager.com/gtag/js?id=' + gaId, 'google-analytics-tag');
                window.gtag('js', new Date());
                window.gtag('config', gaId);
              }

              function trackPageHit() {
                var path = window.location.pathname + window.location.search;
                if (path === lastTrackedPath) return;
                lastTrackedPath = path;
                window.ym(metrikaId, 'hit', path);
              }

              function watchRouteChanges() {
                var pushState = history.pushState;
                var replaceState = history.replaceState;

                history.pushState = function () {
                  pushState.apply(this, arguments);
                  window.setTimeout(trackPageHit, 0);
                };

                history.replaceState = function () {
                  replaceState.apply(this, arguments);
                  window.setTimeout(trackPageHit, 0);
                };

                window.addEventListener('popstate', trackPageHit);
              }

              window.setTimeout(loadAnalytics, ${ANALYTICS_DELAY_MS});
              window.addEventListener('pointerdown', loadAnalytics, { once: true, passive: true });
              window.addEventListener('keydown', loadAnalytics, { once: true });

              trackPageHit();
              watchRouteChanges();
            }());
          `,
        }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
