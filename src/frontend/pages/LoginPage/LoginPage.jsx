import React from "react";
import style from './LoginPage.module.css'
import { useDispatch } from "react-redux";
import { loginThunk } from "./authReducer";
import { useForm } from "react-hook-form";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    const dispatch = useDispatch();

    const onSubmit = data => {
      dispatch(loginThunk(data))
      reset();
    };

    return (
      <div className={style['container']}>
        <form className={style['form']} onSubmit={handleSubmit(onSubmit)}>
          <p className={style['form-text']}>Welcome</p>
          
          
            <input {...register('email', { required: true })} type="email" placeholder="Email" />
            {errors.email && <span>❌</span>}
          
            
            <input
              {...register('password', { required: true, minLength: 7 })}
              type="password" placeholder="Password"
            />
            {errors.password && <span>❌</span>}
          
    
          <button type="submit">Sign In</button>
        </form>
      </div>
        
      );
}

export default LoginPage;