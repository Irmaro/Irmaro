/*
  Existing intro + coaching URLs stay in src/config/site.ts.

  Fill the Cal.com URLs below for:
  - single mentoring session
  - each paid package variant

  Separate package links are recommended because the package prices differ
  and Cal.com/Stripe payment amount should match the selected package.
*/
export const bookingLinks = {
  mentoringSession: '',

  packages: {
    coaching: {
      2: 'https://cal.com/irmaro/coaching-package-first-session-2',
      3: 'https://cal.com/irmaro/coaching-package-first-session-3',
      4: 'https://cal.com/irmaro/coaching-package-first-session-4',
      5: 'https://cal.com/irmaro/coaching-package-first-session-5',
    },
    mentoring: {
      2: 'https://cal.com/irmaro/mentoring-package-first-session-2',
      3: 'https://cal.com/irmaro/mentoring-package-first-session-3',
      4: 'https://cal.com/irmaro/mentoring-package-first-session-4',
      5: 'https://cal.com/irmaro/mentoring-package-first-session-5',
    },
  },
} as const;
