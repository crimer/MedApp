import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import { ViralListItem } from '@renderer/components/ViralListItem'
import { ListSubheader } from '@mui/material'
import { useCallback, useContext } from 'react'
import { ViralsDataContext } from '@renderer/context/ViralsDataContext'
import { v4 as uuidv4 } from 'uuid'
import { AvailableViral } from '@renderer/data/AvailableVirals'

const drawerWidth = 380

export const ApplicationSideBar: React.FC = () => {
  const { availableViralGroups, onSelectViralItem, onRemoveViralItem, selectedVirals } =
    useContext(ViralsDataContext)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <Box style={{ overflow: 'auto' }}>
        {availableViralGroups.map((viralGroup) => (
          <ViralItemsList
            selectedVirals={selectedVirals}
            key={uuidv4()}
            onSelectViralItem={onSelectViralItem}
            onRemoveViralItem={onRemoveViralItem}
            title={viralGroup.name}
            viralItems={viralGroup.virals}
          />
        ))}
      </Box>
    </Drawer>
  )
}

interface IViralItemsList {
  title: string
  selectedVirals: AvailableViral[]
  viralItems: AvailableViral[]
  onSelectViralItem: (viralItem: AvailableViral) => void
  onRemoveViralItem: (viralItem: AvailableViral) => void
}

const ViralItemsList: React.FC<IViralItemsList> = ({
  title,
  viralItems,
  onSelectViralItem,
  onRemoveViralItem,
  selectedVirals
}) => {
  const isExist = useCallback(
    (viralItem: AvailableViral): boolean => {
      const isExistElement = selectedVirals.find((el) => el.name === viralItem.name)
      return isExistElement !== undefined
    },
    [selectedVirals]
  )

  const onSelectItem = useCallback(
    (viralItem: AvailableViral) => {
      if (isExist(viralItem)) onRemoveViralItem(viralItem)
      else onSelectViralItem(viralItem)
    },
    [selectedVirals, onSelectViralItem, onRemoveViralItem]
  )

  return (
    <List
      sx={{ width: '100%', maxWidth: drawerWidth }}
      subheader={<ListSubheader style={{ fontWeight: 'bold' }}>{title}</ListSubheader>}
    >
      {viralItems.map((viralItem) => (
        <ViralListItem
          key={uuidv4()}
          isChecked={isExist(viralItem)}
          name={viralItem.name}
          onSelect={() => onSelectItem(viralItem)}
        />
      ))}
    </List>
  )
}
