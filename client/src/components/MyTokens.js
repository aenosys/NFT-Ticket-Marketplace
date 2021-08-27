import React, {useState, useEffect} from 'react'
import {listMyToken} from '../utils/api'
import Cards from './Cards'
import { Grid } from '@material-ui/core'


export default function MyTokens() {
    const [list, setList] =  useState([])

    const getList = async () => {
        const resp = await listMyToken()
        console.log("the data is :", resp)
        setList([...resp])
    }

    useEffect(() => {
        getList()
    }, [])

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

    return (
        <div style={{height: 'calc(100% - 80px)'}}>
            <h1 className="text-center" style={{color: 'white'}}>My Tokens</h1>
            <Grid container spacing={2} style={{gap: '20px', justifyContent: 'center'}} >
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
            </Grid>
        </div>
    )
}
