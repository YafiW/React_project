import React, { FC, ReactNode } from 'react';
import './User-details.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { json } from 'stream/consumers';
import usersModel from '../../models/userModel';

interface UserDetailsProps {
    AddUser: (usersModel: any) => void;
}

const UserDetails: FC<UserDetailsProps> = (props: UserDetailsProps) => {
    const userform = useFormik({
        initialValues: {
            UserId: Yup.number,
            Name: "",
            UserName: "",
            Email: ""
        },
        onSubmit: (valueForm: any, { resetForm }) => {
            let userToAdd = new usersModel(
                valueForm.UserId,
                valueForm.Name,
                valueForm.UserName,
                valueForm.Email
            );
            props.AddUser(userToAdd);

            resetForm({
                values: {
                    UserId: '',
                    Name: '',
                    UserName: '',
                    Email: '',
                },
            });
        },
        validationSchema: Yup.object().shape({
            UserId: Yup.number().required('ID must have a number'),
            Name: Yup.string().required().min(2, 'Name must be at least 2 characters long'),
            UserName: Yup.string().required().min(2, 'Name must be at least 2 characters long'),
            Email: Yup.string().required().email('Invalid email address')
        })
    })

    return <div className='My_Form'>
        <form onSubmit={userform.handleSubmit} >
            <div className='form-group mt-3'>
                <label> User-ID:</label>
                <input value={userform.values.UserId} name='UserId' onChange={userform.handleChange} className={userform.errors.UserId ? 'form-control is-invalid' : 'form-control'}></input>
                {typeof userform.errors.UserId === 'string' ? (
                    <small>{userform.errors.UserId}</small>
                ) : null}
            </div>
            <div className='form-group mt-3'>
                <label>Name:</label>
                <input value={userform.values.Name} name='Name' onChange={userform.handleChange} className={userform.errors.Name ? 'form-control is-invalid' : 'form-control'}></input>
                {typeof userform.errors.Name === 'string' ? (
                    <small>{userform.errors.Name}</small>
                ) : null}
            </div>
            <div className='form-group mt-3'>
                <label>User Name:</label>
                <input value={userform.values.UserName} name='UserName' onChange={userform.handleChange} className={userform.errors.UserName ? 'form-control is-invalid' : 'form-control'}></input>
                {typeof userform.errors.UserName === 'string' ? (
                    <small>{userform.errors.UserName}</small>
                ) : null}
            </div>
            <div className='form-group mt-3'>
                <label>User email:</label>
                <input value={userform.values.Email} name='Email' onChange={userform.handleChange} className={userform.errors.Email ? 'form-control is-invalid' : 'form-control'}></input>
                {typeof userform.errors.Email === 'string' ? (
                    <small>{userform.errors.Email}</small>
                ) : null}
            </div>
            <button type='submit' className='btn btn-warning mt-5'>Add new user</button>

        </form>
    </div>
};

export default UserDetails;
