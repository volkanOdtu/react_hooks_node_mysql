import './App.css';
import React ,{useState ,useEffect} from 'react';
import Axios from 'axios';



function App() {

  const [movieName ,setMovieName] = useState('');
  const [review ,setReview] = useState('');
  //Burda array olmasi [] kullandik yoksa map i kullanamayiroz
  const [movieReviewList ,setMovieList] = useState([]);

  const [newReview ,setNewReview] = useState('');

  //useEffect direkt cagriliyomus ,biz cagirmadan
  useEffect(() => {
    Axios.get('http://localhost:3001/api/movies').then( (response) =>{
       //console.log(response);})
       setMovieList(response.data);
  })} ,[]);

  //Burda .then promise oluyo ,insert olduysa alert vericez
  const submitReview = () =>{
    //console.log('submit deyiz');
    
    Axios.post('http://localhost:3001/api/movie' ,{
      movieName: movieName ,
      movieReview: review 
    });

    //Server a gonderdikten ve db ye kaydolduktan sonra Frontend de de gorulmesi icin variablei update ediyoruz 
    setMovieList([
      ...movieReviewList,
      {movieName :movieName ,movieReview:review}
    ]);

  };

  const deleteReview = (mvName) =>{
    Axios.delete(`http://localhost:3001/api/movie/${mvName}`);
  }
  
  const updateReview = (mvName) =>{    
    Axios.put("http://localhost:3001/api/movie/" ,{
      movieName: mvName ,
      movieReview: newReview 
    });

    //movieReview u silelim ki onceki review kalmasi state de
    setNewReview('');
  }

  return (
    <div className="App"><h1>CRUD applications</h1>
    
      <div className ="form">
        <label>Movie Name:</label>
        <input type = "text" name = "movieName" onChange= {(e) =>{
          setMovieName(e.target.value)
        }}/>
        <label>Review:</label>      
        <input type = "text" name = "review" onChange= {(e) =>{
          setReview(e.target.value)
        }}/>
      
    
    <button onClick = {submitReview}>Submit</button>

      {movieReviewList.map( val => { 
          return (<div className="card">
                    <h1> {val.movieName} </h1>
                    <p>{val.movieReview}  </p>
                      
                    <button onClick = {() =>deleteReview(val.movieName)} >Delete</button>
                    
                    <input type="text" id ="updateInput" onChange = {(e) =>{
                      setNewReview(e.target.value)
                    }} />
                    
                    <button onClick= {() =>{ updateReview(val.movieName)}}>Update</button>
                </div>);
               })}   
      </div>
    </div>
    
  )
}

export default App;
