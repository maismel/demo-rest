export const RouteName = {
  Employees: "employees",
  EmployeeDetail: "employee-detail",
  Login: "login",
} as const;

export type RouteName = (typeof RouteName)[keyof typeof RouteName];
