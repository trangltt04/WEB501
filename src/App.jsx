import React, { useEffect, useState } from "react";
import "./App.scss";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthForm from "./pages/AuthForm";
import ProductForm from "./pages/ProductForm";
import api from "./axios/index";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
      setProducts(data);
    })();
  }, []);

  const remove = async (id) => {
    if (confirm("Are you sure?")) {
      await api.delete(`/products/${id}`);
      const newData = products.filter((item) => item.id !== id && item);
      setProducts(newData);
    }
  };

  const handleProduct = async (data) => {
    if (data.id) {
      await api.patch(`/products/${data.id}`, data);
      const newData = await api.get("/products");
      setProducts(newData.data);
    } else {
      const res = await api.post("/products", data);
      setProducts([...products, res.data]);
    }
    if (confirm("Successfully, redirect to home page?")) {
      nav("/");
    }
  };

  const logout = () => {
    if (confirm("Are you sure?")) {
      localStorage.removeItem("user");
      nav("/login");
    }
  };
  return (
    <>
      <header>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            {user ? (
              <li>
                <button className="btn btn-danger" onClick={logout}>
                  Hello {user?.user?.email} -Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route
              path="/admin"
              element={<Home data={products} remove={remove} />}
            />
            <Route
              path="/admin/product-add"
              element={<ProductForm handleProduct={handleProduct} />}
            />
            <Route
              path="/admin/product-edit/:id"
              element={<ProductForm handleProduct={handleProduct} />}
            />
          </Route>

          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/login" element={<AuthForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
