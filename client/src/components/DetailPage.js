import React, { useState, useEffect } from "react";
const DetailPage = (prop) => {
  
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/fabelio/${prop.productId}`);
        const productDetail = await res.json();
        setProduct(productDetail.product);
        setLoading(false);
      } catch(err) {
        setLoading(false);
        console.error(err.message);
      }
    }
    getProduct();
  }, [prop]);
  return (
    <div className="jumbotron">
      <div className={loading ? 'spinner-border text-primary' : 'invisible'} role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <h1 className="display-4">{product.name}</h1>
      <p className="lead">{product.price}</p>
      <a href={product.link} alt="">Go to Fabelio page</a>
      <hr className="my-4"/>
      <img src={product.image} style={{maxWidth: "70%"}} alt="" />
      <p>{product.details}</p>
    </div>
  )
}

export default DetailPage;
