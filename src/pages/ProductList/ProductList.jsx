import './productList.css';
import { Products, NewsLetter} from '../../components/export';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductList() {
  const location = useLocation();

  useEffect(()=> {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },[location]);

  const cat = location.pathname.split('/')[2];
  const [filter, setFilter] = useState({
    color: '',
    size: '',
    sort: 'newest'
  });

  const filterHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilter({...filter, [name]: value});
  }

  const resetFilters = () => {
    setFilter({
      color: '',
      size: '',
      sort: 'newest'
    });
  }
 
  return (
    <div className='productList-container'>
      <h1 className="title">{cat?.toUpperCase()}</h1>
      <div className="filter-container">
        <div className="filter">
          <div className="f-text">Filter Products:</div>
          <select name="color" onChange={filterHandler} value={filter.color}>
            <option value="" disabled>Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
          </select>
          <select name='size' onChange={filterHandler} value={filter.size}>
            <option disabled value=''>Size</option>
            <option value='XS'>XS</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
          </select>
        </div>
        <div className="filter">
          <div className="f-text">Sort Products:</div>
          <select name="sort" onChange={filterHandler} value={filter.sort}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <div className="reset-filter">
        <p onClick={resetFilters}>Reset Filters</p>
      </div>
      <Products cat={cat} filters={filter} />
      <NewsLetter />
    </div>
  );
}
