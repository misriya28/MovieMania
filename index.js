let movies = [ 

];






// localstorage logic

if(localStorage.getItem("movies")!==null){
  movies=JSON.parse(localStorage.getItem("movies"))
}
else{
  localStorage.setItem("movies",JSON.stringify(movies))
}

// pagination

let totalpages=Math.ceil(movies.length/10)
let start=0;
let end=10;
let currentPage=1
let paginate=movies.slice(start,end)
document.getElementById("numberOfpages").innerText=totalpages


function navTopage(pages){
  if(pages!=="" && pages<=totalpages && pages>=1){
    currentPage=pages
    start=(currentPage-1)*10
    end=currentPage*10
    paginate=movies.slice(start,end)
    displayMovies(paginate)
    document.getElementById("pageNum").innerText=currentPage

  }

}

function openPages(){
  for(let i=1; i<=4; i++){
    let link=document.createElement("a")
  link.innerText=i
  link.onclick=navTopage.bind(this,i)
  document.getElementById("changePages").appendChild(link)

  }
  
}

openPages()


// displaying and create all movies details


function displayMovies(movieArr){
  document.getElementById("body").innerHTML=""
    movieArr.forEach((movie,index)=>{
     let row=document.createElement("tr")
  

     let num=document.createElement("td")
     num.innerText=start+index+1

     let title=document.createElement("td")
     title.innerText=movie.title

     let rDate=document.createElement("td")
     rDate.innerText=movie.releaseDate

     let genres=document.createElement("td")
    movie.genres.forEach((genre)=>{
    genres.append(genre," . ")
    })

    let duration=document.createElement("td")
    duration.innerText=movie.duration


    let imbd=document.createElement("td")
    imbd.innerText=movie. imdbRating

    let action=document.createElement("td")

    let view=document.createElement("i")
    view.classList.add("fa-solid")
    view.classList.add("fa-eye")
    

    // using bind.(use bind when you have a args)
    view.onclick=viewIcon.bind(this,movie.id)



    let edit=document.createElement("i")
    edit.classList.add("fa-solid")
    edit.classList.add("fa-pen-to-square")
    edit.onclick=setUpdate.bind(this,movie.id)

    let trash=document.createElement("i")
    trash.classList.add("fa-solid")
    trash.classList.add("fa-trash")
    trash.onclick=deleteMovie.bind(this,movie.id)



    action.append(view,edit,trash)

 row.append(num,title,rDate,genres,duration,imbd,action)

document.getElementById("body").appendChild(row)

    })
}


// first function call for  displaying data
displayMovies(paginate)



// working on read  (view icon) to read a single movie details
function viewIcon(movieId){

let movie=movies.find((movie,ind)=>{
  return movie.id===movieId
})
  
document.getElementById("title").innerText=movie.title
document.getElementById("poster_url").src=movie. posterurl
document.getElementById("genre").innerText=movie.genres
document.getElementById("story").innerText=movie.storyline
document.getElementById("a_name").innerText=movie.actors
document.getElementById("runtime").innerText=movie.duration
document.getElementById("r_date").innerText=movie.releaseDate
document.getElementById("imbd").innerText=movie.imdbRating
let sum=0;
for(let i=0; i<movie.ratings.length; i++ ){
    sum=sum+movie.ratings[i]
  

}

document.getElementById("avg").innerText=Math.round(sum/movie.ratings.length)

document.getElementById("popup").style.display="flex"
}




// setupdate
let updateToMovie=null
function setUpdate(id){
  updateToMovie=movies.find((movie,ind)=>{
    return movie.id===id
  })
document.getElementById("update_title").value=updateToMovie.title
document.getElementById("update_genres").value=updateToMovie.genres
document.getElementById("update_duration").value=updateToMovie.duration
document.getElementById("update_date").value=updateToMovie.releaseDate
document.getElementById("update_actors").value=updateToMovie.actors
document.getElementById("update_imbd").value=updateToMovie.imdbRating
document.getElementById("update_url").value=updateToMovie.posterurl
document.getElementById("update_storyline").value=updateToMovie.storyline


  
  document.getElementById("update_movie").style.display="flex"
}




// update

function updateMovie(){

 updateToMovie.title=document.getElementById("update_title").value
 updateToMovie.genres=document.getElementById("update_genres").value.split(",")
 updateToMovie.duration=document.getElementById("update_duration").value
 updateToMovie. releaseDate=document.getElementById("update_date").value
 updateToMovie.actors=document.getElementById("update_actors").value.split(" ,")
 updateToMovie.imdbRating=document.getElementById("update_imbd").value
 updateToMovie.posterurl=document.getElementById("update_url").value
 updateToMovie.storyline=document.getElementById("update_storyline").value
  localStorage.setItem("movies",JSON.stringify(movies))
 displayMovies(movies)
 closeIcon("update_movie")

}



// deleteMovie

function deleteMovie(id){
 let confirmation=confirm("Are you sure") 
 if(confirmation===true){
  let movie=movies.findIndex((movie,index)=>{
    return movie.id===id
    })
    movies.splice(movie,1)
    localStorage.setItem("movies",JSON.stringify(movies))
    displayMovies(movies)

 }


}



// add movie

function openAddMovie(){
    document.getElementById("add_movie").style.display="flex"
}

function createMovie(){
let lastid;
if(movies.length!==0){
  lastid=movies[movies.length-1].id
}
else{
  lastid=0
}
  let movie={
    ratings:[],
    id:lastid+1
  }

  movie.title=document.getElementById("add_title").value
  movie.genres=document.getElementById("add_genres").value.split(",")
  movie.duration=document.getElementById("add_duration").value
  movie. releaseDate=document.getElementById("add_date").value
  movie.actors=document.getElementById("add_actors").value.split(" ,")
  movie.imdbRating=document.getElementById("add_imbd").value
  movie.posterurl=document.getElementById("add_url").value
  movie.storyline=document.getElementById("add_storyline").value
  movies.push(movie)
  localStorage.setItem("movies",JSON.stringify(movies))
 displayMovies(movies)
 closeIcon("add_movie")
//  document.getElementById("frms").reset()
   document.getElementById("add_date").type="text"

}


// convering text to date
function converTodate(){
  document.getElementById("add_date").type="date"
}



// working on close button
function closeIcon(closebtn){
  document.getElementById(closebtn).style.display="none"
}



function nextPage(){
  if(currentPage<totalpages){
    currentPage++
    start+=10
    end+=10
    paginate=movies.slice(start,end)
    displayMovies(paginate)
    document.getElementById("pageNum").innerText=currentPage
  }
 
}

function prevPage(){
  if(currentPage>1){
    currentPage--
  start-=10
  end-=10
  paginate=movies.slice(start,end)
  displayMovies(paginate)
  document.getElementById("pageNum").innerText=currentPage
  }
  
}




