export class PrintUtil {
  static print(element: HTMLElement) {
    const printContents = element.outerHTML
    const printStyles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join('\n')
        } catch (e) {
          console.warn('Could not access stylesheet:', styleSheet, e)
          return ''
        }
      })
      .join('\n')

    const printWindow = window.open('', '', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.open()
      printWindow.document.write(`
      <html>
        <head>
          <style>
            ${printStyles}
          </style>
        </head>
        <body>
        ${printContents}
        </body>
      </html>
      `)
      printWindow.document.close()
      printWindow.print()
      printWindow.close()
    }
  }
}