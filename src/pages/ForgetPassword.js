import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../include/Button'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const ForgetPassword = () => {
    const location = useLocation()
    console.log(location.pathname)
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        // console.log(data);
        try {
            const response = await axios.post(location.pathname, data)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="shadow-lg rounded p-5 width-50">
                <h2 className="login-form-title text-center mb-3">Forgot Your Password?</h2>
                <h6 className='w-75  text-center m-auto  mb-3'>Enter your email address and we will send you instructions to reset your password.</h6>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            type="email"
                            className="form-control login-form-input "
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Email is not valid"
                                }
                            })}
                            placeholder="Email*"
                        />
                        <Button type='submit'>Continue</Button>
                        <button className='w-100 rounded p-2 mt-2 btn-secondary'>
                            <Link to={"/"} className="text-decoration-none fs-6 text-black">Back to Lms</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword