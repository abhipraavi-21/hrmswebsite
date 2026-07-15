"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const DEMO_POPUP_SHOW_DELAY_MS = 900;

const employeeOptions = ["1-10", "11-25", "26-50", "51-100", "101-250", "251-500", "500+"];

const industryOptions = [
  "IT / Software",
  "Manufacturing",
  "Healthcare",
  "Education",
  "Retail",
  "Finance",
  "Logistics",
  "Hospitality",
  "Construction",
  "Real Estate",
  "Other",
];

const demoFormSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  companyName: z.string().min(2, "Please enter your company name."),
  businessEmail: z.string().email("Please enter a valid business email."),
  mobileNumber: z.string().min(7, "Please enter a valid mobile number."),
  employees: z.string().min(1, "Please select the number of employees."),
  industry: z.string().min(1, "Please select your industry."),
  city: z.string().min(2, "Please enter your city."),
  message: z.string().max(500, "Please keep your message under 500 characters.").optional().or(z.literal("")),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

const defaultValues: DemoFormValues = {
  fullName: "",
  companyName: "",
  businessEmail: "",
  mobileNumber: "",
  employees: "",
  industry: "",
  city: "",
  message: "",
};

export default function FreeDemoPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), DEMO_POPUP_SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSubmitted(false);
      form.reset(defaultValues);
    }
  };

  const onSubmit = (values: DemoFormValues) => {
    console.log("Book Free Demo submission", values);
    setSubmitted(true);
    form.reset(defaultValues);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[min(94vw,1040px)] max-w-none overflow-hidden border-border bg-white p-0 shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:rounded-[1.5rem]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 popup-blue-band" />

        <div className="grid max-h-[88vh] lg:grid-cols-[360px_minmax(0,1fr)]">
          {submitted ? (
            <div className="col-span-full flex min-h-[48vh] items-center justify-center p-5 sm:p-6">
              <div className="w-full max-w-lg rounded-[1.5rem] border border-border bg-surface p-6 text-center shadow-card sm:p-7">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ecfdf3] text-success">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink sm:text-2xl">Thank you!</h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">
                  Your request has been submitted successfully. Our team will contact you shortly to
                  schedule your demo.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-full border-primary/20 text-primary hover:bg-primary/5"
                    onClick={() => handleOpenChange(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    className="h-11 rounded-full bg-primary text-white hover:bg-primary/90"
                    onClick={() => {
                      setSubmitted(false);
                      form.reset(defaultValues);
                    }}
                  >
                    Submit another request
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <aside className="hidden border-r border-border bg-[radial-gradient(circle_at_top_left,_rgba(11,92,255,0.12),_transparent_44%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_100%)] p-6 lg:block">
                <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/70 bg-white shadow-[0_20px_50px_rgba(11,92,255,0.12)]">
                  <img
                    src="/hrms-models/demo-form-ai.jpg"
                    alt="AI-generated HRMS dashboard illustration"
                    width={768}
                    height={1152}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-transparent" />
                </div>
              </aside>

              <div className="max-h-[88vh] overflow-y-auto p-5 sm:p-6">
                <div className="mb-4 overflow-hidden rounded-[1.25rem] border border-border bg-surface shadow-card lg:hidden">
                  <img
                    src="/hrms-models/demo-form-ai.jpg"
                    alt="AI-generated HRMS dashboard illustration"
                    width={768}
                    height={1152}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover object-center"
                  />
                </div>

                <DialogHeader className="text-left">
                  <DialogTitle className="mt-3 text-xl font-bold text-ink sm:text-2xl">
                    Book Your Free HRMS Demo
                  </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input className="pl-9" placeholder="name@company.com" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input className="pl-9" placeholder="Enter mobile number" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="employees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Employees *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {employeeOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industryOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input className="pl-9" placeholder="Enter your city" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requirements / Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your current HR processes, challenges, or goals."
                              className="min-h-24 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-ink-soft">
                        By submitting this form, you agree to be contacted about your demo request.
                      </div>
                      <Button
                        type="submit"
                        className="h-10 rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary/90"
                      >
                        Book Free Demo
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
