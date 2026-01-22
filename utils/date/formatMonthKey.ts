/**
 * Calendar의 onMonthChange에서 받은 month 객체를 monthKey 형식으로 변환
 */
export const formatMonthKey = (month: { month: number; year: number }): string => {
  return `${month.year}-${String(month.month).padStart(2, "0")}`;
};

