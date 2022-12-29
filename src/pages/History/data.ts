import { StatusOption } from './types'

export const statusOptions: Record<number, StatusOption> = {
  0: { text: 'Em andamento', color: 'yellow' },
  1: { text: 'Interrompido', color: 'red' },
  2: { text: 'Concluído', color: 'green' },
}
