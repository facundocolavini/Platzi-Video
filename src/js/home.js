/* console.log('hola mundo!');
const noCambia = "Leonidas";
 */
//Promesa

/* const getUserAll = new Promise  ((todoBien , todoMal)=>{
  //llamar a una api
  setTimeout(()=>{
    //luego de 3 segundos
    todoBien('se acabo el tiempo')
  },5000)


})
const getUser = new Promise  ((todoBien , todoMal)=>{
  //llamar a una api
  setTimeout(()=>{
    //luego de 3 segundos
    todoBien('se acabo el tiempo 3')
  },3000)

}) */

/* getUser
  .then(()=>{
    console.log('todo esta bien');
  })
  .catch((msg)=>{
    console.log(msg)
  }) */

//Si son varias promesas y quiero que se resuelvan ,el all espera a que terminen todas las promesas
/* Promise.all([
  getUser,
  getUserAll
])
.then((msg)=>{
  console.log(msg)
})
.catch((msg)=>{
  console.log(msg)
}) */

//Promices.race es una carrera de promesas se va  ejecutar tanto then como catch de la promesa que se resuelva primero
/* Promise.race([
  getUser,
  getUserAll
])
.then((msg)=>{
  console.log(msg)
})
.catch((msg)=>{
  console.log(msg)
}) */

//Fin Promesas

//Request Externas con ajax , en jquey y javascript

//con jQuery XMLHttpRequest
//$.ajax('url' , {objeto})
//cuando quiero traer datos o consulto a un servicio externo tengo que poner por que metodo traerlo

/* $.ajax('https://randomuser.me/api/',{
  method:'GET',
  success:(data)=>{console.log(data.results[0].name.last)},
  error:()=>{console.log(error)}
  
})
 */

//Con vanilla js
//Traer datos con fetch 
//fetch('url') devuelve una promesa

/* fetch('https://randomuser.me/api/')
  .then((response)=>{
 
    return response.json() //devuelve una promesa 
  })
  .then((user)=>{
    console.log('user',user.results[0].name.first)
  })
  .catch(()=>{console.log('algo fallo')
});//para finalizar este fetch  */



//Selectores del dom  
//const $home = $('.home .list #item'); jquery
 

const $modal = document.getElementById('modal');
const $modalUser = document.getElementById('modal-user');
const $overlay = document.getElementById('overlay');
const $hideModal = document.getElementById('hide-modal');

const $btnUser = document.createElement('button');//creamos el elemento button
//Busco elementos dentro de mi modal
const $modalTitle = $modal.querySelector('h1');
const $modalImage = $modal.querySelector('img');
const $modalDescription = $modal.querySelector('p');

//Modal User
/* const $modalTitleUser = $modalUser.querySelector('h1'); */
/* const $modalImageUser = $modalUser.querySelector('img');
const $modalDescriptionUser = $modalUser.querySelector('p'); */

//Feature
const $featuring = document.getElementById('featuring');
const $form = document.getElementById('form');
const $home = document.getElementById('home');
//API URL
const URL_USERS ='https://randomuser.me/api/?exc=info,registered,timezone,nat&results=20';
const URL_MOVIES = 'https://yts.mx/api/v2/';

/* function getUser (URL_USER){
  fetch(USERS)
    .then((response)=>{
      const user = response.json()
      return user //devuelve una promesa 
    })
 
    .catch(()=>{console.log('algo fallo')
  });//para finalizar este fetch 
} */

 
 
//Funciones asincronas Request a api (Consumiendo una api)

(async function load(){
  //await
  //3 generos action,terror y animation

  async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
      if(data.data &&data.data.movie_count >0) {
      
        return data
      }else if (data.results){
        return data
      }
      throw new Error("No se encontro ningun dato externo ");
  }
  
/*   async function getUser(url){
    const response = await fetch(url)
    const data = await response.json()
 
    if(data.results){
       //Aca termina
 
      return data;
      
    }else{
     //Sino hay pelis aqui continua 
     throw new Error('No se encontro ningun resultado');
    }
    
  } */

   //otra forma sin el await  te devuelve una promesa tengo que usar el then y catch
/*  let terrorList = getData('https://yts.mx/api/v2/list_movies.json?genre=terror')
  .then((data)=>{
    console.log('terrorList',data);
    terrorList = data;
  }) */

 
//Funciones

//Con vanilla js
function setAttributes($element,attributes){
  //for in para iterar el objeto attributes
  for (const attribute in attributes){//recorro el objeto 
    $element.setAttribute(attribute,attributes[attribute])// agrego los atributos a mi elemento Ej:(atributo,valor) ,settAttributes( attributes == width ,attributes[attribute] ==> attributes[width] = 50)

  } 
}

function createTemplate (HTMLString){
  html = document.implementation.createHTMLDocument();//Crea una estructura HTML nueva
  html.body.innerHTML = HTMLString; //añade al html nuevo los template como parte de html,ya no es texto el template.
  return html.body.children[0]; //returno solamente los hijos de mi body
}

//Listas iteradas de peliculas
function renderMovieList(list,$container,category){
  $container.children[0].remove();//Busco ese elemento y lo borro en el html asi no aparece la img loading
    //actionList.data.movies = list
    /* debugger */
    list.forEach((movie)=>{
    //Va recorrer el array movies elemento por elemento
    const HTMLString = videoItemTemplate(movie,category);//Va ir cambiando las paliculas en el template
    const movieElement = createTemplate(HTMLString);
    $container.append(movieElement) //se suma el html del template al html de mi pagina en la ubicacion de mi contenedor peliculas
    //Vamos a dejar que carguen todas las imagenes y luego hacer las animaciones fadeIn
    const image = movieElement.querySelector('img');
    image.addEventListener('load',(event)=> {
      event.srcElement.classList.add('fadeIn'); //APLICA LA ANIMACION al elemento img del  contenedor de la pelicula
    })
    addEventClick(movieElement)

  })
}

function userRenderMovieList(list,$container,category){
  $container.children[0].remove();//Busco ese elemento y lo borro en el html asi no aparece la img loading
    //actionList.data.movies = list
    /* debugger */
    list.forEach((movie)=>{
    //Va recorrer el array movies elemento por elemento
    const HTMLString = userVideoItemTemplate(movie,category);//Va ir cambiando las paliculas en el template
    const movieElement = createTemplate(HTMLString);
    $container.append(movieElement) //se suma el html del template al html de mi pagina en la ubicacion de mi contenedor peliculas
    //Vamos a dejar que carguen todas las imagenes y luego hacer las animaciones fadeIn
    const image = movieElement.querySelector('img');
    image.addEventListener('load',(event)=> {
      event.srcElement.classList.add('fadeIn'); //APLICA LA ANIMACION al elemento img del  contenedor de la pelicula
    })
    addEventClick(movieElement)

  })
}

function renderMovieListUser(list,$container,category){
  $container.children[0].remove();//Busco ese elemento y lo borro en el html asi no aparece la img loading
    //actionList.data.movies = list
    /* debugger */
    list.forEach((movie)=>{
    //Va recorrer el array movies elemento por elemento
    const HTMLString = userPlayList(movie,category);//Va ir cambiando las paliculas en el template
    const movieElement = createTemplate(HTMLString);
    $container.append(movieElement) //se suma el html del template al html de mi pagina en la ubicacion de mi contenedor peliculas
    //Vamos a dejar que carguen todas las imagenes y luego hacer las animaciones fadeIn
    const image = movieElement.querySelector('img');
    image.addEventListener('load',(event)=> {
      event.srcElement.classList.add('fadeIn'); //APLICA LA ANIMACION al elemento img del  contenedor de la pelicula
    })
    addEventClick(movieElement)

  })
}

//Listas iteradas de usuarios del sidebar
function renderUser(list,$container){
  $container.children[0].remove();//Busco al primer elemento hijo de mi contenedor y lo borro
  //users = list
  list.forEach((users)=>{
  //Va recorrer el array users elemento por elemento
  const HTMLString = userTemplate(users);//Va ir cambiando las paliculas en el template
  const userElement = createTemplate(HTMLString);
  $container.append(userElement) //se suma el html del template al html de mi pagina en la ubicacion de mi contenedor peliculas
  //Vamos a dejar que carguen todas las imagenes y luego hacer las animaciones fadeIn
  const imageUser = userElement.querySelector('img');
  imageUser.addEventListener('load',(event)=> {
    event.srcElement.classList.add('fadeIn'); //APLICA LA ANIMACION al elemento img del  contenedor de la pelicula
  })
  addEventClick(userElement)

})
}

//Datos de la pelicula
//filtrar por categoria
function findById(list,id){
  return list.find(movie => movie.id === parseInt(id,10))//(texto a pasar a entero,base)
}

function findMovie(id,category){
  switch (category){
    case 'action':{
      return findById(actionList,id);
    }
    case 'drama':{
      return findById(dramaList,id);
    }
    default:{
      return findById(animationList,id);
    }
  }
} 

//Id de usuario
function findUserbyId(list,uuid){
   return list.find(user =>user.login.uuid === uuid)
}


//Show modal agrega el overlay
function showModal($element){
 
  if($element.classList[0] === "myPlaylist"){
    $overlay.classList.add('active');
    $modal.style.animation ='modalIn .8s forwards';//puedo poner estilos o animaciones  directamente desde js con elemento.style
  
    //uso una id para buscar la peliculas 
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id,category);
    $modalTitle.textContent =  data.title
    $modalImage.setAttribute('src',data.medium_cover_image);//Agrego el atributo src = data.medium_cover_image al elemento img
    $modalDescription.textContent = data.description_full 
  }else{
  $overlay.classList.add('active');
  $modal.style.animation ='modalIn .8s forwards';//puedo poner estilos o animaciones  directamente desde js con elemento.style

  //uso una id para buscar la peliculas 
  const id = $element.dataset.id;
  const category = $element.dataset.category;
  //Id Usuario
  const uuid = $element.dataset.uuid;//IMPORTANTE la uuid la tomo del  usuario que pulse en la lista de amigos desde el lado de front

  //ponemos los datos de las peliculas en el html
  try{
    const data = findMovie(id,category);
    $modalTitle.textContent =  data.title
    $modalImage.setAttribute('src',data.medium_cover_image);//Agrego el atributo src = data.medium_cover_image al elemento img
    $modalDescription.textContent = data.description_full 
  } 
  catch(err){
    console.log("modal usuario");
    const data =findUserbyId(users,uuid);
    const HTMLString = userDescriptionTemplate(data);
    const elementDescription = createTemplate(HTMLString);
    $modalTitle.textContent =  data.login.username;
    $modalImage.setAttribute('src',data.picture.large);
    $modalDescription.append(elementDescription);
  }
}
}

//Evento para encontrar peliculas con el form
$form.addEventListener('submit', async(event)=>{
 
  event.preventDefault() //sacar la accion de refresco de pagina que viene por defecto con el evento
   //Dinamismo de CSS con javaScript
   $home.classList.add('search-active');
   /* $featuring.style.display="grid"; *///otra forma de hacerlo
   $featuring.classList.add('show');
   const $loader = document.createElement('img');//creamos el elemento img
   setAttributes($loader,{//esta setAttributes le pasamos el elemento y los atributos con sus valores como segundo parametro.
     src:'src/images/loader.gif',
     height: 50,
     width:50 
   })
  $featuring.append($loader); //al div featuring le agrego el elemento img que cree con sus atributos
   //Tomar datos del formulario
  const data =new FormData($form);//se le pasa un elemento html del formulario
    //Desestructurando el objeto peli
  try{
    const {
      data: { //uso llaves para entrar a data otra vez e ir a movies
        movies: pelis
      }
     } = await getData(`${URL_MOVIES}list_movies.json?limit=1&query_term=${data.get('name')}`) //obtenemos el valor del atributo name del form con data.get(atributo)
     const HTMLString = featuringTemplate(pelis[0]); //Template en string
     $featuring.innerHTML = HTMLString;//piso el html del elemento img de
  }catch(error){//Si no encuentra ninguna pelicula arrojara error
    alert(error.message)
    $loader.remove()
    $home.classList.remove('search-active')
  }

 })
 
//Click
function addEventClick ($element){
  $element.addEventListener('click',()=>{
    showModal($element);
  })
}


//Ocultar el modal
function hideModal(){
$overlay.classList.remove('active');
$modal.style.animation ='modalOut .1s forwards'
$modalDescription.textContent = '';
}
$hideModal.addEventListener('click', hideModal);
 




//Templates para el dinamismo 

//Con jQuery es asi
/* 
'<div class="primaryPlaylistItem">' +
  '<div class="primaryPlaylistItem-image">' +
    '<img src="'+imgsrc+'" alt="">' +
  '</div>'+
  '<h4 class="primaryPlaylistItem-title">'+
    + title +
  '</h4>'+
'</div>'
*/

//Template de la pelicula 
function videoItemTemplate(movie,category){//Template 
  return (
    `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
    <div class="primaryPlaylistItem-image">

      <img src="${movie.medium_cover_image}" alt="">
    </div>
    <h4 class="primaryPlaylistItem-title">
      ${movie.title}
    </h4>
  </div>`
  )
}

//User template
function userTemplate (user){
  return(`
  <li class="playlistFriends-item" data-uuid=${user.login.uuid}>
    <a href="#">
      <img src="${user.picture.medium}" alt="echame la culpa" />
      <span>
        ${user.name.first} ${user.name.last}
      </span>
    </a>
  </li>
  `)
}

//Mi lista de peliculas 
function  userPlayList (movie,category){
  return(
  `
  <li class="myPlaylist" data-id="${movie.id}" data-category="${category}" >
    <a href="#">
    <img src="${movie.medium_cover_image}" alt="imagen de la pelicula de la playlist" />
      <span>
        ${movie.title}
      </span>
    </a>
  </li>
`
  )
}

/* function userVideoItemTemplate(movie,category){//Template 
  return (
    `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
    <div class="primaryPlaylistItem-image">

      <img src="${movie.medium_cover_image}" alt="">
    </div>
    <h4 class="primaryPlaylistItem-title">
      ${movie.title}
    </h4>
  </div>`
  )
} */
//Muestra el modal del usuario
function userDescriptionTemplate (user){
  return(
    `
    <ul class="userDescription">
        <li id="userName" class="user-name">  
        <h3 class="userItem">Name:</h3> <span class="name-user" id="name-user">${user.name.first} ${user.name.last}</span>
        </li>
        <li id="userAge" class="age">  
        <h3 class="userItem">Age:</h3><span class="age-user">${user.dob.age}</span>
        </li>
        <li id="userCity" class="city">  
          <h3 class="userItem">City:</h3><span class="user-city">${user.location.city},${user.location.state}</span>
        </li>
        <li id=userId class="Id-user">
        <h3 class="userItem">Id User:</h3><span class="user-id"> ${user.login.uuid}</span>
        </li>
    </ul>
    `
    )
}
 
//Crea el temaplate para la busqueda de peliculas
function featuringTemplate(peli){
  return(
    `
    <div class="featuring" >
      <div class="featuring-image">
        <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
      </div>
    </div>
    `
  )
}



  //Obtengo las peliculas de accion esta es una forma  con async await

  //Cache si ya existen los datos 
  async function cacheExist(category){
    const listName = `${category}List`;
    const cacheList= window.localStorage.getItem(listName);

    if(cacheList){
      return JSON.parse(cacheList);
    }else{
      const {data: {movies:data}} =await getData(`${URL_MOVIES}list_movies.json?genre=${category}`);
      window.localStorage.setItem(listName,JSON.stringify(data));

      return data;
    }
  } 

  const  {results: users} = await getData(URL_USERS);
  const $playlistFriends = document.getElementById('playListFriends');
  renderUser(users,$playlistFriends);
 
  const $myPlaylist = document.getElementById('myPlaylist');

  const actionList = await cacheExist('action');
  const dramaList = await cacheExist('drama');
  const animationList = await cacheExist('animation');
  /* const {data: {movies:actionList}} = await getData(`${URL_MOVIES}list_movies.json?genre=action`)
  const {data: {movies:dramaList}} = await getData(`${URL_MOVIES}list_movies.json?genre=drama`)
  const{data: {movies:animationList}} = await getData(`${URL_MOVIES}list_movies.json?genre=animation`) */
  //LocalStorage para guardar los datos y no los vuelva a cargar
 /*  window.localStorage.setItem('actionList',JSON.stringify(actionList));
  window.localStorage.setItem('dramaList',JSON.stringify(dramaList));
  window.localStorage.setItem('animationList',JSON.stringify(animationList)); */
  
  var array_categorias2 = [actionList,dramaList,animationList];
  var array_categorias = ['action','drama','animation'];
  var aleatorio = Math.floor(Math.random()*3);
  console.log(array_categorias[aleatorio]);
  renderMovieListUser(array_categorias2[aleatorio],$myPlaylist,array_categorias[aleatorio]);
  const $actionContainer = document.getElementById('action'); 
  renderMovieList(actionList,$actionContainer,'action');


 

  const $dramaList = document.getElementById('drama'); 
  renderMovieList(dramaList,$dramaList,'drama');
  


  const $animationContainer = document.getElementById('animation'); 
  renderMovieList(animationList,$animationContainer,'animation');
  

  
  console.log(actionList,dramaList,animationList);
 
  console.log(users); // Me devuelve la lista users
  






})()
