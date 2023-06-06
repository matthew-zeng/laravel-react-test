//packages
import { getUser } from 'app/reducers/userSlice'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//custom components
import Form from './components/Form'

//redux
import { fetchUser } from 'app/reducers/userSlice'

export default function Setting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser)

  const checkUserLogin = useCallback(async () => {
    if(!user) {
      const resultAction = await dispatch(fetchUser());
      console.log(fetchUser)
      if (!fetchUser.fulfilled.match(resultAction)) {
        navigate('/')
      }
    }
  }, [user])

  useEffect(() => {
    checkUserLogin()
  }, [checkUserLogin])
  return (
    <div>
      <Form user={user}/>
    </div>
  )
}
