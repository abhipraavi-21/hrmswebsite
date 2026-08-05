import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { contactService } from "../../services/cmsService";
import type { ContactSettings } from "../../types/cms";

export function ContactSettingsPage() {
  const [settings, setSettings] = useState<ContactSettings | null>(null);

  useEffect(() => {
    void contactService.getSettings().then(setSettings);
  }, []);

  const save = async () => {
    if (!settings) return;
    await contactService.updateSettings(settings);
    toast.success("Contact settings updated");
  };

  if (!settings) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Contact Settings</div>
            <h1 className="mt-2 text-3xl font-semibold">Operational contact configuration</h1>
          </div>
          <button type="button" onClick={() => void save()} className="btn-primary">
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="field">
            <span>Page title</span>
            <input value={settings.page_title ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, page_title: event.target.value } : current)} />
          </label>
          <label className="field">
            <span>Page subtitle</span>
            <input value={settings.page_subtitle ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, page_subtitle: event.target.value } : current)} />
          </label>
          <label className="field md:col-span-2">
            <span>Description</span>
            <textarea rows={4} value={settings.description ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, description: event.target.value } : current)} />
          </label>
          <label className="field">
            <span>Phone primary</span>
            <input value={settings.phone_primary ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, phone_primary: event.target.value } : current)} />
          </label>
          <label className="field">
            <span>Email primary</span>
            <input value={settings.email_primary ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, email_primary: event.target.value } : current)} />
          </label>
          <label className="field md:col-span-2">
            <span>Form heading</span>
            <input value={settings.form_heading ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, form_heading: event.target.value } : current)} />
          </label>
          <label className="field md:col-span-2">
            <span>Form description</span>
            <textarea rows={3} value={settings.form_description ?? ""} onChange={(event) => setSettings((current) => current ? { ...current, form_description: event.target.value } : current)} />
          </label>
        </div>
      </section>
    </div>
  );
}
