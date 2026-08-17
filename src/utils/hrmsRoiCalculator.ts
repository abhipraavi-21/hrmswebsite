import {
  roiCalculatorConfig,
  type RoiAdoptionKey,
  type RoiModuleId,
  type RoiPlanKey,
  type RoiSetupKey,
} from "@/config/roiCalculatorConfig";

export function safeNumber(value: unknown, fallback = 0) {
  const parsed = typeof value === "string" ? Number(value) : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatCompactINR(value: number) {
  const amount = Number.isFinite(value) ? value : 0;

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

export function getDefaultPayrollDays(employeeCount: number) {
  if (employeeCount <= 50) return 2;
  if (employeeCount <= 200) return 4;
  if (employeeCount <= 500) return 6;
  if (employeeCount <= 1000) return 8;
  return 10;
}

export function getDefaultAttendanceHours(employeeCount: number) {
  return Math.max(4, employeeCount * 0.12);
}

export function getDefaultLeaveHours(employeeCount: number) {
  return Math.max(3, employeeCount * 0.08);
}

export function getDefaultEmployeeQueryHours(employeeCount: number) {
  return Math.max(4, employeeCount * 0.06);
}

export function getDefaultReportingHours(employeeCount: number) {
  return Math.max(4, employeeCount * 0.05);
}

export function getDefaultRecruitmentHours(employeeCount: number) {
  return Math.max(2, employeeCount * 0.025);
}

export function getDefaultHrTeamMembers(employeeCount: number) {
  return Math.max(1, Math.ceil(employeeCount / 100));
}

export function recommendPlan(employeeCount: number): RoiPlanKey {
  if (employeeCount <= 50) return "Starter";
  if (employeeCount <= 250) return "Growth";
  if (employeeCount <= 1000) return "Professional";
  return "Enterprise";
}

export function getPlanMonthlyCost(
  plan: RoiPlanKey,
  employeeCount: number,
  enterpriseMonthlyEstimate?: number,
) {
  const planConfig = roiCalculatorConfig.plans[plan];

  if (plan === "Enterprise") {
    return safeNumber(enterpriseMonthlyEstimate, employeeCount * 45);
  }

  const includedEmployees = planConfig.includedEmployees ?? employeeCount;
  const extraEmployeePrice = planConfig.extraEmployeePrice ?? 0;
  const basePrice = planConfig.basePrice ?? 0;
  const extraEmployees = Math.max(0, employeeCount - includedEmployees);
  return basePrice + extraEmployees * extraEmployeePrice;
}

function planReason(plan: RoiPlanKey, employeeCount: number) {
  switch (plan) {
    case "Starter":
      return `Best suited for a compact team of ${employeeCount} employees that needs core HR, attendance and leave coverage.`;
    case "Growth":
      return `A good fit for a growing ${employeeCount}-member organisation balancing payroll, attendance, self-service and reporting.`;
    case "Professional":
      return `Built for a larger operation with ${employeeCount} employees that needs deeper HR automation and control.`;
    case "Enterprise":
      return `Recommended for a ${employeeCount}+ employee organisation that needs a custom quote and wider implementation support.`;
    default:
      return "";
  }
}

const moduleCurrentHoursFactor: Record<RoiModuleId, number> = {
  coreHr: 0.03,
  attendance: 0,
  leave: 0,
  payroll: 0,
  selfService: 0,
  recruitment: 0,
  performance: 0.02,
  expense: 0.025,
  reports: 0,
};

export type RoiCalculatorInput = {
  companyName?: string;
  employeeCount: number;
  hrTeamMembers: number;
  industry: string;
  officeLocations: number;
  currentSetup: RoiSetupKey;
  hourlyHrCost: number;
  payrollDaysPerMonth: number;
  attendanceHours: number;
  leaveHours: number;
  employeeQueryHours: number;
  reportingHours: number;
  recruitmentHours: number;
  payrollErrorRate: number;
  payrollErrorCorrectionCost: number;
  annualComplianceExposure: number;
  currentMonthlyToolCost: number;
  implementationCost: number;
  selectedModules: Record<RoiModuleId, boolean>;
  adoptionLevel: RoiAdoptionKey;
  selectedPlan: RoiPlanKey | "Recommended";
  enterpriseMonthlyEstimate?: number;
};

export type RoiModuleBreakdown = {
  id: RoiModuleId;
  label: string;
  selected: boolean;
  currentHours: number;
  savedHours: number;
  reduction: number;
  monthlyValue: number;
  details: string;
};

export type RoiPhaseCard = {
  label: string;
  months: string;
  adoption: number;
  monthlyHoursSaved: number;
  monthlyProductivityValue: number;
};

export type RoiProjectionRow = {
  year: string;
  annualBenefit: number;
  annualCost: number;
  netSavings: number;
  cumulativeSavings: number;
};

export type RoiComparisonRow = {
  metric: string;
  currentProcess: string;
  withPeoplePulse: string;
  improvement: string;
};

export type RoiCalculatorResult = {
  recommendedPlan: RoiPlanKey;
  recommendedPlanReason: string;
  selectedPlan: RoiPlanKey;
  monthlyPeoplePulseCost: number;
  annualPeoplePulseCost: number;
  effectiveMonthlyCostPerEmployee: number;
  currentMonthlyHours: number;
  adjustedCurrentMonthlyHours: number;
  currentMonthlyHrOperatingCost: number;
  currentAnnualHrOperatingCost: number;
  rawMonthlyHoursSaved: number;
  monthlyHoursSaved: number;
  annualHoursSaved: number;
  monthlyWorkingDaysSaved: number;
  annualWorkingDaysSaved: number;
  fteCapacityRecovered: number;
  monthlyProductivityValue: number;
  annualProductivityValue: number;
  monthlyPayrollErrors: number;
  monthlyErrorsAvoided: number;
  annualPayrollErrorSavings: number;
  annualComplianceRiskSavings: number;
  annualCurrentToolCost: number;
  totalAnnualBenefit: number;
  yearOneBenefit: number;
  totalYearOneCost: number;
  netYearOneSavings: number;
  roiPercentage: number;
  valueMultiple: number;
  paybackMonths: number | null;
  yearOneAdoptionMultiplier: number;
  selectedModuleCount: number;
  selectedModules: Array<{ id: RoiModuleId; label: string }>;
  moduleBreakdown: RoiModuleBreakdown[];
  phaseCards: RoiPhaseCard[];
  projection: RoiProjectionRow[];
  comparisonRows: RoiComparisonRow[];
};

export function calculateHrmsRoi(input: RoiCalculatorInput): RoiCalculatorResult {
  const employeeCount = clampNumber(
    Math.round(safeNumber(input.employeeCount, roiCalculatorConfig.employeeCount.defaultValue)),
    roiCalculatorConfig.employeeCount.min,
    roiCalculatorConfig.employeeCount.max,
  );
  const hourlyHrCost = clampNumber(
    safeNumber(input.hourlyHrCost, roiCalculatorConfig.hourlyHrCost.defaultValue),
    roiCalculatorConfig.hourlyHrCost.min,
    roiCalculatorConfig.hourlyHrCost.max,
  );
  const payrollDaysPerMonth = clampNumber(
    safeNumber(input.payrollDaysPerMonth, getDefaultPayrollDays(employeeCount)),
    roiCalculatorConfig.payrollDaysPerMonth.min,
    roiCalculatorConfig.payrollDaysPerMonth.max,
  );
  const attendanceHours = clampNumber(
    safeNumber(input.attendanceHours, getDefaultAttendanceHours(employeeCount)),
    roiCalculatorConfig.attendanceHours.min,
    roiCalculatorConfig.attendanceHours.max,
  );
  const leaveHours = Math.max(0, safeNumber(input.leaveHours, getDefaultLeaveHours(employeeCount)));
  const employeeQueryHours = Math.max(
    0,
    safeNumber(input.employeeQueryHours, getDefaultEmployeeQueryHours(employeeCount)),
  );
  const reportingHours = Math.max(
    0,
    safeNumber(input.reportingHours, getDefaultReportingHours(employeeCount)),
  );
  const recruitmentHours = Math.max(
    0,
    safeNumber(input.recruitmentHours, getDefaultRecruitmentHours(employeeCount)),
  );
  const payrollErrorRate = clampNumber(
    safeNumber(input.payrollErrorRate, roiCalculatorConfig.setups[input.currentSetup].payrollErrorRate),
    roiCalculatorConfig.payrollErrorRate.min,
    roiCalculatorConfig.payrollErrorRate.max,
  );
  const payrollErrorCorrectionCost = Math.max(0, safeNumber(input.payrollErrorCorrectionCost, 800));
  const annualComplianceExposure = Math.max(
    0,
    safeNumber(input.annualComplianceExposure, roiCalculatorConfig.annualComplianceExposure.defaultValue),
  );
  const currentMonthlyToolCost = Math.max(0, safeNumber(input.currentMonthlyToolCost, 0));
  const implementationCost = Math.max(0, safeNumber(input.implementationCost, 0));
  const enterpriseMonthlyEstimate = safeNumber(input.enterpriseMonthlyEstimate, 0);

  const setup = roiCalculatorConfig.setups[input.currentSetup];
  const adoption = roiCalculatorConfig.adoptionLevels[input.adoptionLevel] ?? roiCalculatorConfig.adoptionLevels.expected;
  const recommendedPlan = recommendPlan(employeeCount);
  const selectedPlan = input.selectedPlan === "Recommended" ? recommendedPlan : input.selectedPlan;

  const coreHrCurrentHours = employeeCount * moduleCurrentHoursFactor.coreHr;
  const performanceCurrentHours = employeeCount * moduleCurrentHoursFactor.performance;
  const expenseCurrentHours = employeeCount * moduleCurrentHoursFactor.expense;
  const payrollHours = payrollDaysPerMonth * 8;

  const currentMonthlyHours =
    payrollHours +
    attendanceHours +
    leaveHours +
    employeeQueryHours +
    reportingHours +
    recruitmentHours;

  const adjustedCurrentMonthlyHours = currentMonthlyHours * setup.multiplier;
  const currentMonthlyHrOperatingCost = adjustedCurrentMonthlyHours * hourlyHrCost;
  const currentAnnualHrOperatingCost = currentMonthlyHrOperatingCost * 12;

  const selectedLookup = input.selectedModules;
  const moduleRows: RoiModuleBreakdown[] = roiCalculatorConfig.modules.map((module) => {
    const selected = Boolean(selectedLookup[module.id]);

    const currentHours =
      module.id === "coreHr"
        ? coreHrCurrentHours
        : module.id === "attendance"
          ? attendanceHours
          : module.id === "leave"
            ? leaveHours
            : module.id === "payroll"
              ? payrollHours
              : module.id === "selfService"
                ? employeeQueryHours
                : module.id === "recruitment"
                  ? recruitmentHours
                  : module.id === "performance"
                    ? performanceCurrentHours
                    : module.id === "expense"
                      ? expenseCurrentHours
                      : reportingHours;

    const savedHours = selected ? currentHours * module.efficiency : 0;
    const reduction = selected ? module.efficiency * 100 : 0;
    const monthlyValue = savedHours * hourlyHrCost;

    return {
      id: module.id,
      label: module.label,
      selected,
      currentHours,
      savedHours,
      reduction,
      monthlyValue,
      details: `${currentHours.toFixed(1)} hours/month × ${Math.round(module.efficiency * 100)}% automation efficiency`,
    };
  });

  const rawMonthlyHoursSaved = moduleRows.reduce((sum, row) => sum + row.savedHours, 0);
  const monthlyHoursSaved = rawMonthlyHoursSaved * 0.85 * adoption.value;
  const annualHoursSaved = monthlyHoursSaved * 12;
  const monthlyWorkingDaysSaved = monthlyHoursSaved / 8;
  const annualWorkingDaysSaved = annualHoursSaved / 8;
  const fteCapacityRecovered = monthlyHoursSaved / 160;
  const monthlyProductivityValue = monthlyHoursSaved * hourlyHrCost;
  const annualProductivityValue = monthlyProductivityValue * 12;

  const monthlyPayrollErrors = employeeCount * (payrollErrorRate / 100);
  const monthlyErrorsAvoided = selectedLookup.payroll ? monthlyPayrollErrors * 0.7 : 0;
  const annualPayrollErrorSavings = monthlyErrorsAvoided * payrollErrorCorrectionCost * 12;

  const complianceCoverageMultiplier =
    [
      selectedLookup.payroll,
      selectedLookup.attendance,
      selectedLookup.leave,
      selectedLookup.coreHr,
    ].filter(Boolean).length / 4;

  const annualComplianceRiskSavings =
    annualComplianceExposure * setup.complianceReductionRate * complianceCoverageMultiplier;
  const annualCurrentToolCost = currentMonthlyToolCost * 12;
  const totalAnnualBenefit =
    annualProductivityValue + annualPayrollErrorSavings + annualComplianceRiskSavings + annualCurrentToolCost;

  const yearOneAdoptionMultiplier =
    ((0.55 * 3 + 0.8 * 3 + 1 * 6) / 12) * adoption.value;

  const yearOneBenefit =
    (annualProductivityValue + annualPayrollErrorSavings + annualComplianceRiskSavings) *
      yearOneAdoptionMultiplier +
    annualCurrentToolCost;

  const monthlyPeoplePulseCost = getPlanMonthlyCost(selectedPlan, employeeCount, enterpriseMonthlyEstimate);
  const annualPeoplePulseCost = monthlyPeoplePulseCost * 12;
  const totalYearOneCost = annualPeoplePulseCost + implementationCost;
  const netYearOneSavings = yearOneBenefit - totalYearOneCost;
  const roiPercentage = totalYearOneCost > 0 ? (netYearOneSavings / totalYearOneCost) * 100 : 0;
  const valueMultiple = totalYearOneCost > 0 ? yearOneBenefit / totalYearOneCost : 0;
  const monthlyBenefit = yearOneBenefit / 12;
  const paybackMonths = monthlyBenefit > 0 ? totalYearOneCost / monthlyBenefit : null;
  const effectiveMonthlyCostPerEmployee = employeeCount > 0 ? monthlyPeoplePulseCost / employeeCount : 0;

  const phaseCards: RoiPhaseCard[] = [
    {
      label: "Phase 1 - Initial Adoption",
      months: "Months 1-3",
      adoption: 55,
      monthlyHoursSaved: monthlyHoursSaved * 0.55,
      monthlyProductivityValue: monthlyProductivityValue * 0.55,
    },
    {
      label: "Phase 2 - Expanded Usage",
      months: "Months 4-6",
      adoption: 80,
      monthlyHoursSaved: monthlyHoursSaved * 0.8,
      monthlyProductivityValue: monthlyProductivityValue * 0.8,
    },
    {
      label: "Phase 3 - Full Operational Usage",
      months: "Months 7-12",
      adoption: 100,
      monthlyHoursSaved: monthlyHoursSaved,
      monthlyProductivityValue: monthlyProductivityValue,
    },
  ];

  const yearTwoBenefit = totalAnnualBenefit * 1.05;
  const yearTwoCost = annualPeoplePulseCost * 1.05;
  const yearThreeBenefit = yearTwoBenefit * 1.05;
  const yearThreeCost = yearTwoCost * 1.05;

  const yearOneNet = yearOneBenefit - totalYearOneCost;
  const yearTwoNet = yearTwoBenefit - yearTwoCost;
  const yearThreeNet = yearThreeBenefit - yearThreeCost;
  const projection: RoiProjectionRow[] = [
    {
      year: "Year 1",
      annualBenefit: yearOneBenefit,
      annualCost: totalYearOneCost,
      netSavings: yearOneNet,
      cumulativeSavings: yearOneNet,
    },
    {
      year: "Year 2",
      annualBenefit: yearTwoBenefit,
      annualCost: yearTwoCost,
      netSavings: yearTwoNet,
      cumulativeSavings: yearOneNet + yearTwoNet,
    },
    {
      year: "Year 3",
      annualBenefit: yearThreeBenefit,
      annualCost: yearThreeCost,
      netSavings: yearThreeNet,
      cumulativeSavings: yearOneNet + yearTwoNet + yearThreeNet,
    },
  ];

  const recommendedPlanReason = planReason(recommendedPlan, employeeCount);
  const selectedModules = roiCalculatorConfig.modules.filter((module) => selectedLookup[module.id]).map((module) => ({
    id: module.id,
    label: module.label,
  }));

  const comparisonRows: RoiComparisonRow[] = [
    {
      metric: "Monthly HR administration hours",
      currentProcess: `${adjustedCurrentMonthlyHours.toFixed(1)} hours`,
      withPeoplePulse: `${Math.max(adjustedCurrentMonthlyHours - monthlyHoursSaved, 0).toFixed(1)} hours`,
      improvement: `${monthlyHoursSaved.toFixed(1)} hours saved`,
    },
    {
      metric: "Payroll processing time",
      currentProcess: `${payrollHours.toFixed(1)} hours`,
      withPeoplePulse: `${Math.max(payrollHours - moduleRows.find((row) => row.id === "payroll")?.savedHours!, 0).toFixed(1)} hours`,
      improvement: `${(moduleRows.find((row) => row.id === "payroll")?.savedHours ?? 0).toFixed(1)} hours saved`,
    },
    {
      metric: "Attendance effort",
      currentProcess: `${attendanceHours.toFixed(1)} hours`,
      withPeoplePulse: `${Math.max(attendanceHours - moduleRows.find((row) => row.id === "attendance")?.savedHours!, 0).toFixed(1)} hours`,
      improvement: `${(moduleRows.find((row) => row.id === "attendance")?.savedHours ?? 0).toFixed(1)} hours saved`,
    },
    {
      metric: "Leave administration",
      currentProcess: `${leaveHours.toFixed(1)} hours`,
      withPeoplePulse: `${Math.max(leaveHours - moduleRows.find((row) => row.id === "leave")?.savedHours!, 0).toFixed(1)} hours`,
      improvement: `${(moduleRows.find((row) => row.id === "leave")?.savedHours ?? 0).toFixed(1)} hours saved`,
    },
    {
      metric: "Employee query handling",
      currentProcess: `${employeeQueryHours.toFixed(1)} hours`,
      withPeoplePulse: `${Math.max(employeeQueryHours - moduleRows.find((row) => row.id === "selfService")?.savedHours!, 0).toFixed(1)} hours`,
      improvement: `${(moduleRows.find((row) => row.id === "selfService")?.savedHours ?? 0).toFixed(1)} hours saved`,
    },
    {
      metric: "Reporting effort",
      currentProcess: `${reportingHours.toFixed(1)} hours`,
      withPeoplePulse: `${Math.max(reportingHours - moduleRows.find((row) => row.id === "reports")?.savedHours!, 0).toFixed(1)} hours`,
      improvement: `${(moduleRows.find((row) => row.id === "reports")?.savedHours ?? 0).toFixed(1)} hours saved`,
    },
    {
      metric: "Payroll corrections",
      currentProcess: formatINR(monthlyPayrollErrors * payrollErrorCorrectionCost),
      withPeoplePulse: formatINR(Math.max(monthlyPayrollErrors - monthlyErrorsAvoided, 0) * payrollErrorCorrectionCost),
      improvement: `${formatINR(monthlyErrorsAvoided * payrollErrorCorrectionCost)} / month avoided`,
    },
    {
      metric: "Estimated yearly operating value",
      currentProcess: formatINR(currentAnnualHrOperatingCost + annualCurrentToolCost),
      withPeoplePulse: formatINR(annualPeoplePulseCost + implementationCost),
      improvement: formatINR(netYearOneSavings),
    },
  ];

  return {
    recommendedPlan,
    recommendedPlanReason,
    selectedPlan,
    monthlyPeoplePulseCost,
    annualPeoplePulseCost,
    effectiveMonthlyCostPerEmployee,
    currentMonthlyHours,
    adjustedCurrentMonthlyHours,
    currentMonthlyHrOperatingCost,
    currentAnnualHrOperatingCost,
    rawMonthlyHoursSaved,
    monthlyHoursSaved,
    annualHoursSaved,
    monthlyWorkingDaysSaved,
    annualWorkingDaysSaved,
    fteCapacityRecovered,
    monthlyProductivityValue,
    annualProductivityValue,
    monthlyPayrollErrors,
    monthlyErrorsAvoided,
    annualPayrollErrorSavings,
    annualComplianceRiskSavings,
    annualCurrentToolCost,
    totalAnnualBenefit,
    yearOneBenefit,
    totalYearOneCost,
    netYearOneSavings,
    roiPercentage,
    valueMultiple,
    paybackMonths,
    yearOneAdoptionMultiplier,
    selectedModuleCount: selectedModules.length,
    selectedModules,
    moduleBreakdown: moduleRows,
    phaseCards,
    projection,
    comparisonRows,
  };
}

