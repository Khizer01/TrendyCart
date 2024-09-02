import { Link } from 'react-router-dom';
import './productItem.css';

export default function ProductItem({ item }) {
  return (
    <div className='product'>
        <div className="image">
        <img src={item.image} alt={item.title} />
        </div>
        <div className="info">
          <h3>{item.title}</h3>
          <p className="price">$ {item.price}</p>
          <Link to={`/product/${item._id}`} className='button'> Shop Now</Link>
        </div>
    </div>
  );
}

