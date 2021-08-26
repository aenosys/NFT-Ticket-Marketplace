import React, {useState} from 'react'
import axios from 'axios'

function Category() {

    const [category, setCategory] = useState("")

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
          axios.post('http://localhost:8080/api/category/create', category)
          console.log(category)
          .then((response) => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label className="form-label">Add Category</label>
            <input type="text" onChange={handleChange} className="form-control" placeholder="Add Category"/>
        </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
       </div>
    )
}

export default Category