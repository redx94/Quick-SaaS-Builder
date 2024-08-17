import { loadGetUserSnapshotEventListener } from "./get-user-snapshot";
import { loadReportUrlChangeEventListener } from "./report-url-change";
import { loadReportErrorEventListener } from "./report-error";

const main = () => {
  loadGetUserSnapshotEventListener();
  loadReportUrlChangeEventListener();
  loadReportErrorEventListener();
};

main();
