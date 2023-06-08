import React from 'react'
import _ from 'lodash'
import NoImagePng from 'assets/images/no-image.jpg'
import { Button } from '@material-tailwind/react'

export default function ArticleCard({data, viewDetail}) {
  const moveToArticle = () => {
    window.open(data.web_url, 'blank')
  }

  return (
    <div className='w-full h-auto'>
      <div className='group relative'>
        <a href={data.web_url} target='_blank'>
          {
            _.isArray(data.multimedia) && data.multimedia.length > 0 && _.find(data.multimedia, v => v.type === 'image') ? (
              <img className='h-full object-cover' src={'http://static01.nyt.com/' + _.find(data.multimedia, v => v.type === 'image').url}/>
            ) : (
              <img className='h-full w-full object-cover object-center' src={NoImagePng}/>
            )
          }
        </a>
        <div className='transition-all overflow-hidden h-0 group-hover:h-full flex justify-center items-center absolute duration-300 top-0 z-10 w-full bg-blue-100 bg-opacity-80'>
          <div className='space-y-2 flex-row items-center'>
            <div className='flex justify-center'>
              <Button onClick={moveToArticle}>Go to Article</Button>
            </div>
            <div className='flex justify-center'>
              <Button 
                className='bg-opacity-80' 
                onClick={() => viewDetail({
                  title: data.headline.main,
                  description: data.lead_paragraph,
                  urlToImage: 'http://static01.nyt.com/' +_.find(data.multimedia, v => v.type === 'image')?.url,

                })}>
                  View
                </Button>
            </div>
          </div>
          
        </div>
      </div>
      <div className='flex space-x-2 text-sm mt-2 text-gray-700 font-semibold'>
        <span>Headline:</span>
        <span className='truncate'>{data.headline.main}</span>
      </div>
    </div>
  )
}
