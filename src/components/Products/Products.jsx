import './products.css';
import ProductItem from './productItem/ProductItem.jsx';
import { useEffect, useState } from 'react';
import { publicRequest } from '../../Api Requests/requestMethods.js';

export default function Products({ cat, filters = {}, limit }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get('/product/allProduct' + (cat ? '?category=' + cat : ''));
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getProducts();
  }, [cat]);

  useEffect(() => {
    const filteredProduct = products.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {

        if (!value || key === 'sort') return true;

        if (key === 'color' || key === 'size') {

          return item[key]?.includes(value);
        }
        return false;
      });
    });

    if (filters.sort === 'asc') {
      filteredProduct.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'desc') {
      filteredProduct.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filteredProduct);
  }, [products, cat, filters]);

  const displayProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

  return (
    <div className='products-container'>
      {Loading ? (
        <div className="loader">
          <div className="justify-content-center jimu-primary-loading"></div>
        </div>
      ) :
    !Loading && displayProducts.length === 0 ? <div className="error"><h1>No Product Found <i className="fa-solid fa-shirt"></i></h1></div> :
       cat ? displayProducts.map(item => (
          <ProductItem item={item} key={item._id} />)) :
          products.slice(0,8).map(item => (
            <ProductItem item={item} key={item._id} />))
      }
    </div>
  );
}
