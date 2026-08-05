export type RoiSetupKey =
  | "fullyManual"
  | "spreadsheets"
  | "basicSoftware"
  | "disconnectedTools"
  | "integratedHRMS";

export type RoiAdoptionKey = "conservative" | "expected" | "high";

export type RoiPlanKey = "Starter" | "Growth" | "Professional" | "Enterprise";

export type RoiModuleId =
  | "coreHr"
  | "attendance"
  | "leave"
  | "payroll"
  | "selfService"
  | "recruitment"
  | "performance"
  | "expense"
  | "reports";

export type RoiModuleConfig = {
  id: RoiModuleId;
  label: string;
  description: string;
  defaultSelected: boolean;
  efficiency: number;
  currentHoursPerEmployee?: number;
};

export const roiCalculatorConfig = {
  employeeCount: {
    min: 10,
    max: 5000,
    defaultValue: 100,
    quickSelect: [25, 50, 100, 250, 500, 1000, 2500],
  },
  hrTeamMembers: {
    min: 1,
    max: 100,
  },
  officeLocations: {
    min: 1,
    max: 100,
  },
  hourlyHrCost: {
    min: 100,
    max: 5000,
    defaultValue: 350,
  },
  payrollDaysPerMonth: {
    min: 0.5,
    max: 15,
    step: 0.5,
  },
  attendanceHours: {
    min: 0,
    max: 500,
  },
  payrollErrorRate: {
    min: 0,
    max: 20,
  },
  currentMonthlyToolCost: {
    min: 0,
    max: 1000000,
    defaultValue: 0,
  },
  implementationCost: {
    min: 0,
    max: 5000000,
    defaultValue: 0,
  },
  annualComplianceExposure: {
    min: 0,
    max: 10000000,
    defaultValue: 150000,
  },
  setups: {
    fullyManual: {
      label: "Fully manual",
      multiplier: 1.15,
      complianceReductionRate: 0.55,
      payrollErrorRate: 8,
    },
    spreadsheets: {
      label: "Spreadsheets",
      multiplier: 1,
      complianceReductionRate: 0.5,
      payrollErrorRate: 6,
    },
    basicSoftware: {
      label: "Basic HR software",
      multiplier: 0.82,
      complianceReductionRate: 0.4,
      payrollErrorRate: 4,
    },
    disconnectedTools: {
      label: "Multiple disconnected tools",
      multiplier: 0.72,
      complianceReductionRate: 0.35,
      payrollErrorRate: 3.5,
    },
    integratedHRMS: {
      label: "Existing integrated HRMS",
      multiplier: 0.45,
      complianceReductionRate: 0.2,
      payrollErrorRate: 1.5,
    },
  } satisfies Record<
    RoiSetupKey,
    { label: string; multiplier: number; complianceReductionRate: number; payrollErrorRate: number }
  >,
  adoptionLevels: {
    conservative: { label: "Conservative", value: 0.65 },
    expected: { label: "Expected", value: 0.85 },
    high: { label: "High adoption", value: 0.95 },
  } satisfies Record<RoiAdoptionKey, { label: string; value: number }>,
  plans: {
    Starter: {
      label: "Starter",
      basePrice: 2499,
      includedEmployees: 50,
      extraEmployeePrice: 40,
      minEmployees: 10,
      maxEmployees: 50,
      note: "Suitable for 10-50 employees",
    },
    Growth: {
      label: "Growth",
      basePrice: 4999,
      includedEmployees: 50,
      extraEmployeePrice: 65,
      minEmployees: 51,
      maxEmployees: 250,
      note: "Suitable for 51-250 employees",
    },
    Professional: {
      label: "Professional",
      basePrice: 9999,
      includedEmployees: 100,
      extraEmployeePrice: 55,
      minEmployees: 251,
      maxEmployees: 1000,
      note: "Suitable for 251-1000 employees",
    },
    Enterprise: {
      label: "Enterprise",
      basePrice: null,
      includedEmployees: null,
      extraEmployeePrice: null,
      minEmployees: 1001,
      maxEmployees: null,
      note: "Custom quote for larger organisations",
    },
  } satisfies Record<
    RoiPlanKey,
    {
      label: string;
      basePrice: number | null;
      includedEmployees: number | null;
      extraEmployeePrice: number | null;
      minEmployees: number;
      maxEmployees: number | null;
      note: string;
    }
  >,
  modules: [
    {
      id: "coreHr",
      label: "Core HR and Employee Database",
      description: "Employee records, structure and profile administration.",
      defaultSelected: true,
      efficiency: 0.7,
      currentHoursPerEmployee: 0.03,
    },
    {
      id: "attendance",
      label: "Attendance and Shift Management",
      description: "Attendance capture, shifts and location-led tracking.",
      defaultSelected: true,
      efficiency: 0.75,
    },
    {
      id: "leave",
      label: "Leave Management",
      description: "Leave workflows, approvals and balances.",
      defaultSelected: true,
      efficiency: 0.75,
    },
    {
      id: "payroll",
      label: "Payroll Management",
      description: "Payroll cycles, corrections and disbursement work.",
      defaultSelected: true,
      efficiency: 0.7,
    },
    {
      id: "selfService",
      label: "Employee Self-Service",
      description: "Employee queries, requests and self-service actions.",
      defaultSelected: true,
      efficiency: 0.65,
    },
    {
      id: "recruitment",
      label: "Recruitment and Onboarding",
      description: "Hiring coordination and onboarding effort.",
      defaultSelected: true,
      efficiency: 0.6,
    },
    {
      id: "performance",
      label: "Performance Management",
      description: "Goal setting, reviews and appraisals.",
      defaultSelected: false,
      efficiency: 0.45,
      currentHoursPerEmployee: 0.02,
    },
    {
      id: "expense",
      label: "Expense and Reimbursement",
      description: "Expense claims and reimbursement processing.",
      defaultSelected: false,
      efficiency: 0.55,
      currentHoursPerEmployee: 0.025,
    },
    {
      id: "reports",
      label: "Reports and Analytics",
      description: "Reporting, MIS and export work.",
      defaultSelected: true,
      efficiency: 0.7,
    },
  ] satisfies RoiModuleConfig[],
  defaults: {
    selectedPlan: "Recommended" as const,
    adoptionLevel: "expected" as const,
    currentSetup: "spreadsheets" as const,
  },
};

