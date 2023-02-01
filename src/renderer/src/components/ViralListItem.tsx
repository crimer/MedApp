import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

interface IViralListItem {
  name: string
  isChecked: boolean
  value: object
  onSelect: (value: object) => void
}

export const ViralListItem: React.FC<IViralListItem> = ({ name, isChecked, onSelect, value }) => {
  const labelId = `checkbox-list-label-${uuidv4()}`
  return (
    <ListItem key={labelId} disablePadding dense>
      <ListItemButton role={undefined} onClick={() => onSelect(value)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isChecked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={name} />
      </ListItemButton>
    </ListItem>
  )
}
