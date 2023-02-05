import { DataSuccessorRoot } from '@renderer/data/DataSuccessor'
import { IacpaasResponse } from './dto/IacpaasResponse'
import { InfoResourceDto } from './dto/InfoResourceDto'

type ImportDto = {
  path: string
  json: string
  clearIfExists: boolean
}

const baseAddress = 'https://iacpaas.dvo.ru'
const getHeaders = () => ({
  'X-API-KEY': '6cf60d216c5b1b32ebfbbb5492c5a1b7',
  'Content-Type': 'application/json'
})

function BuildPath(path: string) {
  const regex = new RegExp('[$;]+')
  const sb: string[] = []
  const pathes = path.split('/')

  pathes.forEach((pathItem) => {
    if (!pathItem.includes('@') && !pathItem.includes('Мой Фонд')) {
      const pathElement = pathItem.replace(regex, '')
      sb.push(pathElement)
    }
  })

  const array = sb.slice(0, sb.length - 1)
  return array.join('/')
}

export const ImportDataAsync = async (
  path: string,
  json: string,
  clearIfExist = false
): Promise<IacpaasResponse> => {
  const response = await fetch(`${baseAddress}/api/data/import`, {
    body: JSON.stringify({
      path: BuildPath(path),
      json,
      clearIfExist
    }),
    method: 'POST',
    headers: {
      ...getHeaders()
    }
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

export const ExportDataAsync = async (dto: ExportDto): Promise<DataSuccessorRoot> => {
  const response = await fetch(`${baseAddress}/api/data/export/user-item${buildGetParams(dto)}`, {
    method: 'GET',
    headers: getHeaders()
  })
  const infoResourceDto = (await response.json()) as InfoResourceDto
  return JSON.parse(infoResourceDto.data) as DataSuccessorRoot
}

type RunServiceDto = IacpaasResponse & { runningServiceId: boolean }
export const RunServiceAsync = async (id: string): Promise<RunServiceDto> => {
  const response = await fetch(`${baseAddress}/api/service/run/${id}`, {
    method: 'GET',
    headers: getHeaders()
  })
  const data = await response.json()
  return data as RunServiceDto
}

type IsServiceRunningDto = IacpaasResponse & { running: boolean }

export const IsServiceRunningAsync = async (id: string): Promise<IsServiceRunningDto> => {
  const response = await fetch(`${baseAddress}/api/service/${id}/running`, {
    method: 'GET',
    headers: getHeaders()
  })
  const data = await response.json()
  return data as IsServiceRunningDto
}

export const buildGetParams = (params: object): string => {
  const paramsString = Object.entries(params)
    .map((param) => param.map((el) => el).join('='))
    .join('&')
  return `?${paramsString}`
}
