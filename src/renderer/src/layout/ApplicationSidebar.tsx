import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import { ViralListItem } from '@renderer/components/ViralListItem'
import { Divider, ListSubheader } from '@mui/material'

const drawerWidth = 320

export const ApplicationSideBar: React.FC = () => {
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
        <ViralItemsList title="Жалобы" items={['ad', 'asd']} />
      </Box>
    </Drawer>
  )
}

interface IViralItemsList {
  title: string
  items: string[]
}

const ViralItemsList: React.FC<IViralItemsList> = ({ title, items }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }} subheader={<ListSubheader>{title}</ListSubheader>}>
      {items.map((el) => (
        <ViralListItem isChecked={false} name={el} />
      ))}
    </List>
  )
}
