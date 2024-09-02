import './categories.css'
import categories from '../../store/categories/category.js';
import CategoryItem from './CategoryItem/CategoryItem';
export default function Categories() {
  return (
    <div className='categories-container'>
      {
        categories.map(item => ( <CategoryItem item={item} key={item.id} /> ))
      }
    </div>
  )
}
