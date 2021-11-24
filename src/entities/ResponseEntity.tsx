export interface ResponseEntity<T extends {}> {
  success: boolean
  responseCode: string
  userMessage: string
  responseDateTime: string
  responseData: T
}
