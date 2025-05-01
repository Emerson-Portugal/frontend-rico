import { DOCUMENT } from '@angular/common'
import { Injectable, inject } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private readonly _doc = inject(DOCUMENT)

  get doc(): Document {
    return this._doc || document
  }

  scrollToElement(element: Element = this.doc.body): void {
    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
  }
}
