import React, { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react'
import {
  AvailableViral,
  AvailableViralGroup,
  availableViralGroups
} from '@renderer/data/AvailableVirals'

interface IViralsDataContext {
  availableViralGroups: AvailableViralGroup[]
  selectedVirals: AvailableViral[]
  onSelectViralItem: (viralItem: AvailableViral) => void
  onRemoveViralItem: (viralItem: AvailableViral) => void
}

export const ViralsDataContext = createContext<IViralsDataContext>({
  availableViralGroups: [],
  selectedVirals: [],
  onSelectViralItem: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  },
  onRemoveViralItem: () => {
    throw new Error('Не удалось инициализировать контекст данных о заболеваниях')
  }
})

export type AvailableViralGroupView = {
  name: string
  virals: AvailableViral[]
}

export const ViralsDataContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedVirals, setSelectedVirals] = useState<AvailableViral[]>([])

  const onSelectViralItem = useCallback((viralItem: AvailableViral) => {
    console.log(viralItem.name)
	setSelectedVirals(prev => [...prev, viralItem])
  }, [setSelectedVirals])

  const onRemoveViralItem = useCallback((viralItem: AvailableViral) => {
    setSelectedVirals(prev => {
		const isExist = prev.find(el => el.name === viralItem.name)
		if(isExist)
			return [...prev.filter(item => item.name !== viralItem.name)]
		return prev
	})
  }, [setSelectedVirals])

  return (
    <ViralsDataContext.Provider value={{ availableViralGroups, onSelectViralItem, selectedVirals, onRemoveViralItem }}>
      {children}
    </ViralsDataContext.Provider>
  )
}
