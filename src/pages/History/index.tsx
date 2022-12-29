import React from 'react'
import { statusOptions } from './data'
import { HistoryContainer, HistoryTable, Status } from './styles'

export const History: React.FC = () => {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => {
              const status = statusOptions[id % 3]

              return (
                <tr key={id}>
                  <td>Projeto {id}</td>
                  <td>{id * 5} minutos</td>
                  <td>Há {id * 3} minutos</td>
                  <td>
                    <Status color={status.color}>{status.text}</Status>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryTable>
    </HistoryContainer>
  )
}
