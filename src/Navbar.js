import React from 'react'
//import {Users} from './users'
import {useState, useEffect} from 'react'
import Login from './Login';
import Pagination from './Pagination'


export default function Navbar
(props) {
const [query, setQuery] = useState("");
const [data, setData] = useState([])
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(10);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNumber => setCurrentPage(pageNumber);

const getApi= ()=>{
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => {console.log(json)
  setData(json)});
  
}
useEffect(()=>{
  getApi();
})

  return (
    <div className='container'>
    <nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{props.name}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">My Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://archive.org/">Archive</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Browse
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Subjects</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Trending</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Library Explorer</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Lists</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Collections</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">K-12 Student Library</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Random Book</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Advanced Search</a></li>

          </ul>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" onChange={e=>setQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
      </form>
      <button type="button" className="btn btn-primary mx-2">Log In</button>
      <button type="button" className="btn btn-primary">Sign Up</button>
    </div>
  </div>
</nav>
<div className='container my-2'>
  <ul className='list'>
    {currentPosts.filter((item)=> item.title.toLowerCase().includes(query)||item.body.toLowerCase().includes(query)).map(item=>
      <li className='mb-4'><b>{item.id}</b>. {item.title} <br/> <b>Body</b>: {item.body}</li>
    )}
  </ul>
 </div>
 <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
</div> 
  )
}
