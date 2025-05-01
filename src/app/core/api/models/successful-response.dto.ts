export interface SuccessfulResponse<T> {
  data: T
  httpStatusCode: number
  isSuccess: boolean
  messages: Message[]
}

interface Message {
  code: string
  description: string
}