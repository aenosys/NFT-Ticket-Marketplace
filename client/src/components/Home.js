import { Grid } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {listTokens} from '../utils/api'
import Cards from './Cards'
import axios from 'axios'

function Home() {

    const [list, setList] =  useState([])
    const [presentCategories, setPresentCategories] = useState([]);

    const getList = async () => {
        const resp = await listTokens()
        console.log("the data is :", resp)
        setList([...resp])
    }

    const getCategories = async () => {
        const resp = await axios.get("http://localhost:8080/api/categories/")
        console.log("the categories are :", resp.data)
        setPresentCategories([...resp.data])
    }


    const isLoading = () => {
        return (
            <div class="spinner" style={{height: '100%'}}>
                <div class="d-flex justify-content-center">
                  <div class="spinner-border text-light" role="status">
                  </div>
                </div> 
            </div>        
        )
    }

    useEffect(() => {
        getList()
        getCategories()
    }, [])

    const refresh = async(category) => {
        if(category === "All"){
          getList()
        } else {
        const resp = await axios.get(`http://localhost:8080/api/related/${category}`)
        setList([...resp.data])
        }
    }

    return (
        <div className="container" style={{height: 'calc(100% - 80px)'}}>
            <h1 className="text-center mt-4" style={{color: 'white'}}>Tickets</h1>
            <hr className="bg-light"/>
            <br/>
            <div className="token-info-input">
                    <label className="text-white">Sort through Categories</label>
                    <br/>
                    <select required style={{marginTop: '20px', marginBottom:"20px"}} onChange={(e) => {refresh(e.target.value)}}>
                        {
                            presentCategories.length > 0 && presentCategories.map((categ) => {
                                return(
                                    <option value={categ.name}>{categ.name}</option>
                                )
                            })
                        }
                        <option value="All">All</option>
                     </select>
                </div>
                <br/>
            {
                list.length === 0 ?
                isLoading():
                <Grid container spacing={2} style={{gap: '20px', justifyContent: 'center'}} >
                    {
                        list && list.map((list, i) => {
                            return(
                                <Cards list={list} i={i} />
                            ) 
                        })
                    }
                </Grid>
            }
        </div>
    )
}

export default Home
