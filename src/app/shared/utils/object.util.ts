export class ObjectUtil {
  static getNestedProperty(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
  }
}