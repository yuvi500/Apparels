// import {useState} from 'react'
// import {Form,Button} from 'react-bootstrap'
// import { Link,useParams,useNavigate } from "react-router-dom"
// import { withRouter,useNavigate  } from 'react-router-dom'

// const SearchBox = () => {

//   const navigate=useNavigate();

//   const [keyword,setKeyword]=useState('')

//   const submitHandler=(e)=>{
//     e.preventDefault()
//       if(keyword.trim()){
//         navigate(`/search/${keyword}`)
//       }else{
//         navigate('/')
//       }
    
//   }

//   return (
//     <Form onSubmit={submitHandler} className='d-flex'>
//       <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} placeholder="Search Product ..." className="mr-sm-2 ml-sm-5" >
//       </Form.Control>
//       <Button type='submit'  variant='outline-success' className='p-2'>Search</Button>
//     </Form>
//   )
// }

// export default withRouter(SearchBox)















import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = ({ history }) => {
  const navigate=useNavigate()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox