import { BulkEmailLayout } from "./BulkEmailLayout";
import { getBulkEmailPage } from "./bulkEmailData";

export default function BulkEmailAnalyticsPage() {
  return <BulkEmailLayout page={getBulkEmailPage("analytics")} />;
}
