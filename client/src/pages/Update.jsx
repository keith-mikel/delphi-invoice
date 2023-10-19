import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PRODUCTS } from '../utils/queries';
import { UPDATE_PRODUCT_PRICE } from '../utils/mutations';

const ProductPriceForm = () => {
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const [updateProductPrice] = useMutation(UPDATE_PRODUCT_PRICE, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  useEffect(() => {
    if (data && data.products && data.products.length > 0) {
      setProductId(data.products[0].id);
      setNewPrice(''); // Remove the default price
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProductPrice({ variables: { id: productId, newPrice: parseFloat(newPrice) } });
      console.log('Update response:', response);
      alert('Price Updated');
      // Handle success or any further action here
    } catch (err) {
      console.error('Update error:', err);
      // Handle error state here
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="box">
        <div className="field">
          <label className="label">Product:</label>
          <div className="control">
            <div className="select">
              <select value={productId} onChange={(e) => setProductId(e.target.value)}>
                {data.products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - ${product.price}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">New Price:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="New Price"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">
              Update Price
            </button>
          </div>
          <div className="control">
            <Link to="/profile" className="button is-info">
              Return to Profile
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductPriceForm;
