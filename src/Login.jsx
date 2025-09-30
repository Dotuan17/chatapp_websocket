import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ModalLogin from './ModalLogin'

export default function Login() {
  const [searchParams] = useSearchParams()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    navigate('/')
  }, [searchParams, navigate])

  return (
    <div>
      <ModalLogin open={open} handleClose={() => setOpen(false)} handleClickOpen={() => setOpen(true)}/>
    </div>
  )
}
