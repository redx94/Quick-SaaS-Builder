export const loadReportUrlChangeEventListener = () => {
  const observeUrlChange = () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;
        window.top.postMessage({ type: "URL_CHANGED", url: document.location.href }, "https://run.gptengineer.app");
        window.top.postMessage({ type: "URL_CHANGED", url: document.location.href }, "http://localhost:3000");
      }
    });
    observer.observe(body, { childList: true, subtree: true });
  };

  window.addEventListener("load", observeUrlChange);
};

// Next-Level Enhancements:
// 1. Use the Navigation API for more robust URL change detection when it becomes widely supported.
