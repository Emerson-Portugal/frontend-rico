import { AfterViewInit, Component, effect, ElementRef, inject, input, model, output, signal, untracked, viewChild } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip'
import { ActivatedRoute, Router } from '@angular/router'
import { CustomBehaviourEnum } from '@shared/constants'
import { Paginator } from '@shared/models'
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation'
import { stagger40ms } from '@vex/animations/stagger.animation'
import { TableColumn } from '@vex/interfaces/table-column.interface'
import { CustomInputComponent } from '../custom-input/custom-input.component'
import { DecimalPipe } from '@angular/common'
import { CustomDatePipe } from '@shared/pipes'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { ExcelUtil, ObjectUtil } from '@shared/utils'

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    CustomInputComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    CustomDatePipe,
    DecimalPipe,
  ],
  animations: [fadeInUp400ms, stagger40ms],
  templateUrl: './custom-table.component.html',
})
export class CustomTableComponent<T extends {}> implements AfterViewInit {
  private readonly router = inject(Router)
  private readonly route = inject(ActivatedRoute)
  private readonly dialog = inject(MatDialog)

  getNestedProperty = ObjectUtil.getNestedProperty
  title = input<string | null>('')
  searchTerm = signal<string>('')
  shouldSearch = signal<boolean>(false)
  elements = model.required<T[]>()
  codeProperty = input<keyof T>('code' as keyof T)
  dataSource = signal<MatTableDataSource<T>>(new MatTableDataSource<T>())
  columns = input.required<TableColumn<T>[]>()
  paginator = input<Paginator>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  })
  changeCurrentPage = output<number>()
  pageSizeOptions = input([5, 10, 20, 50])
  sort = viewChild(MatSort)
  deleteElement = output<string>()
  showSearch = input<boolean>(true)
  searchByText = output<string>()
  showExportButton = input<boolean>(false)
  showCreateButton = input<boolean>(true)
  createElementBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  createElementCustomBehaviour = output()
  rowClickBehaviour = input<CustomBehaviourEnum>(CustomBehaviourEnum.KEEP_BEHAVIOUR)
  rowClickCustomBehaviour = output<T>()
  tableElement = viewChild.required<ElementRef>('customTableElement')

  get visibleColumns() {
    return this.columns()
      .filter((column) => column.visible)
      .map((column) => column.property)
  }

  private searchTextEffect = effect((onCleanup) => {
    if (!this.shouldSearch()) return

    const searchTerm = this.searchTerm().trim().toLowerCase()
    const timeout = setTimeout(() => this.searchByText.emit(searchTerm), 1_000)

    onCleanup(() => clearTimeout(timeout))
  })

  private updateElementsEffect = effect(() => {
    const elements = this.elements()

    untracked(() => {
      this.dataSource.update(cur => {
        cur.data = elements
        return cur
      })
    })
  })

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.update(cur => {
        cur.sort = this.sort() ?? null
        return cur
      })
    }
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property
  }

  onSearchTermChanged() {
    const searchTerm = this.searchTerm()
    if (searchTerm) this.shouldSearch.set(true)
  }

  onFilterChange(value: string) {
    if (!this.dataSource()) return

    value = value.trim()
    value = value.toLowerCase()
    this.dataSource.update(cur => {
      cur.filter = value
      return cur
    })
  }

  onCreateElement() {
    this.createElementCustomBehaviour.emit()
    if (this.createElementBehaviour() === CustomBehaviourEnum.CHANGE_BEHAVIOUR) return

    this.router.navigate(['create'], { relativeTo: this.route })
  }

  onDeleteElement(row: T) {
    const ModalComponent = ConfirmationDialogComponent
    const dialogRef = this.dialog.open(ModalComponent)
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) return

      const code = row[this.codeProperty()] as string
      this.deleteElement.emit(code)
    })
  }

  onRowClick(row: T) {
    this.rowClickCustomBehaviour.emit(row)
    if (this.rowClickBehaviour() === CustomBehaviourEnum.CHANGE_BEHAVIOUR) return

    const code = row[this.codeProperty()] as string
    this.router.navigate([code, 'update'], { relativeTo: this.route })
  }

  onPreviousPage() {
    let { currentPage } = this.paginator()
    this.changeCurrentPage.emit(--currentPage)
  }

  onNextPage() {
    let { currentPage } = this.paginator()
    this.changeCurrentPage.emit(++currentPage)
  }

  onExportToExcel() {
    const tableElemnt = this.tableElement().nativeElement as HTMLElement

    ExcelUtil.tableToExcel(tableElemnt, 'report')
  }
}
