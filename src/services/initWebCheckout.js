export default function initWebcheckout(callback) {
  const script = document.createElement('script');
  // script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js';

  if (callback) {
    script.addEventListener('load', () => {
      callback();
    });
  }

  document.head.appendChild(script);
}