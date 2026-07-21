import { BulkEmailLayout } from "./BulkEmailLayout";
import { getBulkEmailPage } from "./bulkEmailData";

export default function BulkEmailTemplatesPage() {
  return <BulkEmailLayout page={getBulkEmailPage("templates")} />;
}
