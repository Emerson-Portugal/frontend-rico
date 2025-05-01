import { AfterViewInit, Component, ElementRef, OnDestroy, Signal } from '@angular/core'
import { PrintUtil } from '@shared/utils'

@Component({
  selector: 'app-base-report-component',
  standalone: true,
  imports: [],
  template: ``,
})
export abstract class BaseReportComponent implements AfterViewInit, OnDestroy {
  abstract printElement: Signal<ElementRef>

  ngAfterViewInit(): void {
    document.addEventListener('keydown', this.onKeyDown)
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (!(event.ctrlKey && event.key === 'p')) return

    event.preventDefault()
    this.printDiv()
  }

  protected printDiv() {
    const element = this.printElement().nativeElement as HTMLElement
    PrintUtil.print(element)
  }
}
