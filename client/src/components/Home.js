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

    useEffect(() => {
        getList()
    }, [])

    return (
        <div>
            <h1 className="text-center" style={{color: 'white'}}>Home</h1>
            <Grid container spacing={2} style={{gap: '20px', justifyContent: 'center'}} >
                {
                    list && list.map((list, i) => {
                        return(
                            <Cards list={list} i={i} />
                        ) 
                    })
                }
            </Grid>
        </div>
    )
}

export default Home
