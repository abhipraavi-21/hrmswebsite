import { BulkEmailLayout } from "./BulkEmailLayout";
import { getBulkEmailPage } from "./bulkEmailData";

export default function BulkEmailContactsPage() {
  return <BulkEmailLayout page={getBulkEmailPage("contacts")} />;
}
