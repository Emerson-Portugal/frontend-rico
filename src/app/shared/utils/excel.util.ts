import { WorkSheet, WorkBook, utils, writeFile } from 'xlsx'

export class ExcelUtil {
  static tableToExcel(table: HTMLElement, filename: string = 'table'): void {
    const ws: WorkSheet = utils.table_to_sheet(table)
    const wb: WorkBook = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')

    writeFile(wb, `${filename}.xlsx`)
  }
}