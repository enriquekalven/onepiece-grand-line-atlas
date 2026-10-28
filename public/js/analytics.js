/**
 * Google Analytics 4 (GA4) & Opt-In Cookie Consent Controller
 * Provisioned in GCP project `project-maui` for `onepiece-grand-line-atlas.web.app`
 * Strict kid-safe configuration: ad signals disabled, IP anonymized, strictly opt-in.
 */
(function initOnePieceAnalyticsModule(root) {
  'use strict';

  var GA_MEASUREMENT_ID = 'G-3XD1EEG3BC';
  var FIREBASE_APP_ID = '1:697625214430:web:4eb1c198ecde36fc82f14f';
  var CONSENT_STORAGE_KEY = 'onepiece-analytics-consent';

  var PROD_HOSTS = new Set([
    'onepiece-grand-line-atlas.web.app',
    'onepiece-grand-line-atlas.firebaseapp.com',
    'project-maui.web.app',
    'project-maui.firebaseapp.com'
  ]);

  var analyticsLoaded = false;
  var analyticsEnabled = false;

  function isAnalyticsAllowedHost() {
    if (typeof window === 'undefined' || !window.location) return false;
    var params = new URLSearchParams(window.location.search || '');
    return PROD_HOSTS.has(window.location.hostname) || params.get('debug_ga') === '1';
  }

  function getSavedConsent() {
    try {
      return window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch (_e) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch (_e) {
      // Ignore storage errors in private browsing
    }
  }

  function enableAnalytics() {
    if (typeof window === 'undefined') return;
    window['ga-disable-' + GA_MEASUREMENT_ID] = false;
    analyticsEnabled = true;

    if (!isAnalyticsAllowedHost()) {
      return;
    }

    if (analyticsLoaded) {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
      return;
    }

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      app_name: 'One Piece 3D Grand Line Atlas',
      firebase_app_id: FIREBASE_APP_ID,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: 'SameSite=None;Secure'
    });

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function disableAnalytics() {
    if (typeof window === 'undefined') return;
    analyticsEnabled = false;
    window['ga-disable-' + GA_MEASUREMENT_ID] = true;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  }

  function trackEvent(eventName, eventParams) {
    if (!analyticsEnabled || typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }
    try {
      window.gtag('event', eventName, eventParams || {});
    } catch (_e) {
      // Fail silently if blocked by browser extensions
    }
  }

  function initCookieConsent() {
    if (typeof document === 'undefined') return;
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('btn-cookie-accept');
    var declineBtn = document.getElementById('btn-cookie-decline');
    var settingsBtn = document.getElementById('btn-cookie-settings');

    var current = getSavedConsent();
    if (current === 'granted') {
      enableAnalytics();
      if (banner) banner.hidden = true;
    } else if (current === 'denied') {
      disableAnalytics();
      if (banner) banner.hidden = true;
    } else {
      if (banner) banner.hidden = false;
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        saveConsent('granted');
        enableAnalytics();
        if (banner) banner.hidden = true;
        trackEvent('cookie_consent_updated', { status: 'granted' });
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        saveConsent('denied');
        disableAnalytics();
        if (banner) banner.hidden = true;
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', function () {
        if (banner) {
          banner.hidden = !banner.hidden;
        }
      });
    }
  }

  var api = {
    GA_MEASUREMENT_ID: GA_MEASUREMENT_ID,
    FIREBASE_APP_ID: FIREBASE_APP_ID,
    CONSENT_STORAGE_KEY: CONSENT_STORAGE_KEY,
    enableAnalytics: enableAnalytics,
    disableAnalytics: disableAnalytics,
    trackEvent: trackEvent,
    initCookieConsent: initCookieConsent,
    getSavedConsent: getSavedConsent
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
  root.OnePieceAnalytics = api;
})(typeof window !== 'undefined' ? window : globalThis);
