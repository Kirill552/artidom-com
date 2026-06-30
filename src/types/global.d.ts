interface Window {
  gtag?: (...args: unknown[]) => void;
  ym?: (counterId: number, method: string, ...args: unknown[]) => void;
}
