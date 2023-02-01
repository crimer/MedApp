import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import { ViralListItem } from '@renderer/components/ViralListItem'
import { ListSubheader } from '@mui/material'
import { useContext } from 'react'
import { AvailableViralView, ViralsDataContext } from '@renderer/context/ViralsDataContext'
import { v4 as uuidv4 } from 'uuid'

const drawerWidth = 380

export const ApplicationSideBar: React.FC = () => {
  const { availableViralGroupViews, onSelectViralItem } = useContext(ViralsDataContext)

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
        {availableViralGroupViews.map((viralGroupView) => (
          <ViralItemsList
            key={uuidv4()}
            onSelectViralItem={onSelectViralItem}
            title={viralGroupView.name}
            viralItems={viralGroupView.virals}
          />
        ))}
      </Box>
    </Drawer>
  )
}

interface IViralItemsList {
  title: string
  viralItems: AvailableViralView[]
  onSelectViralItem: (viralItem: AvailableViralView) => void
}

const ViralItemsList: React.FC<IViralItemsList> = ({ title, viralItems, onSelectViralItem }) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: drawerWidth }}
      subheader={<ListSubheader style={{ fontWeight: 'bold' }}>{title}</ListSubheader>}
    >
      {viralItems.map((viralItem) => (
        <ViralListItem
          key={uuidv4()}
          isChecked={viralItem.isSelected}
          name={viralItem.name}
          value={viralItem}
          onSelect={() => onSelectViralItem(viralItem)}
        />
      ))}
    </List>
  )
}
