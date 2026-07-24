import { BulkEmailLayout } from "./BulkEmailLayout";
import { getBulkEmailPage } from "./bulkEmailData";

export default function BulkEmailCampaignsPage() {
  return <BulkEmailLayout page={getBulkEmailPage("campaigns")} />;
}
