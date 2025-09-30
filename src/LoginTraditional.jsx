import { useEffect, useState } from 'react'
import ModalLogin from './ModalLogin'

export default function LoginTraditional() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    
  }, [])

  return (
    <div>
      <div>Login Formmer</div>
        <ModalLogin open={open} handleClose={() => setOpen(false)} handleClickOpen={() => setOpen(true)}/>
    </div>
  )
}
