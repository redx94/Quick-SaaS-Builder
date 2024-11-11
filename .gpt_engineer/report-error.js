export const loadReportErrorEventListener = (() => {
  let isInitialized = false;

  const extractError = ({ message, lineno, colno, filename, error }) => {
    return { message, lineno, colno, filename, stack: error?.stack };
  };

  return () => {
    if (isInitialized) return;

    const reportedErrors = new Set();

    const generateErrorId = (event) => {
      const { lineno, colno, filename, message } = event;
      return `${message}|${filename}|${lineno}|${colno}`;
    };

    const isErrorAlreadyReported = (errorId) => {
      if (reportedErrors.has(errorId)) {
        return true;
      }
      reportedErrors.add(errorId);
      setTimeout(() => reportedErrors.delete(errorId), 5000);
      return false;
    };

    const reportError = (event) => {
      const errorId = generateErrorId(event);
      if (isErrorAlreadyReported(errorId)) {
        return;
      }
      const error = extractError(event);
      console.log("GOTERR EVENT", event);
      console.log("GOTERR ", error);
      window.top.postMessage({ type: "RUNTIME_ERROR", error }, "https://run.gptengineer.app");
      window.top.postMessage({ type: "RUNTIME_ERROR", error }, "http://localhost:3000");
    };

    window.addEventListener("error", reportError);
    window.addEventListener("unhandledrejection", (event) => {
      const errorId = event.reason?.stack || event.reason?.message || String(event.reason);
      if (isErrorAlreadyReported(errorId)) {
        return;
      }
      const error = { message: event.reason?.message || "Unhandled promise rejection", stack: event.reason?.stack || String(event.reason) };
      console.log("GOT UNHANDLED PROMISE REJECTION", event);
      console.log("GOT UNHANDLED PROMISE REJECTION ", error);
      window.top.postMessage({ type: "RUNTIME_ERROR", error }, "https://run.gptengineer.app");
      window.top.postMessage({ type: "RUNTIME_ERROR", error }, "http://localhost:3000");
    });

    isInitialized = true;
  };
})();

// Next-Level Enhancements:
// 1. Integrate with a cloud-based error tracking service like Sentry.
