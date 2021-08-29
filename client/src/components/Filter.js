import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Checkbox from './Checkbox';
import {getFilteredTickets} from '../utils/api'

function Filter() {

   
    const [categories, setCategories] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const getCategories = async () => {
        const resp = await axios.get("http://localhost:8080/api/categories/")
        console.log("the categories are :", resp.data)
        setCategories(resp.data);
    }


    useEffect(() => {
      getCategories()
    },[])


    return (
        <div className="container mt-4">
            <h1 className="text-center text-light">Filter</h1>
            <p className="text-center text-light">*Filter Through Different tickets*</p>
            <hr className="text-white"/>
            <br/>
            <div className="row">
                <div className="col-4">
                    <h4 className="text-white">Filter by categories</h4>
                    <ul>
                        <Checkbox
                         categories={categories}
                        />
                    </ul>
                </div>

                <div className="col-8">
                    <h3 className="text-white text-center">Tickets</h3>
                </div>
                </div>   
        </div>
    )
}

export default Filter
