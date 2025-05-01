import { HttpErrorResponse } from '@angular/common/http'

export class CustomHttpErrorResponse extends HttpErrorResponse {
  constructor(
    errorResponse: HttpErrorResponse,
    public customMessage?: string
  ) {
    super({
      error: errorResponse.error,
      headers: errorResponse.headers,
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      url: errorResponse.url ?? '',
    })
  }
}
