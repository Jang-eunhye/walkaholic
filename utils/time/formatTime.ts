/**
 * 초 단위 시간을 "HH:MM" 형식으로 포맷팅
 * @param seconds 경과 시간 (초 단위)
 * @returns "HH:MM" 형식의 문자열
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60); // ✅ 수정: 나머지 초를 분으로 변환

  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours}시간`);
  }

  if (minutes > 0) {
    parts.push(`${minutes}분`);
  }

  return parts.length > 0 ? parts.join(" ") : "0분";
}
