import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React from 'react'
import { useCyclesContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryTable, Status } from './styles'
import { StatusOption } from './types'

const statusOptions = {
  ON_GOING: { text: 'Em andamento', color: 'yellow' },
  INTERRUPTED: { text: 'Interrompido', color: 'red' },
  FINISHED: { text: 'Concluído', color: 'green' },
}

export const History: React.FC = () => {
  const { cycles } = useCyclesContext()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryTable>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map(
              ({
                id,
                minutesAmount,
                task,
                startedAt,
                interruptedAt,
                finishedAt,
              }) => {
                let statusOptionKey = 'ON_GOING' as keyof typeof statusOptions

                if (interruptedAt) {
                  statusOptionKey = 'INTERRUPTED'
                } else if (finishedAt) {
                  statusOptionKey = 'FINISHED'
                }

                const status = statusOptions[statusOptionKey] as StatusOption

                return (
                  <tr key={id}>
                    <td>{task}</td>
                    <td>{minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(new Date(startedAt), {
                        locale: ptBR,
                        addSuffix: true,
                      })}
                    </td>
                    <td>
                      <Status color={status.color}>{status.text}</Status>
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  )
}
