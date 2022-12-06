export type ApiResponse<R = any> = {
  result: boolean,
  status: number,
  data: R,
  meta?: any,
  headers?: Record<any, any>,
}

export type RequestProps = {
  method: 'get' | 'post' | 'patch' | 'put' | 'delete',
  path: string,
  payload: any,
}
