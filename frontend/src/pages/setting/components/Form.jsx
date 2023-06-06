import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, Input } from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { updateUser } from 'app/reducers/userSlice';

const ProfileSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required')
});

export default function Form({ user }) {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
  })
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ProfileSchema,
    onSubmit: values => {
      handleEdit(values)
    },
    enableReinitialize: true
  });

  useEffect(() => {
    if(user) {
      const data2Put = {
        name: user.name,
        email: user.email
      }
      setInitialValues(data2Put)
    }
  }, [user])

  const handleEdit = async (values) => {
    try {
      formik.setSubmitting(true)
      let resultAction = await dispatch(updateUser({userId: user.id, data: values}))

      if (updateUser.fulfilled.match(resultAction)) {
        toast.success(`User's information has been updated successfully!`);
      } else {
        toast.error('There is error when updating information');
      }
    } catch(err) {
      console.log(err)
    } finally {
      formik.setSubmitting(false);
    }
    
  }

  return (
    <div>
      <div className='mx-10 md:max-w-[400px] md:mx-auto space-y-5 mt-[20vh] md:mt-[10vh] p-10 shadow-xl rounded-lg'>
        <div>
          <Input label="Username *" name="name" id="name" value={formik.values.name} onChange={formik.handleChange}/>
        </div>
        <div>
          <Input label="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} disabled={true}/>
        </div>
        <div className='flex justify-center w-full'>
          <Button disabled={formik.isSubmitting} className='w-full' onClick={formik.handleSubmit}>Update</Button>
        </div>
      </div>
    </div>
  )
}
