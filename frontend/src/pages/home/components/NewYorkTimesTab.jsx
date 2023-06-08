import React, { useState } from 'react'
import clsx from 'clsx'
import { TabPanel, Input, Button } from '@material-tailwind/react'
import { FilterIcon } from 'components/Icons'
import ArticleCard from './ArticleCard'

export default function NewYorkTimesTab({
  searchKey, 
  setSearchKey, 
  onSearch, 
  showingList, 
  viewDetail
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div>
      <TabPanel key='NewYorkTimes' value='NewYorkTimes'>
      <div className="space-y-3">
        <div className="max-w-xl mx-auto space-y-3">
          <p className="text-xs">To search articles or news with keyword, please type keyword first then click submit button or press enter key.</p>
          <div className="md:flex items-center md:space-x-2 space-y-4 md:space-y-0">
            <Input 
              label="Search Key" 
              value={searchKey} 
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button 
                className="flex justify-center" 
                disabled={searchKey.length === 0} 
                onClick={onSearch}
              >
                Search
              </Button>
              <div 
                className={clsx("p-3 rounded-md cursor-pointer", showFilter && 'bg-blue-500')} 
                onClick={() => setShowFilter(prev => !prev)}
              >
                <FilterIcon 
                  className={clsx(showFilter ? 'text-white' : 'text-gray-700')} size={25}/>
              </div>
            </div>
          </div>
        </div>
        {showingList.length === 0 && (
          <h5 className="text-center text-3xl text-gray-500 pt-10">No articles</h5>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10">
          {showingList.map(v => (
            <ArticleCard data={v} viewDetail={viewDetail}/>
          ))}
        </div>
      </div>
    </TabPanel>
    </div>
  )
}
