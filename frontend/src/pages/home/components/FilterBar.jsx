import React, { useEffect, useState, useCallback } from 'react'
import _ from 'lodash'
import Datepicker from "react-tailwindcss-datepicker"; 
import { toast } from 'react-toastify';

import Dropdown from 'components/Dropdown'

import { getUniqueValues } from 'functions/util'

import newsAPIClient from 'app/api/newsAPI'
import { Button } from '@material-tailwind/react';
import FilterNameModal from './FilterNameModal';

export default function FilterBar({ data, filter, setFilter, onReset }) {
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: new Date().setMonth(11) 
  }); 
  const [authorsList, setAuthorsList] = useState([])
  const [sourceList, setSourcesList] = useState([])
  const [isAvailableSaveFilter, setIsAvailableSaveFilter] = useState(false);
  const [showFilterNameModal, setShowFilterNameModal] = useState(false);
  const [customFilterList, setCustomFilterList] = useState([]);
  const [selectedCustomFilter, setSelectedCustomFilter] = useState(null);

  useEffect(() => {
    setAuthorsList(_.compact(getUniqueValues(data, 'author')).map(v => {
      return {
        name: v,
        value: v
      }
    }))
  }, [data])

  useEffect(() => {
    let customFilters = localStorage.getItem('filters');
    if(customFilters) {
      setCustomFilterList(JSON.parse(customFilters).map(v => {
        return {
          name: v.name,
          value: v.filter
        }
      }))
    } else {
      setCustomFilterList([])
    }
  }, [])

  const fetchSourcesAvailableList = useCallback(async () => {
    try {
      const result = await newsAPIClient({url: '/sources', method: 'GET',  params: { apiKey: process.env.REACT_APP_NEWS_API_KEY}})
      if(result.status === 200) {
        setSourcesList(result.data.sources.map(v => {
          return {
            value: v.id,
            name: v.name
          }
        }))
      }
    } catch(err) {
      console.log('debug: error', err);
    }
  }, [])

  useEffect(() => {
    fetchSourcesAvailableList()
  }, [fetchSourcesAvailableList])

  const onChange = type => value => {
    setIsAvailableSaveFilter(true);
    if(filter[type] && filter[type] === value.value) {
      let filter2Put = {...filter};
      delete filter2Put[type];
      setFilter({...filter2Put})
    } else {
      setFilter({...filter, [type]: value.value})
    }
  }

  const handleValueChange = (newValue) => {
    setValue(newValue); 
    if(!newValue.startDate && !newValue.endDate) {
      let filter2Put = {...filter};
      delete filter2Put['from'];
      delete filter2Put['to'];
      setFilter({...filter2Put})
    }
    if(newValue.startDate && newValue.endDate) {
      setFilter(prev => {return {...prev, from: newValue.startDate, to: newValue.endDate}})
    }
    setIsAvailableSaveFilter(true)
  }

  const onSave = () => {
    setShowFilterNameModal(true);
  }

  const onSuccess = (name) => {
    let currentFilters = localStorage.getItem('filters');
    if(currentFilters) {
      let current = JSON.parse(currentFilters);
      current.push({name, filter});
      setCustomFilterList(current.map(v => {
        return {
          name: v.name,
          value: v.filter
        }
      }))
      localStorage.setItem('filters', JSON.stringify(current))
    } else {
      setCustomFilterList([{name: name, value: filter}])
      localStorage.setItem('filters', JSON.stringify([{name, filter}]))
    }
    toast.success('Custom Filter saved successfully!')
    setIsAvailableSaveFilter(false)
  }

  const handleReset = () => {
    setValue({
      startDate: null,
      endDate: null
    })
    onReset();
  }

  const valueForSource = _.find(sourceList, v=> v.value === filter['sources'])

  return (
    <div className='grid md:grid-cols-4 gap-x-4 gap-y-4 md:gap-y-0'>
      {/* <div className='space-y-1'>
        <label className='text-sm font-medium' htmlFor="">Authors</label>
        <Dropdown 
          onChange={onChange('author')} 
          value={filter['author'] ?  {value: filter['author'], name: filter['author']} : null} 
          placeholder="Filter with Authors" 
          data={authorsList}
        />
      </div> */}
      <div className='space-y-1'>
        <label className='text-sm font-medium' htmlFor="">Sources</label>
        <Dropdown 
          onChange={onChange('sources')} 
          value={valueForSource ? valueForSource : null} 
          placeholder="Filter with Sources" 
          data={sourceList}
        />
      </div>
      <div>
        <label className='text-sm font-medium' htmlFor="">From - To</label>
        <Datepicker 
          containerClassName="relative w-full cursor-default rounded-lg bg-white pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          value={value} 
          onChange={handleValueChange} 
        />
      </div>
      <div className='space-y-1'>
        <label className='text-sm font-medium' htmlFor="">Custom Filter</label>
        <Dropdown 
          onChange={(value) => {
            setFilter(value.value)
            setSelectedCustomFilter(value)
          }}
          value={selectedCustomFilter} 
          placeholder="Please select your custom filter" 
          data={customFilterList}
        />
      </div>
      <div className='flex flex-row items-end justify-start space-x-4'>
        <Button onClick={handleReset} className='px-10'>Reset</Button>
        <Button disabled={Object.keys(filter).length === 0 || !isAvailableSaveFilter} onClick={onSave}>Save Filter</Button>
      </div>
      <FilterNameModal open={showFilterNameModal} closeModal={() => setShowFilterNameModal(false)} success={onSuccess}/>
    </div>
  )
}
