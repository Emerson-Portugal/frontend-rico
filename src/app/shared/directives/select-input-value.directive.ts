import { Directive, ElementRef, HostListener, inject, input } from '@angular/core'

@Directive({
  selector: '[appSelectInputValue]',
  standalone: true,
})
export class SelectInputValueDirective {
  private readonly element = inject(ElementRef)
  appSelectInputValue = input<boolean>(true)

  @HostListener('focus') onFocus() {
    if (!this.appSelectInputValue()) return

    const inputElement = this.element.nativeElement as HTMLInputElement
    inputElement.setSelectionRange(0, inputElement.value.length)
  }
}
