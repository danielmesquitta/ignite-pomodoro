import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import React, { useCallback, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useCyclesContext } from '../../contexts/CyclesContext'
import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .int()
    .min(1, 'O ciclo deve ser no mínimo de 1 minuto')
    .max(99, 'O ciclo deve ser no máximo de 99 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const Home: React.FC = () => {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useCyclesContext()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { watch, handleSubmit, reset } = useMemo(
    () => newCycleForm,
    [newCycleForm],
  )

  const handleCreateNewCycle = useCallback(
    (data: NewCycleFormData) => {
      createNewCycle(data)

      reset()
    },
    [createNewCycle, reset],
  )

  const handleInterruptCycle = useCallback(() => {
    interruptCurrentCycle()
  }, [interruptCurrentCycle])

  const isSubmitDisabled = !watch('task')

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
