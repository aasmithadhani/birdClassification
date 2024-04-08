import React, { useRef, useState } from 'react'
import './Home.css'
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import axios from 'axios'
import x from './graph.jpg'
import Grid from '@mui/material/Grid';


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
    <Box className='main' >
        <Typography variant='h3' className='title'> Bird Classification</Typography>
        {/* <br/> */}
        <hr style={{width:'80%'}}/>
        <Box sx={{paddingLeft:10, paddingRight:10,paddingTop:5}}>
        <Grid container>
            <Grid item xs={12} sm={12} lg={8} md={6}>
               
                <Typography sx={{
                color:'white',
                fontSize:'15px'
            }}>This bird image classifier is trained on a open-source dataset containing over 11000 images of 200 different breeds. The dataset is loaded using datasets.ImageFolder from torchvision. This class expects data to be arranged in folders where each folder represents a class, which aligns with the Kaggle 200 bird breeds dataset structure. 
                    <br/>
            <br/>
            Training Data: Various data augmentation techniques are applied during training, including random horizontal and vertical flips (RandomHorizontalFlip and RandomVerticalFlip), and random color jitter (ColorJitter). These augmentations help the model generalize better by providing variations of the training images.
          
            Validation/Test Data: No data augmentation is applied to the validation and test sets, ensuring that evaluation is performed on unaltered images. 
            <br/>
            <br/>
            We utilize EfficientNet-B0, a pre-trained convolutional neural network architecture known for its efficiency and performance. The final fully connected layers (classifier) of the pre-trained model are modified to suit the number of output classes in the dataset.
            The original classifier is replaced with a new one comprising a linear layer followed by a SiLU activation function (nn.SiLU()) and dropout (nn.Dropout()).
            The number of input features for the linear layer is adjusted to match the output size of the previous classifier layer. Cross-entropy loss with label smoothing (nn.CrossEntropyLoss) is used as the loss function.
            Label smoothing helps prevent overconfidence of the model by smoothing the target distributions. The AdamW optimizer (optim.AdamW) is used for parameter optimization.
            Learning rate scheduling is applied using torch.optim.lr_scheduler.StepLR. The learning rate is decayed by a factor of 0.96 every 4 epochs.
            accuracy achieved is 90.5%
            </Typography>
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <a href="#section"><Button className = 'button'>Get Started </Button></a>
                    </Box>
            
            </Grid>
            <Grid item xs={12} sm={12} lg={4} md={6}>
                <img src={x} alt='image' style={{ width: '100%', height: 'auto' }}/>
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
        </Grid>
        
        </Box>

        
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
