export default function getWalkMessage(walkCount: number) {
  if (walkCount >= 20) {
    return "대단해요! 정말 열심히 산책했어요!";
  }
  if (walkCount >= 10) {
    return "좋은 습관을 만들어가고 있어요!";
  }
  return "조금씩 더 걸어볼까요?";
}

