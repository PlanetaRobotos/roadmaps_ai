export const AnalyticsEvents = {
  // Auth Events
  AUTH: {
    SIGN_IN: 'sign_in',
    SIGN_OUT: 'sign_out',
    SIGN_UP: 'sign_up',
    UPDATE_PROFILE: 'update_profile'
  },

  // Payment Events
  PAYMENT: {
    INITIATED: 'payment_initiated',
    COMPLETED: 'payment_completed',
    FAILED: 'payment_failed',
    CANCELED: 'payment_canceled'
  },

  // Navigation Events
  NAVIGATION: {
    PAGE_VIEW: 'page_view',
    TAB_CLICK: 'tab_click',
    MENU_CLICK: 'menu_click',
    BUTTON_CLICK: 'button_click'
  },

  // Form Events
  FORM: {
    START: 'form_start',
    SUBMIT: 'form_submit',
    ERROR: 'form_error',
    VALIDATION_ERROR: 'form_validation_error'
  },

  // Content Events
  CONTENT: {
    VIEW: 'content_view',
    DOWNLOAD: 'content_download',
    SHARE: 'content_share',
    PRINT: 'content_print'
  },

  // User Interaction Events
  INTERACTION: {
    SEARCH: 'search',
    FILTER: 'filter',
    SORT: 'sort',
    COPY: 'copy',
    EXPORT: 'export'
  },

  // Modal/Dialog Events
  MODAL: {
    OPEN: 'modal_open',
    CLOSE: 'modal_close',
    ACTION: 'modal_action'
  }
} as const;
