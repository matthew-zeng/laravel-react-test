import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import newsAPIClient from 'app/api/newsAPI'
import nyTimesAPI from 'app/api/nyTimesAPI'
import { fetchUser, getUser } from 'app/reducers/userSlice'
import APITabs from './components/APITabs'
import theGuardianAPI from 'app/api/theGuardianAPI'

export default function Home() {
  const [apiCategory, setAPICategory] = useState('NewsAPI')
  const [searchKey, setSearchKey] = useState('')
  const [showingList, setShowingList] = useState([])
  const [showingArticleList, setShowingArticleList] = useState([])
  const [guardians, setGuardians] = useState([]);
  const [filter, setFilter] = useState({});
  
  const user = useSelector(getUser)
  
  const dispatch = useDispatch()
  useEffect(() => {
    if(!user) {
      dispatch(fetchUser())
    }
  }, [user])

  const onSearch = async () => {
    if(searchKey && apiCategory === 'NewsAPI') {
      setShowingList([])
      let params = { apiKey: process.env.REACT_APP_NEWS_API_KEY, q: searchKey }
      if(Object.keys(filter).length > 0) {
        params = {...params, ...filter};
      }
      const result = await newsAPIClient({url: '/everything', method: 'GET',  params})
      setShowingList(result.data.articles);
    }
    if(searchKey && apiCategory === 'NewYorkTimes') {
      try {
        let params = { q: searchKey, 'api-key': process.env.REACT_APP_NY_TIMES_API_KEY }
        const result = await nyTimesAPI({url: '/articlesearch.json', method: 'GET',  params})
        setShowingArticleList(result.data.response.docs);
      } catch(err) {
        console.log('debug: err')
      }
    }
    if(searchKey && apiCategory === 'TheGuardian') {
      try {
        let params = { q: searchKey, 'api-key': process.env.REACT_APP_THE_GUARDIAN_API_KEY }
        const result = await theGuardianAPI({url: '/search', method: 'GET',  params})
        // setShowingArticleList(result.data.response.docs);
        setGuardians(result.data.response.results);
      } catch(err) {
        console.log('debug: err')
      }
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
        articles={showingArticleList}
        guardians={guardians}
      />
    </div>
  )
}
