const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'password',
    database:'CRUDDatabase'
});

app.use(bodyParser.urlencoded({extended :true }));
app.use(cors());
app.use(express.json());

app.get('/api/movies' ,(req ,res) =>{
   
    const sqlSelect= "SELECT * FROM movie_reviews";
    db.query(sqlSelect ,(err ,result) =>{

        console.log(result);
        res.send(result);
    })
});

app.post('/api/movie' ,(req ,res) =>{

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    
    const sqlInsert = "INSERT INTO movie_reviews(movieName ,movieReview) VALUES (?,?)";
    db.query(sqlInsert,[movieName ,movieReview] ,(err ,result) =>{
        console.log(movieName);
        console.log(movieReview);
        
        if(err)
            console.log(err);

        console.log(result);
    })
});

app.delete('/api/movie/:movieName' ,(req,res) =>{
    //const name = req.body.movieName;
    const name = req.params.movieName;
    
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    
    db.query(sqlDelete ,name ,(err ,result ) => {
        if(err) 
            console.log(err);       
    } )
} );

app.put("/api/movie" ,(req ,res) => {
    const name= req.body.movieName;
    const review = req.body.movieReview;
    console.log(name);
    console.log(review);
    
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
    
    db.query(sqlUpdate ,[review ,name] ,(err ,result ) => {
        if(err) 
            console.log(err);       
    } );
    
});

app.listen(3001, () =>{
    console.log("server running on port 3001");
});

