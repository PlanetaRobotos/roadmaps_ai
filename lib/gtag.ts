// // lib/gtag.ts
// export const GA_MEASUREMENT_ID = 'G-QZVWZTLN6M'; // Replace with your actual Measurement ID
//
// // Track page views
// export const pageview = (url: string) => {
//   window.gtag('config', GA_MEASUREMENT_ID, {
//     page_path: url
//   });
// };
//
// // Track custom events
// interface GtagEvent {
//   action: string;
//   category: string;
//   label?: string;
//   value?: number;
// }
//
// export const event = ({ action, category, label, value }: GtagEvent) => {
//   window.gtag('event', action, {
//     event_category: category,
//     event_label: label,
//     value: value
//   });
// };
