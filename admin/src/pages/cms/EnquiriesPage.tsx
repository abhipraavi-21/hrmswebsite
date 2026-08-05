import { useEffect, useState } from "react";
import { contactService } from "../../services/cmsService";
import type { ContactEnquiry } from "../../types/cms";

export function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [status, setStatus] = useState("");

  const reload = async () => {
    const data = await contactService.listEnquiries({ status: status || undefined });
    setEnquiries(data.items);
  };

  useEffect(() => {
    void reload();
  }, [status]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Enquiries</div>
            <h1 className="mt-2 text-3xl font-semibold">Contact submissions</h1>
          </div>
          <select className="field-input max-w-48" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="in_progress">In Progress</option>
            <option value="replied">Replied</option>
            <option value="closed">Closed</option>
            <option value="spam">Spam</option>
          </select>
        </div>
      </section>

      <div className="space-y-4">
        {enquiries.map((enquiry) => (
          <article key={enquiry.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{enquiry.fullName}</div>
                <div className="text-sm text-slate-500">{enquiry.email}</div>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {enquiry.status.replace("_", " ")}
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{enquiry.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
