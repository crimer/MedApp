export interface DataSuccessorRoot extends DataSuccessor {
  json_type: string
  title: string
  owner_id: number
  path: string
  date: string
  creation: string
  ontology: string
}
export interface DataSuccessor {
  name?: string
  type?: string
  valtype?: string
  value?: unknown
  original?: string
  link?: string
  successors?: DataSuccessor[]
  meta?: string
}

export const ValueTypes = {
  TerminalValue: 'ТЕРМИНАЛ-ЗНАЧЕНИЕ',
  NoneTerminal: 'НЕТЕРМИНАЛ',
  TerminalSort: 'ТЕРМИНАЛ-СОРТ',
  Start: 'НАЧАЛО',
  Str: 'STRING',
  Integer: 'INTEGER',
  Blob: 'BLOB',
  Date: 'DATE',
  Real: 'REAL',
  Boolean: 'BOOLEAN'
}

