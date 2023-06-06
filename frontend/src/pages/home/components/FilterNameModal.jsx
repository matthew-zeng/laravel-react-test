import { Dialog, Transition } from '@headlessui/react'
import { Button, Input } from '@material-tailwind/react';
import { Fragment, useState } from 'react'

export default function FilterNameModal({
  open,
  closeModal,
  success
}) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const onSave = () => {
    if(!name) setError('Name cannot be empty');
    else {
      success(name)
      setError('')
      setName('')
      closeModal()
    }
  }
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
                  Name your custom filter
                </Dialog.Title>
                <div className='mt-6'>
                  <Input value={name} onChange={(e) => setName(e.target.value)} label="Name your filter"/>
                  {error && (
                    <div className='text-xs text-red-300'>{error}</div>
                  )}
                </div>
                <div className='pt-2 w-full'>
                  <Button className='w-full' onClick={onSave}>Save</Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}