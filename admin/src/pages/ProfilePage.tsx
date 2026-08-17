import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/cmsService";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export function ProfilePage() {
  const { admin, refreshProfile } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: admin?.name ?? "",
      email: admin?.email ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: admin?.name ?? "",
      email: admin?.email ?? "",
    });
  }, [admin]);

  const onSubmit = async (values: FormValues) => {
    await authService.updateProfile(values);
    await refreshProfile();
    toast.success("Profile updated");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Profile</div>
      <h1 className="mt-2 text-3xl font-semibold">Admin profile</h1>
      <form className="mt-6 grid gap-4 md:max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="field">
          <span>Name</span>
          <input {...form.register("name")} />
        </label>
        <label className="field">
          <span>Email</span>
          <input {...form.register("email")} />
        </label>
        <button type="submit" className="btn-primary w-fit">Save profile</button>
      </form>
    </section>
  );
}
