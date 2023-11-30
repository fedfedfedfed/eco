import React from "react";
import style from './LoginPage.module.css';
import { useDispatch } from "react-redux";
import { registerThunk } from "./authReducer";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const dispatch = useDispatch();

      const onSubmit = data => {
        dispatch(registerThunk(data))
        reset();
      };

        return (
          <div className={style['container']}>
            <form className={style['form']} onSubmit={handleSubmit(onSubmit)}>

              <p className={style['form-text']}>Register</p>
              
                
                <input {...register('email', { required: true })} type="email" placeholder="Email"/>
                {errors.email && <span>❌</span>}
              
             
                
                <input {...register('name', { required: true })} type="text" placeholder="Name"/>
                {errors.name && <span>❌</span>}
             
              
                <input
                  {...register('password', { required: true, minLength: 7 })}
                  type="password" placeholder="Password"
                />
                {errors.password && <span>❌</span>}
              
        
              <button type="submit">Sign Up</button>
            </form>
          </div>
            
          );
        };
        
 



export default RegisterPage;