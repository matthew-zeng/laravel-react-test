import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import _ from 'lodash';

import axios from '../app/api/axios';
import { fetchUser } from '../app/reducers/userSlice';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  email: Yup.string().email('Invalid email').required('Required'),
  passwordConfirm: Yup.string().label('confirm password').required().  oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: values => {
      handleRegister(values)
    },
  });

  const handleRegister = async (values) => {
    await csrf();
    try {
      await axios.post("/register", {name: values.name, email: values.email, password: values.password, password_confirmation: values.passwordConfirm})
      await dispatch(fetchUser())
      formik.resetForm();
      navigate("/")
    } catch(e) {
      if(e.response.status === 422) {
        const errors = e.response.data.errors
        let message = ''
        _.map(errors, (value, key) => {
          message += `${key}: ${value}`
        })
        toast.error(message)
      }
    }
  }

  return (
    <section className="md:py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="md:-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="
                relative
                mx-auto
                max-w-[525px]
                overflow-hidden
                rounded-lg
                bg-white
                py-16
                px-10
                text-center
                sm:px-12
                md:px-[60px]
              "
            >
              <div className="mb-10 text-center md:mb-16">News</div>
              <form>
                <div className="mb-6">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="
                      bordder-[#E9EDF4]
                      w-full
                      rounded-md
                      border
                      bg-[#FCFDFE]
                      py-3
                      px-5
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus:border-primary
                      focus-visible:shadow-none
                    "
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {formik.errors.name}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="mb-6">
                  <input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="email"
                    placeholder="Email"
                    className="
                      bordder-[#414a5a]
                      w-full
                      rounded-md
                      border
                      bg-[#FCFDFE]
                      py-3
                      px-5
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus:border-primary
                      focus-visible:shadow-none
                    "
                  />
                 {formik.errors.email && formik.touched.email ? (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {formik.errors.email}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="
                      bordder-[#E9EDF4]
                      w-full
                      rounded-md
                      border
                      bg-[#FCFDFE]
                      py-3
                      px-5
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus:border-primary
                      focus-visible:shadow-none
                    "
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {formik.errors.password}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="mb-4">
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                    type="password"
                    placeholder="Password Confirmation"
                    className="
                      bordder-[#E9EDF4]
                      w-full
                      rounded-md
                      border
                      bg-[#FCFDFE]
                      py-3
                      px-5
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus:border-primary
                      focus-visible:shadow-none
                    "
                  />
                    {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {formik.errors.passwordConfirm}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="mb-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit()
                    }}
                    type="submit"
                    className="
                      w-full
                      px-4
                      py-3
                      bg-indigo-500
                      hover:bg-indigo-700
                      rounded-md
                      text-white
                    "
                  >
                    Register
                  </button>
                </div>
              </form>
              <Link
                to="/forgot-password"
                className="
                  mb-2
                  inline-block
                  text-base text-[#adadad]
                  hover:text-primary hover:underline
                "
              >
                Forgot Password?
              </Link>
              <p className="text-base text-[#adadad]">
                Not a member yet?
                <Link to="/register" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
