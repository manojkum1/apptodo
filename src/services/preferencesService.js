const ONBOARDING_KEY = 'weekly-todo:onboarded:v1';

export const hasSeenOnboarding = () => {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === '1';
  } catch {
    return false;
  }
};

export const markOnboardingSeen = () => {
  try {
    localStorage.setItem(ONBOARDING_KEY, '1');
  } catch {
    /* ignore */
  }
};
