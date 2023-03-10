import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useCyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

export const NewCycleForm: React.FC = () => {
  const { activeCycle } = useCyclesContext()

  const { register } = useFormContext()

  const isInputDisabled = useMemo(() => !!activeCycle, [activeCycle])

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        title={
          isInputDisabled
            ? 'Interrompa o ciclo para poder editar esse campo'
            : ''
        }
        disabled={isInputDisabled}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        disabled={isInputDisabled}
        title={
          isInputDisabled
            ? 'Interrompa o ciclo para poder editar esse campo'
            : ''
        }
        step={5}
        min={1}
        max={99}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
