import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import newsAPIClient from 'app/api/newsAPI'
import { fetchUser, getUser } from 'app/reducers/userSlice'
import APITabs from './components/APITabs'

export default function Home() {
  const [apiCategory, setAPICategory] = useState('NewsAPI')
  const [searchKey, setSearchKey] = useState('')
  const [showingList, setShowingList] = useState([])
  const [filter, setFilter] = useState({});

  const [news, setNews] = useState([])
  const user = useSelector(getUser)
  
  const dispatch = useDispatch()
  useEffect(() => {
    if(!user) {
      dispatch(fetchUser())
    }
  }, [user])

  const onSearch = async () => {
    if(searchKey && apiCategory === 'NewsAPI') {
      let params = { apiKey: process.env.REACT_APP_NEWS_API_KEY, q: searchKey }
      if(Object.keys(filter).length > 0) {
        params = {...params, ...filter};
      }
      const result = await newsAPIClient({url: '/everything', method: 'GET',  params})
      setShowingList(result.data.articles);
    }
  }

  return (
    <div className='mx-auto'>
      <APITabs 
        showingList={showingList}
        apiCategory={apiCategory} 
        setAPICategory={setAPICategory} 
        onSearch={onSearch} 
        searchKey={searchKey} 
        setSearchKey={setSearchKey}
        setFilter={setFilter}
        filter={filter}
      />
    </div>
  )
}
