const APIController = (function() {
    //cliente - client_secret
    const clientId = '41938962de044921be461a055062840b';
    const clientSecret = '22688a6ffc444b87be704e2631e8b2e1';
//scopes//

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];
    // private methods
    const _getToken = async () => {

       
        const result = await fetch('https://accounts.spotify.com/api/token' , {
            method: 'POST',
  
            scope: scopes,
            //La interfaz Headers te permite crear tus propios objetos de headers mediante el constructor Headers(). Un objeto headers es un simple multi-mapa de nombres y valores:
            headers: {
                //send data to server, 
                'Content-Type' : 'application/x-www-form-urlencoded', 
                //btoa for codify base64
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
          
             
            
             form: {
             grant_type: 'client_credentials'
            },
            json: true,
            body: 'grant_type=client_credentials' ,
        
        });

        const data = await result.json();
 /*        console.log("data_token:", data) 
        console.log('data.access_token ::', data.access_token) */
     
         /*   console.warn(data.access_token) */
        return data.access_token;
    }


/*     const _getTokenForMe = async () => {

       
        const result = await fetch('https://accounts.spotify.com/api/token' , {
            method: 'POST',
            scope: 'playlist-read-private',
            //La interfaz Headers te permite crear tus propios objetos de headers mediante el constructor Headers(). Un objeto headers es un simple multi-mapa de nombres y valores:
            headers: {
                //send data to server, 
                'Content-Type' : 'application/x-www-form-urlencoded', 
                //btoa for codify base64
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials',
        });

        const data = await result.json();
        console.log("data_token:", data) 
        console.log('data.access_token_For_Me ::', data.access_token)
     
    
        return data.access_token;
    } */


        

        //Principal fetch genres//
       
        const _getGenres = async (token) => {
        console.log("token_getGenres:",token)
        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json()
        const dataArray = data.categories.items
      /*   console.log(dataArray) */


        const containerGener = document.getElementById("container_test")
        containerGener.innerHTML=""
        dataArray.forEach(category=>{
            const div = document.createElement("div")
            div.addEventListener("click", (e)=>{
                idForGenre = e.target.id
                _getGenres(token, idForGenre)
                console.log(e.target.id)
                const containerNewGenres = document.getElementById("genres-f")
                containerNewGenres.innerHTML =""
                console.log(data)

            })
            div.innerHTML=`
            <div id="${category.id}">
            <div id="${category.id}">${category.name}</div>
            <img  id="${category.id}"src="${category.icons[0].url}" alt=""/>
            </div>
            
            `
            containerGener.appendChild(div)
        })
         
       /*  console.log("data1:", data) */
       
       
    
       /*  window.container.textContent = data.categories.items[0].url */
        return data.categories.items    


    } 


    const _getSearch = async (token, searchInputValue) => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=gilmour&type=track%2Cartist&limit=4`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token},
            
        });
        
        const data = await result.json()
        /* console.log("token_for_Search::", token) */
        console.log("dataSearch:", data.artists.items)
        const dataArraySearch = data.artists.items
        
        const containerSearch = document.getElementById("id-search")
        containerSearch.innerHTML=""
        const $inputSearch = document.getElementById("input-search")
       
        $inputSearch.addEventListener("click", ()=>{
            
            dataArraySearch.forEach(artist=>{
                const div = document.createElement("div")
                div.innerHTML=`
                <div class="container">
                <div class="search" id="id-search">
                <article>
                <h5>Name: ${artist.name}</h5>
                <p>Followers: ${artist.followers.total}</p>
                <img src="${artist.images[0].url}" alt=""/>
                </article>
                </div>
                
                `
                containerSearch.appendChild(div)

            })
        })
        return data
    } 

    const btn_search = document.getElementById("btn-search")
    btn_search.addEventListener("click", ()=>{
        alert("btn")
    })

 
    
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer BQDYDzkDHXrwSxxal4BDaDom3kxfmxl6oKzXNJEwIf6kiCY9wxLvrFwJn8_gx0B51VKPwc0fsZQefpW8N5ibEGGRwkDgffX0G_xDDKVo4rrJalbb3gyymb0umcZ7ZaU4Jaf6C14uO6_NxjdSVcGSrB-pwX4mr77ysG0ruoACHh-hx8rFU9C9DVnJIvkO_NemVsbz_H9gDIRxorWx4Ntf2MpdBhOPOmitMni0a1PenmwblkTLSRuaV6o-bQySEMv7b0RC9kbMFsa2cGk9sQ");
myHeaders.append("Cookie", "sp_t=c2c7b182d89c09bf296be3f62b68da27");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

/* fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
 */

    const _getMe = async (token) => {
            const result = await fetch("https://api.spotify.com/v1/me/playlists", requestOptions);
            
            const data = await result.json()
        const dataArrayMe = data.items 
        console.log(data.items)
       

        return data
    }   
    
        
        ///**** TEST IMG GENRES IN DOM****/
        /*     
            window.categories.textContent = data.categories.items[0].name
            window.img_categories.setAttribute("src", data.categories.items[0].icons[0].url)
            window.categories.textContent = data.categories.items[0].name
            window.img_categories.setAttribute("src", data.categories.items[0].icons[0].url)
        */


         const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 5;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        
        console.log("data2:",data)
        return data.playlists.items;

        
    } 


   const initGetPlay= async ()=>{
        const info = console.log(data)
        console.log(info)
    } 
   
    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;
  
        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
       
        return data.items;
    } 

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        console.log(data)
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
   /*      getTokenForMe() {
            return _getTokenForMe();
        }, */
    /*     getMe(token) {
            return _getMe(token);
        },   */
        getSearch(token, inputSearchValue){
            return _getSearch(token, inputSearchValue)
        },
        getGenres(token) {
            return _getGenres(token);
        },

         getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        }, 
       getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        }, 
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();


// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        mePlay : "#me",
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                me:  document.querySelector(DOMElements.mePlay),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // need methods to create select list option
       
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        }, 

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create a track list group item 
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>
            
            `;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // need method to create the song detail
        createTrackDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            // any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';

            const html = 
            `
            <div class="row col-sm-12 px-0">
                <img src="${img}" alt="">        
            </div>
            <div class="row col-sm-12 px-0">
                <label for="Genre" class="form-label col-sm-12">${title}:</label>
            </div>
            <div class="row col-sm-12 px-0">
                <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
            </div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },
        
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();


        const loadMePlayList= async ()=>{
        const token = await APICtrl.getToken()
        console.log("token_MEEE::", token)
        
        UICtrl.storeToken(token)
       
        const  me_play = await APICtrl.getMe(token)
        
        
        
        
      }
    
    
    //get Search on page load //
        const loadSearch = async ()=>{
        const token = await APICtrl.getToken()
       /* console.log("token_SEARCH::", token) */
        UICtrl.storeToken(token)
        const  search = await APICtrl.getSearch(token)        
        
    }
   
    
    // get genres on page load
    const loadGenres = async () => {
        //get the token
        
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        const genres = await APICtrl.getGenres(token);
        
        
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
        
    }
    
     // create genre change event listener
    DOMInputs.genre.addEventListener('click', async (e) => {
          
    console.log("Hola para playlist")
      
      /*   const div = document.querySelector(".container-genres")
        div.classList.toggle("is-hidden") */
         //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;        
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;       
        // get the genre id associated with the selected genre
        const genreId = "hiphop";             
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href, p.tracks.id));
      

    });
    
    
    
    
    
    
    
    // create genre change event listener
    DOMInputs.genre.addEventListener('change', async () => {
        //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;        
        // get the genre select field
        const genreSelect = UICtrl.inputField().genre;       
        // get the genre id associated with the selected genre
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;             
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href, p.tracks.id));
    });
     

    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        // clear tracks
        UICtrl.resetTracks();
        //get the token
        const token = UICtrl.getStoredToken().token;        
        // get the playlist field
        const playlistSelect = UICtrl.inputField().playlist;
        // get track endpoint based on the selected playlist
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get the list of tracks
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);
        // create a track list item
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))
        
    });

    // create song selection click event listener
    DOMInputs.tracks.addEventListener('click', async (e) => {
        // prevent page reset
        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get the token
        const token = UICtrl.getStoredToken().token;
        // get the track endpoint
        const trackEndpoint = e.target.id;
        //get the track object
        const track = await APICtrl.getTrack(token, trackEndpoint);
        // load the track details
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });    

    return {
        init() {
            console.log('App is starting');
          
       
            loadGenres();

            loadSearch();
         

        

          
            
        
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();




