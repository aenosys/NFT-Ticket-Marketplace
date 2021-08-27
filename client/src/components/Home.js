import { Grid } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import {listTokens} from '../utils/api'
import Cards from './Cards'

function Home() {

    const [list, setList] =  useState([])

    const getList = async () => {
        const resp = await listTokens()
        console.log("the data is :", resp)
        setList([...resp])
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
    }, [])

    return (
        <div style={{height: 'calc(100% - 80px)'}}>
            <h1 className="text-center" style={{color: 'white'}}>Home</h1>
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
