import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { authService } from "../services/cmsService";

const schema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(12),
    confirmPassword: z.string().min(12),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

export function ChangePasswordPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await authService.changePassword(values);
    toast.success("Password updated");
    form.reset();
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Security</div>
      <h1 className="mt-2 text-3xl font-semibold">Change password</h1>
      <form className="mt-6 grid gap-4 md:max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
        <label className="field">
          <span>Current password</span>
          <input type="password" {...form.register("currentPassword")} />
        </label>
        <label className="field">
          <span>New password</span>
          <input type="password" {...form.register("newPassword")} />
        </label>
        <label className="field">
          <span>Confirm new password</span>
          <input type="password" {...form.register("confirmPassword")} />
        </label>
        <button type="submit" className="btn-primary w-fit">Update password</button>
      </form>
    </section>
  );
}
