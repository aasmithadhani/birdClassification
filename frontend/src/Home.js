import React, { useRef, useState } from 'react'
import './Home.css'
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import axios from 'axios'


const Home = () => {

    const domainFileRef = useRef(null);
    const [data,setData] = useState([])

    const getData = () =>
    {
        if(domainFileRef !== null){
            console.log(domainFileRef?.current?.files?.[0]);
          
            const formData = new FormData();
            if (domainFileRef?.current?.files?.[0]) {
                formData.append("image", domainFileRef.current.files[0]);
            }
            
            axios.post(
                'http://localhost:5000/process_image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
                .then((res) => {
                    console.log("response Domain Post Bar Chart", res.data);
                    setData(res.data.result);
                })
                .catch((err) => {
                    console.log(err);
                })
        }   
    }

  return (
    <Box>
    <Typography>HIIII</Typography>
    <Box className='main' >
        <Typography variant='h3' className='title'> Bird Classification</Typography>
        {/* <br/> */}
        <hr style={{width:'80%'}}/>
        <Box sx={{paddingLeft:10, paddingRight:10,paddingTop:10}}>
        <Typography sx={{
            color:'white'
        }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        </Box>

        <a href="#section"><Button className = 'button'>Get Started </Button></a>
    </Box>
    <Box sx={{height:'100vh', padding:10 }} id='section'>
        <Typography variant='h4' sx={{ color:'#295191'}}>Upload an Image</Typography>
        
        <input type='file' ref={domainFileRef}></input>
        <Button className = 'button' onClick={getData}>Submit </Button>

        <Typography>{data}</Typography>

    </Box>
    </Box>
    
  )
}

export default Home
