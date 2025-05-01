import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, ErrorHandler, importProvidersFrom, LOCALE_ID } from '@angular/core'
import { provideRouter, withInMemoryScrolling } from '@angular/router'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { CustomErrorHandler } from '@core/error/handlers/custom-error.handler'
import { addTokenInterceptor, refreshTokenInterceptor } from '@core/token/interceptors'
import { provideIcons } from '@shared/third-party/core/icons/icons.provider'
import { provideLuxon } from '@shared/third-party/core/luxon/luxon.provider'
import { provideNavigation } from '@shared/third-party/core/navigation/navigation.provider'
import { vexConfigs } from '@vex/config/vex-configs'
import { provideVex } from '@vex/vex.provider'
import { provideQuillConfig } from 'ngx-quill'
import { provideEnvironmentNgxMask } from 'ngx-mask'
import { routes } from './app.routes'
import { registerLocaleData } from '@angular/common'
import localeEsCl from '@angular/common/locales/es-CL'

registerLocaleData(localeEsCl)

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: LOCALE_ID, useValue: 'es-CL' },
    importProvidersFrom(BrowserModule, MatDialogModule, MatBottomSheetModule, MatNativeDateModule),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideEnvironmentNgxMask({ validation: false }),
    provideAnimations(),
    provideVex({
      config: vexConfigs.poseidon,
      availableThemes: [
        {
          name: 'Default',
          className: 'vex-theme-default',
        },
      ],
    }),
    provideNavigation(),
    provideIcons(),
    provideLuxon(),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['clean'],
          ['link', 'image'],
        ],
      },
    }),
    provideHttpClient(withInterceptors([addTokenInterceptor, refreshTokenInterceptor])),
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
  ],
}
