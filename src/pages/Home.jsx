import React from "react";
import { Link } from "react-router-dom";

const Home = ({ data, remove }) => {
  return (
    <>
      <h1>Hello Admin</h1>
      <Link to="/admin/product-add" className="btn btn-success">
        Add new product
      </Link>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                {p.thumbnail ? (
                  <img src={p.thumbnail} alt={p.title} />
                ) : (
                  "Updating"
                )}
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => remove(p.id)}>
                  Remove
                </button>
                <Link
                  to={`/admin/product-edit/${p.id}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
