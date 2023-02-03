import { Modal, Box, Typography } from '@mui/material'
import { style } from '@mui/system'
import React from 'react'

interface IDialog {
  isOpen: boolean
  onClose?: () => void
}

interface IInfoModal extends IDialog {
  title: string
  text: string
}

export const InfoModal: React.FC<IInfoModal> = ({ text, title, isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{text}</Typography>
      </Box>
    </Modal>
  )
}
