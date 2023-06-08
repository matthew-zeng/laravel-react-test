import React from 'react'
import _ from 'lodash'
import NoImagePng from 'assets/images/no-image.jpg'
import { Button } from '@material-tailwind/react'

export default function GuardianCard({data, viewDetail}) {
  const moveToArticle = () => {
    window.open(data.webUrl, 'blank')
  }

  return (
    <div className='w-full h-auto'>
      <div className='group relative'>
        <a href={data.webUrl} target='_blank'>
          {
            <img className='h-full w-full object-cover object-center' src={NoImagePng}/>
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
                  title: data.webTitle,
                  description: '',
                  urlToImage: ''
                })}>
                  View
                </Button>
            </div>
          </div>
          
        </div>
      </div>
      <div className='flex space-x-2 text-sm mt-2 text-gray-700 font-semibold'>
        <span>Headline:</span>
        <span className='truncate'>{data.webTitle}</span>
      </div>
    </div>
  )
}
