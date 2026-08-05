import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@example.com",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values);
      toast.success("Welcome back");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      if (isAxiosError(error) && !error.response) {
        toast.error("Unable to reach the admin API. Check that the backend is running.");
        return;
      }

      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_36%),linear-gradient(180deg,_#0f172a_0%,_#020617_100%)] px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/95 p-8 shadow-2xl">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-3xl font-semibold text-slate-950">Admin login</h1>
        <p className="mt-2 text-sm text-slate-500">Secure access for content, media and pricing.</p>

        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="field">
            <span>Email</span>
            <input {...form.register("email")} />
            <small className="field-error">{form.formState.errors.email?.message}</small>
          </label>
          <label className="field">
            <span>Password</span>
            <div className="flex gap-2">
              <input type={showPassword ? "text" : "password"} {...form.register("password")} />
              <button type="button" className="btn-secondary shrink-0" onClick={() => setShowPassword((current) => !current)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <small className="field-error">{form.formState.errors.password?.message}</small>
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input type="checkbox" {...form.register("rememberMe")} />
            Remember me
          </label>
          <button type="submit" className="btn-primary w-full justify-center">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
