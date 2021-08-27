import React, { useEffect, useState } from 'react'
// import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Web3 from 'web3'
import { buy, sold } from '../utils/api';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

const Cards = ({ list,i }) => {
    // const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const [Sold, setSold] = useState()

    const classes = useStyles();

    const isSold = async () => {
      const resp = await sold(list.tokenId)
      console.log("is on sale : ", resp)
      setSold(resp);
    }

    useEffect(() => {
      isSold()
      window.web3 = new Web3(window.ethereum)
    }, [])

    return (
        <>
        <Grid>
          <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="" className={classes.avatar}>
                 {i}
              </Avatar>
            }
            title={list.name}
            subheader={list.created_At}
          />
          <CardMedia
            className={classes.media}
            image={`https://${list.image.split("/")[2]}.ipfs.dweb.link/${list.image.split("/")[3]}`}
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
             Category: {list.category ? list.category: "Not Available"}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {list.price ? new Web3(window.ethereum).utils.fromWei(list.price.toString(), 'ether') : "Not Available"} MATIC
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Owner Address: {list.ownerAddress ? list.ownerAddress : "Not Available"}
            </Typography>
          </CardContent>
          {/* <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              End Date: {list.end_date ? list.end_date : "Not Available"}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              City: {list.city ? list.city : "Not Available"}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Country: {events.country ? events.country : "Not Available"}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Venue: {events.venue ? events.venue : "To Be Determined"}
            </Typography>
          </CardContent> */}
          <CardContent>
            {
              Sold !== undefined && Sold ?
              <Typography className="text-center">
                <div className="btn-danger">Sold !</div>
              </Typography>:
              <Typography className="text-center">
                <div className="btn-primary" onClick={() => {buy(list.tokenId)}}>Buy</div>
              </Typography>
            }
          </CardContent>
        </Card>
        </Grid>
        </>
      );
}

export default Cards;