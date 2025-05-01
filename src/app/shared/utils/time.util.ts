export class TimeUtil {
  static toStandarizedTime(time: string): string {
    return time.match(/.{1,2}/g)?.join(':') ?? ''
  }
}