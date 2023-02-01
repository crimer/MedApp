import { IacpaasResponse } from './dto/IacpaasResponse'

type ImportDto = {
  path: string
  json: string
  clearIfExists: boolean
}

export const ImportDataAsync = async (dto: ImportDto): Promise<IacpaasResponse> => {
  const response = await fetch('https://iacpaas.dvo.ru/api/data/import', {
    body: JSON.stringify(dto),
    method: 'POST'
  })
  const data = await response.json()
  return data as IacpaasResponse
}

type ExportDto = {
  path: string
  ['json-type']: string
  ['start-target-concept-path']: string
  ['export-depth']: string
}

export const ExportDataAsync = async (dto: ExportDto): Promise<IacpaasResponse> => {
  const response = await fetch('https://iacpaas.dvo.ru/api/data/export/user-item', {
    body: JSON.stringify(dto),
    method: 'POST'
  })
  const data = await response.json()
  return data as IacpaasResponse
}

type RunServiceDto = IacpaasResponse & { runningServiceId: boolean }
export const RunServiceAsync = async (id: string): Promise<RunServiceDto> => {
  const response = await fetch(`https://iacpaas.dvo.ru/api/service/run/${id}`, {
    method: 'GET'
  })
  const data = await response.json()
  return data as RunServiceDto
}

type IsServiceRunningDto = IacpaasResponse & { running: boolean }

export const IsServiceRunningAsync = async (id: string): Promise<IsServiceRunningDto> => {
  const response = await fetch(`https://iacpaas.dvo.ru/api/service/${id}/running`, {
    method: 'GET'
  })
  const data = await response.json()
  return data as IsServiceRunningDto
}
