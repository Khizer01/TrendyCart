import React, { useRef } from 'react';
import './search.css';

export default function SearchBox() {
    const searchTerm = useRef("");
    const search = () => {
        console.log(searchTerm.current.value);
    }

    return (
        <div className="searchBox">
    <input type="text" placeholder="Search..."/>
    <button onClick={search} className='btn'>
       <i className='fa-solid fa-search'></i>
    </button>
</div>

    );
}
