import React, { createContext, PropsWithChildren, useCallback } from 'react'
import {
  AvailableViral,
  AvailableViralGroup,
  availableViralGroups
} from '@renderer/data/AvailableVirals'

interface IViralsDataContext {
  availableViralGroupViews: AvailableViralGroupView[]
  onSelectViralItem: (viralItem: AvailableViralView) => void
}

export const ViralsDataContext = createContext<IViralsDataContext>({
  availableViralGroupViews: [],
  onSelectViralItem: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  }
})

export type AvailableViralGroupView = {
	name: string
	virals: AvailableViralView[]
}

export type AvailableViralView = AvailableViral & {
  isSelected: boolean
}

function convertViralGroups(
  availableViralGroups: AvailableViralGroup[]
): AvailableViralGroupView[] {
  const viewGroups: AvailableViralGroupView[] = []

  for (const group of availableViralGroups) {
    const virals = convertVirals(group.virals)
    viewGroups.push({
      name: group.name,
      virals
    })
  }

  return viewGroups
}

function convertVirals(availableVirals: AvailableViral[]): AvailableViralView[] {
  const viralViews: AvailableViralView[] = []

  for (const viral of availableVirals) {
    viralViews.push({
      ...viral,
      isSelected: false
    })
  }

  return viralViews
}

const availableViralGroupViews = convertViralGroups(availableViralGroups)

export const ViralsDataContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const onSelectViralItem = useCallback((viralItem: AvailableViralView) => {}, [])

  return (
    <ViralsDataContext.Provider value={{ availableViralGroupViews, onSelectViralItem }}>
      {children}
    </ViralsDataContext.Provider>
  )
}
