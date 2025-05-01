import { SuccessfulResponse } from './successful-response.dto'

export interface GetAllSuccessfulResponse<T> extends SuccessfulResponse<DataPage<T>> { }

interface DataPage<T> {
  results: T[]
  totalCount: number
  totalPages: number
  pageNumber: number
  pageSize: number
}