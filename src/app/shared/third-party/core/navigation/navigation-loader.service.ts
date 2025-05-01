import { Injectable } from '@angular/core'
import { NavigationItem } from './navigation-item.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly _items = new BehaviorSubject<NavigationItem[]>([])

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable()
  }

  loadNavigation(routes: NavigationItem[]): void {
    this._items.next(routes)
  }
}
