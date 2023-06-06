import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Button,
} from "@material-tailwind/react";
import clsx from "clsx";
import NewsCard from "./NewsCard";
import NewsDetailModal from "./NewsDetailModal";
import { FilterIcon } from "components/Icons";
import FilterBar from "./FilterBar";
 
export default function APITabs({apiCategory, setAPICategory, onSearch, searchKey, setSearchKey, showingList, setFilter, filter}) {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  const [showFilter, setShowFilter] = useState(false);

  const viewDetail = (data) => {
    setSelectedData(data);
    setShowDetail(true)
  }

  const onReset = () => {
    setFilter({});
  }

  return (
    <Tabs value={apiCategory}>
      <TabsHeader className="max-w-xl mx-3 600px:mx-auto">
        <Tab key='NewsAPI' onClick={() => setAPICategory('NewsAPI')} value='NewsAPI'>
          NewsAPI
        </Tab>
        <Tab key='NewYorkTimes' onClick={() => setAPICategory('NewYorkTimes')} value='NewYorkTimes'>
          New York Times
        </Tab>
      </TabsHeader>
      <TabsBody className="min-h-[80vh]">
        <TabPanel key='NewsAPI' value='NewsAPI'>
          <div className="space-y-3">
            <div className="max-w-xl mx-auto space-y-3">
              <p className="text-xs">To search articles or news with keyword, please type keyword first then click submit button or press enter key.</p>
              <div className="md:flex items-center md:space-x-2 space-y-4">
                <Input label="Search Key" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
                <div className="flex space-x-2">
                  <Button className="flex justify-center" disabled={searchKey.length === 0} onClick={onSearch}>Search</Button>
                  <div 
                    className={clsx("p-3 rounded-md cursor-pointer", showFilter && 'bg-blue-500')} 
                    onClick={() => setShowFilter(prev => !prev)}
                  >
                    <FilterIcon className={clsx(showFilter ? 'text-white' : 'text-gray-700')} size={25}/>
                  </div>
                </div>
                
              </div>
            </div>
            {showFilter && (
              <div className="max-w-7xl mx-auto pb-4">
                <FilterBar filter={filter} setFilter={setFilter} data={showingList} onReset={onReset}/>
              </div>
            )}
            {showingList.length === 0 && (
              <h5 className="text-center text-3xl text-gray-500 pt-10">No news</h5>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10">
              {showingList.map(v => (
                <NewsCard data={v} viewData={viewDetail}/>
              ))}
            </div>
          </div>
        </TabPanel>
      </TabsBody>
      <NewsDetailModal open={showDetail} closeModal={() => setShowDetail(false)} data={selectedData}/>
    </Tabs>
  )
}