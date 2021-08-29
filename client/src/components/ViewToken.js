import React, {useEffect, useState} from 'react'
import { listToken } from '../utils/api'
import TokenCard from './TokenCard'
import { Grid } from '@material-ui/core'

function ViewToken(props) {

    const [ticket, setTicket] = useState([])

    const tokenData = (tokenId) => {
        listToken(tokenId)
        .then((data) => {
          setTicket(data)
        })
    }

    useEffect(() => {
      let tokenId = props.match.params.id
      tokenData(tokenId)
      console.log(ticket)
    }, [props])

    return (
        <div className="container mt-5">
             <Grid container spacing={2} style={{gap: '20px', justifyContent: 'center'}}>
                {
                        ticket && ticket.map((ticket, i) => {
                            console.log(ticket)
                            return(
                                <TokenCard ticket={ticket} i={i} />
                            ) 
                        })
                    }
                </Grid>
        </div>
    )
}

export default ViewToken
