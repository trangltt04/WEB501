import React from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import api from "../axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const AuthForm = ({ isRegister }) => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        const result = await api.post("/register", data);
        localStorage.setItem("user", JSON.stringify(result.data));
        if (confirm("Successfully, redirect to login page?")) {
          nav("/login");
        }
      } else {
        await api.post("/login", data);
        if (confirm("Successfully, redirect to home page?")) {
          nav("/");
        }
      }
    } catch (error) {
      alert(error.response.data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
