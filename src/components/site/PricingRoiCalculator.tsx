import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes/routeConfig.js";
import {
  calculateHrmsRoi,
  clampNumber,
  formatINR,
  getDefaultAttendanceHours,
  getDefaultEmployeeQueryHours,
  getDefaultHrTeamMembers,
  getDefaultLeaveHours,
  getDefaultPayrollDays,
  getDefaultReportingHours,
  getDefaultRecruitmentHours,
  safeNumber,
  type RoiCalculatorInput,
  type RoiModuleId,
} from "@/utils/hrmsRoiCalculator";
import { roiCalculatorConfig, type RoiPlanKey, type RoiSetupKey } from "@/config/roiCalculatorConfig";

const setupOptions: Array<{ key: RoiSetupKey; label: string }> = [
  { key: "fullyManual", label: "Fully manual" },
  { key: "spreadsheets", label: "Spreadsheets" },
  { key: "basicSoftware", label: "Basic HR software" },
  { key: "disconnectedTools", label: "Disconnected tools" },
  { key: "integratedHRMS", label: "Integrated HRMS" },
];

const planOrder: RoiPlanKey[] = ["Starter", "Growth", "Professional", "Enterprise"];

function buildDefaults(employeeCount: number): RoiCalculatorInput {
  const selectedModules = roiCalculatorConfig.modules.reduce((acc, module) => {
    acc[module.id] = module.defaultSelected;
    return acc;
  }, {} as Record<RoiModuleId, boolean>);

  return {
    companyName: "",
    employeeCount,
    hrTeamMembers: getDefaultHrTeamMembers(employeeCount),
    industry: "Information Technology",
    officeLocations: 1,
    currentSetup: roiCalculatorConfig.defaults.currentSetup,
    hourlyHrCost: roiCalculatorConfig.hourlyHrCost.defaultValue,
    payrollDaysPerMonth: getDefaultPayrollDays(employeeCount),
    attendanceHours: getDefaultAttendanceHours(employeeCount),
    leaveHours: getDefaultLeaveHours(employeeCount),
    employeeQueryHours: getDefaultEmployeeQueryHours(employeeCount),
    reportingHours: getDefaultReportingHours(employeeCount),
    recruitmentHours: getDefaultRecruitmentHours(employeeCount),
    payrollErrorRate: roiCalculatorConfig.setups[roiCalculatorConfig.defaults.currentSetup].payrollErrorRate,
    payrollErrorCorrectionCost: 800,
    annualComplianceExposure: roiCalculatorConfig.annualComplianceExposure.defaultValue,
    currentMonthlyToolCost: 0,
    implementationCost: 0,
    selectedModules,
    adoptionLevel: roiCalculatorConfig.defaults.adoptionLevel,
    selectedPlan: roiCalculatorConfig.defaults.selectedPlan,
    enterpriseMonthlyEstimate: employeeCount * 45,
  };
}

function PlanChoice({
  plan,
  selected,
  recommended,
  onSelect,
}: {
  plan: RoiPlanKey;
  selected: boolean;
  recommended: boolean;
  onSelect: (plan: RoiPlanKey) => void;
}) {
  const planConfig = roiCalculatorConfig.plans[plan];

  return (
    <button
      type="button"
      onClick={() => onSelect(plan)}
      className={cn(
        "rounded-2xl border p-4 text-left transition-colors",
        selected ? "border-primary bg-primary/5" : "border-border bg-white hover:bg-surface",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-primary">{plan}</div>
          <div className="mt-2 text-lg font-black text-ink">
            {plan === "Enterprise" ? "Custom quote" : formatINR(planConfig.basePrice ?? 0)}
          </div>
        </div>
        {recommended ? <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Recommended</Badge> : null}
      </div>
      <div className="mt-3 text-xs leading-5 text-ink-soft">{planConfig.note}</div>
    </button>
  );
}

export default function PricingRoiCalculator() {
  const [form, setForm] = useState<RoiCalculatorInput>(() => buildDefaults(100));
  const result = useMemo(() => calculateHrmsRoi(form), [form]);

  const update = <K extends keyof RoiCalculatorInput>(key: K, value: RoiCalculatorInput[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateEmployees = (nextValue: number) => {
    const employeeCount = clampNumber(
      Math.round(nextValue),
      roiCalculatorConfig.employeeCount.min,
      roiCalculatorConfig.employeeCount.max,
    );

    setForm((current) => ({
      ...current,
      employeeCount,
      hrTeamMembers: getDefaultHrTeamMembers(employeeCount),
      payrollDaysPerMonth: getDefaultPayrollDays(employeeCount),
      attendanceHours: getDefaultAttendanceHours(employeeCount),
      leaveHours: getDefaultLeaveHours(employeeCount),
      employeeQueryHours: getDefaultEmployeeQueryHours(employeeCount),
      reportingHours: getDefaultReportingHours(employeeCount),
      recruitmentHours: getDefaultRecruitmentHours(employeeCount),
      enterpriseMonthlyEstimate: employeeCount * 45,
    }));
  };

  return (
    <section id="roi-calculator" className="bg-surface py-14 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">ROI calculator</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            See how much your HR team can save
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
            Estimate the time, operational cost and administrative effort your organisation can save by automating attendance, payroll, leave, employee management and reporting.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <div className="soft-card p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="pp-roi-employee-count">Number of employees</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={[form.employeeCount]}
                    min={roiCalculatorConfig.employeeCount.min}
                    max={roiCalculatorConfig.employeeCount.max}
                    step={1}
                    onValueChange={([value]) => updateEmployees(value)}
                  />
                  <Input
                    id="pp-roi-employee-count"
                    type="number"
                    className="w-28"
                    min={roiCalculatorConfig.employeeCount.min}
                    max={roiCalculatorConfig.employeeCount.max}
                    value={form.employeeCount}
                    onChange={(event) => updateEmployees(safeNumber(event.target.value, form.employeeCount))}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {roiCalculatorConfig.employeeCount.quickSelect.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => updateEmployees(count)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                        form.employeeCount === count
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-white text-ink hover:bg-primary-soft hover:text-primary",
                      )}
                    >
                      {count === 2500 ? "2500+" : count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm font-semibold text-ink">Current HR setup</div>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {setupOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => {
                        update("currentSetup", option.key);
                        update("payrollErrorRate", roiCalculatorConfig.setups[option.key].payrollErrorRate);
                      }}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition-colors",
                        form.currentSetup === option.key ? "border-primary bg-primary/5" : "border-border bg-white hover:bg-surface",
                      )}
                    >
                      <div className="text-sm font-bold text-ink">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Average HR cost per hour</Label>
                <Input
                  type="number"
                  min={roiCalculatorConfig.hourlyHrCost.min}
                  max={roiCalculatorConfig.hourlyHrCost.max}
                  value={form.hourlyHrCost}
                  onChange={(event) =>
                    update(
                      "hourlyHrCost",
                      clampNumber(
                        safeNumber(event.target.value, form.hourlyHrCost),
                        roiCalculatorConfig.hourlyHrCost.min,
                        roiCalculatorConfig.hourlyHrCost.max,
                      ),
                    )
                  }
                />
              </div>

              <div>
                <Label>Payroll days per month</Label>
                <Input
                  type="number"
                  step={0.5}
                  min={roiCalculatorConfig.payrollDaysPerMonth.min}
                  max={roiCalculatorConfig.payrollDaysPerMonth.max}
                  value={form.payrollDaysPerMonth}
                  onChange={(event) =>
                    update(
                      "payrollDaysPerMonth",
                      clampNumber(
                        safeNumber(event.target.value, form.payrollDaysPerMonth),
                        roiCalculatorConfig.payrollDaysPerMonth.min,
                        roiCalculatorConfig.payrollDaysPerMonth.max,
                      ),
                    )
                  }
                />
              </div>

              <div className="md:col-span-2">
                <div className="text-sm font-semibold text-ink">Select a PeoplePulse plan</div>
                <div className="mt-3 grid gap-3 lg:grid-cols-4">
                  {planOrder.map((plan) => (
                    <PlanChoice
                      key={plan}
                      plan={plan}
                      selected={form.selectedPlan === plan}
                      recommended={result.recommendedPlan === plan}
                      onSelect={(value) => update("selectedPlan", value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="soft-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.28em] text-primary">Need the full version?</div>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-ink">Open the dedicated calculator page</h3>
              </div>
              <Link to={ROUTES.roiCalculator} className="btn-outline">
                Full calculator
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
