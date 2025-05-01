export class ExchangeRateUtil {
  static exchangeRateConverter(fromCountryIso3: string, toCountryIso3: string, amount: number, exchangeRate: number): number {
    switch (true) {
      case (fromCountryIso3 === 'USA' && toCountryIso3 === 'CHL'):
        return this.toPesos(amount, exchangeRate)
      case (fromCountryIso3 === 'CHL' && toCountryIso3 === 'USA'):
        return this.toUsd(amount, exchangeRate)
      default:
        return amount
    }
  }
  private static toUsd(amount: number, exchangeRate: number): number {
    return amount / exchangeRate
  }

  private static toPesos(amount: number, exchangeRate: number): number {
    return amount * exchangeRate
  }
}