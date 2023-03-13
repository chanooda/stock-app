export function priceDownAndUp(priceDiff: string) {
  const value = Number(priceDiff.replace(/,/g, ""));
  return value === 0 ? "same" : value > 0 ? "up" : "down";
}

export function priceDiffFormat(priceDiff: string) {
  const value = Number(priceDiff.replace(/,/g, ""));
  return value < 0
    ? "▼ " + value.toLocaleString().replace("-", "")
    : priceDiff === "0"
    ? value.toLocaleString()
    : "▲ " + value.toLocaleString();
}

export function cleaningText(text: string) {
  return text.replace(/[<b>]|[</b>]|[&amp;]|[quot]/g, "");
}

export function dateFormat(text: string) {
  let date = new Date(text);
  const days = ["일", "월", "화", "수", "목", "금", "토", "일"];
  const finalDate =
    date.getFullYear() +
    "." +
    (date.getMonth() + 1) +
    "." +
    date.getDate() +
    " " +
    days[date.getDay()];

  return finalDate;
}

export function stockTime() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const day = now.getDay();

  if (day >= 1 && day <= 5) {
    if (hour === 8 && minutes >= 30) return true;
    else if (hour >= 9 && hour <= 16) return true;
  }
  return false;
}
