const express = require('express');
const data = require('./data/db');
const server = express();
server.use(express.json());
const port = 5000;

// Nothing fancy, an initialization of the server at /
server.get('/', (req,res)=>{
    res.send('<img src="https://media.giphy.com/media/2MMB4JT8lokbS/giphy.gif" alt="it is alive"/>')
})

//Setting up the POST for users
server.post('/api/posts', (req,res)=>{
    const {title, contents} = req.body;
    if (title && contents){
    data.insert(req.body)
    .then(user=>
        {console.log(user);
        res.status(201).json(user)
        })
        .catch(err=>
            {console.log('err', err)
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }else {
        res.status(400).json({errorMessage: "Please provide contents and title for this page"})
    }
})

// Fetching the database of posts with a /GET
server.get('/api/posts', (req, res)=>{
    data.find()
    .then(user => {
        res.status(200).json(user)
    })
})





server.listen(port, ()=> console.log(`Server listening on ${port}`));