import React, {useEffect, useState} from 'react'
import {listTokens} from '../utils/api'

function Home() {

    const [list, setList] =  useState([])

    useEffect(() => {
       listTokens()
       .then((data) => {
           setList(data)
       })
       .catch((error) => {
           console.log(error)
       })
    },[])

    return (
        <div>
            <h1 className="text-center">Home</h1>
        </div>
    )
}

export default Home
