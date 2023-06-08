import { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
} from "@material-tailwind/react";
import NewsDetailModal from "./NewsDetailModal";
import NewsAPITab from "./NewsAPITab";
import NewYorkTimesTab from "./NewYorkTimesTab";
import TheGuardianTab from "./TheGuardianTab";
 
export default function APITabs({
  apiCategory, 
  setAPICategory, 
  onSearch, 
  searchKey, 
  setSearchKey, 
  showingList, 
  setFilter, 
  filter,
  articles,
  guardians
}) {
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
        <Tab key='TheGuardian' onClick={() => setAPICategory('TheGuardian')} value='TheGuardian'>
          The Guardians
        </Tab>
      </TabsHeader>
      <TabsBody className="min-h-[80vh]">
        {apiCategory === 'NewsAPI' && (
          <NewsAPITab 
            key="NewsAPI"
            value="NewsAPI"
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            searchKey={searchKey}
            onSearch={onSearch}
            showingList={showingList}
            onReset={onReset}
            setSearchKey={setSearchKey}
            filter={filter}
            setFilter={setFilter}
            viewDetail={viewDetail}
          />
        )}
        {apiCategory === 'NewYorkTimes' && (
          <NewYorkTimesTab 
            key="NewYorkTimes"
            value="NewYorkTimes"
            searchKey={searchKey} 
            setSearchKey={setSearchKey} 
            onSearch={onSearch}
            showingList={articles}
            viewDetail={viewDetail}
          />
        )}
        {apiCategory === 'TheGuardian' && (
          <TheGuardianTab
            key="TheGuardian"
            value="TheGuardian"
            searchKey={searchKey} 
            setSearchKey={setSearchKey} 
            onSearch={onSearch}
            showingList={guardians}
            viewDetail={viewDetail}
          />
        )}
      </TabsBody>
      <NewsDetailModal 
        open={showDetail} 
        closeModal={() => setShowDetail(false)} 
        data={selectedData}
        apiCategory={apiCategory}
      />
    </Tabs>
  )
}