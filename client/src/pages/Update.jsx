import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PRODUCTS} from '../utils/queries'; // Path to your queries and mutations
import {  UPDATE_PRODUCT_PRICE } from '../utils/mutations'

const ProductPriceForm = () => {
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  const [updateProductPrice] = useMutation(UPDATE_PRODUCT_PRICE, {
    refetchQueries: [{query: GET_PRODUCTS}],
  });

  useEffect(() => {
    if (data && data.products && data.products.length > 0) {
      setProductId(data.products[0].id); // Set the first product as the default selected value
      setNewPrice('New Price'); // Set the default price as the initial value
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProductPrice({ variables: { id: productId, newPrice: parseFloat(newPrice) } });
      console.log('Update response:', response);
      alert('Price Updated')
      // Handle success or any further action here
    } catch (err) {
      console.error('Update error:', err);
      // Handle error state here
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <form onSubmit={handleFormSubmit}>
      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        {data.products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} - ${product.price}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Price"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
      />
      <button type="submit">Update Price</button>
    </form>
    <Link to="/profile">
     <button>Return to Profile</button>
     </Link>
    </div>
  );
};

export default ProductPriceForm;
