export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function fmtCurrency(n: number, currency = "ZAR") {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
}
export function delay(ms = 700) {
  return new Promise<void>((r) => setTimeout(r, ms));
}