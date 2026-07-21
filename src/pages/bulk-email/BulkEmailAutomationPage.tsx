import { BulkEmailLayout } from "./BulkEmailLayout";
import { getBulkEmailPage } from "./bulkEmailData";

export default function BulkEmailAutomationPage() {
  return <BulkEmailLayout page={getBulkEmailPage("automation")} />;
}
