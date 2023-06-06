import { Dialog, Transition } from '@headlessui/react'
import { Button } from '@material-tailwind/react';
import { Fragment, useState } from 'react'

export default function NewsDetailModal({
  open,
  closeModal,
  data
}) {
  if(!data) return null;

  console.log('debug: data', data)
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full space-y-1 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {data.title}
                </Dialog.Title>
                {data.urlToImage && (
                  <div className='my-2'>
                    <img src={data.urlToImage} alt="new-item"/>
                  </div>
                )}
                
                <div className="mt-2">
                  <h5 className='text-sm text-gray-500 font-bold'>Description</h5>
                  <p className="text-sm text-gray-500">
                    {data.description}
                  </p>
                </div>

                <div className='text-sm text-gray-500 space-x-2'>
                  <span className='font-bold'>Author:</span>
                  <span>{data.author}</span>
                </div>

                <div className='text-sm text-gray-500 space-x-2'>
                  <span className='font-bold'>Source:</span>
                  <span>{data.source?.name}</span>
                </div>

                <div className="mt-[20px]">
                  {/* <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button> */}
                  <Button onClick={closeModal} className='mt-5 w-full'>Close</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}