export interface AnalyticsEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}
