import { environment } from "../../environments/environment";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const tablePageSizes = [5, 10, 15, 20, 25, 30]
export const googleClientId = environment.googleClientId;
export const googleScopeId = environment.scopeId;
export const months = [
  {value: 1, label: 'January'},
  {value: 2, label: 'February'},
  {value: 3, label: 'March'},
  {value: 4, label: 'April'},
  {value: 5, label: 'May'},
  {value: 6, label: 'June'},
  {value: 7, label: 'July'},
  {value: 8, label: 'August'},
  {value: 9, label: 'September'},
  {value: 10, label: 'October'},
  {value: 11, label: 'November'},
  {value: 12, label: 'December'}
];
export const currentYear = new Date().getFullYear();
export const years = Array.from({length: 25}, (_, index) => currentYear - index);
