import { Link } from 'react-router-dom';
import './categoryItem.css';

export default function CategoryItem({item}) {
  return (
    <Link className="categoryitem" to={`/products/${item.cat}`} >
      <div className="image"> <img src={item.img} alt={item.title} /></div> 
      <div className="info"><h1 className="title">{item.title}</h1>
      <button>SHOP NOW</button>
      </div>
    </Link>
  )
}
