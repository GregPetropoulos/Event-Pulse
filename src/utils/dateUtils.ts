// e.g., "Sunday May 24, 2026"
export const formatIsoToWeekDayMMDDYYYY = (iso: string) => {
  if (iso) {
    const dateObject = new Date(iso);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(dateObject);
  }
  return null;
};
