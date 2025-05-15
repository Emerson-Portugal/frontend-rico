import { VexRoutes } from '@vex/interfaces/vex-route.interface'
import { CreateProductPageComponent, ListProductPageComponent, UpdateProductPageComponent} from './pages'

export const PRODUCT_ROUTES: VexRoutes = [
  {
    path: '',
    component: ListProductPageComponent,
  },
  {
    path: 'create',
    component: CreateProductPageComponent,
  },
  {
    path: ':code/update',
    component: UpdateProductPageComponent,
  },
]
