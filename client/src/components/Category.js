import React, {useState} from 'react'

function Category() {

    const [category, setCategory] = useState("")

    const handleChange = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
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