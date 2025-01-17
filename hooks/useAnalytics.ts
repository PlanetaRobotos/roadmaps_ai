import { AnalyticsEvent } from '@/types/analytics';
import { AnalyticsEvents } from '@/constants/analytics';

export const useAnalytics = () => {
  const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  // Common event tracking functions
  const trackPageView = (pageName: string) => {
    trackEvent({
      action: AnalyticsEvents.NAVIGATION.PAGE_VIEW,
      category: 'navigation',
      label: pageName
    });
  };

  const trackButtonClick = (buttonName: string, location: string) => {
    trackEvent({
      action: AnalyticsEvents.NAVIGATION.BUTTON_CLICK,
      category: 'interaction',
      label: `${location}_${buttonName}`
    });
  };

  const trackFormSubmit = (formName: string, success: boolean) => {
    trackEvent({
      action: success
        ? AnalyticsEvents.FORM.SUBMIT
        : AnalyticsEvents.FORM.ERROR,
      category: 'form',
      label: formName
    });
  };

  const trackSearch = (searchTerm: string, resultsCount: number) => {
    trackEvent({
      action: AnalyticsEvents.INTERACTION.SEARCH,
      category: 'search',
      label: searchTerm,
      value: resultsCount
    });
  };

  const trackPayment = (amount: number, productName: string) => {
    trackEvent({
      action: AnalyticsEvents.PAYMENT.INITIATED,
      category: 'payment',
      label: productName,
      value: amount
    });
  };

  // const trackModalInteraction = (modalName: string, action: 'open' | 'close' | 'action') => {
  //   trackEvent({
  //     action: AnalyticsEvents.MODAL[action.toUpperCase()],
  //     category: 'modal',
  //     label: modalName
  //   });
  // };

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmit,
    trackSearch,
    trackPayment
    // trackModalInteraction
  };
};
