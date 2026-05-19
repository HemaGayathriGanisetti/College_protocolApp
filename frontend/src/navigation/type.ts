export type RootStackParamList = {
   Login: undefined;
  Main: undefined;
  Home: undefined;
    AdminDashboard: undefined;

   
  Labs: undefined;
  LabDetails: { lab: any };

   
  Rules: undefined;
  CategoryRules: { categoryId: number; categoryName: string };
  RuleDetails: { rule: any };

   
  Timetable:  { data?: any };

   
  Search: undefined;

    Settings: undefined;
};