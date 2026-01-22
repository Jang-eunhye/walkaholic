export const getMonthKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getWeekEnd = (date: Date): Date => {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd;
};

/**
 * 주간 날짜 포맷팅
 * @param date 기준 날짜 (기본값: 오늘)
 * @returns 포맷된 주간 날짜 범위 문자열
 */
export const formatWeekRange = (date: Date = new Date()): string => {
  const weekStart = getWeekStart(date);
  const weekEnd = getWeekEnd(date);
  
  const startMonth = weekStart.getMonth() + 1;
  const startDay = weekStart.getDate();
  const endMonth = weekEnd.getMonth() + 1;
  const endDay = weekEnd.getDate();
  
  return `${startMonth}/${startDay} - ${endMonth}/${endDay}`;
};