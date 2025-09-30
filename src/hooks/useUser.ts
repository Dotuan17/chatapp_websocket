import { useState, useEffect } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setUser(JSON.parse(data))
    }
  }, [])

  return user
}
