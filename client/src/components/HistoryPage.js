import React, { Fragment, useState, useEffect } from "react";

const HistoryPage = (props) => {
  const [products, setProducts] = useState([]);

  
  function viewProduct(id) {
    props.goToDetailPage(id);
  }

  async function getProducts() {
    const res = await fetch("/api/fabelio");

    const dataProducts = await res.json();

    setProducts(dataProducts.products);
  }


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <table class="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => viewProduct(product.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default HistoryPage;
