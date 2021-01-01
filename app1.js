const APIController = (function() {
    
     const clientId = '41938962de044921be461a055062840b';
    const clientSecret = '22688a6ffc444b87be704e2631e8b2e1';
    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getSearch = async (token, nameId) => {
        const limit =10

      const result = await fetch(`https://api.spotify.com/v1/search?q=${nameId}&type=track%2Cartist&limit=${limit}`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token},
          
      });
      
      const data = await result.json()
  
      return data.artists.items
  } 

    const _getArtist = async (token, artist_Id) => {
        

      const result = await fetch(`https://api.spotify.com/v1/artists/${artist_Id}`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token},
          
      });
      
      const data = await result.json()
      const dataArray = Object.values(data)
    
      console.log(dataArray)
        return dataArray
  } 

    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US&limit=8&offset=1`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });    

        const data = await result.json();
        console.log("genres::",data)
        return data.categories.items;
    }    


    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        console.log("data PlayList", data)
        return data.playlists.items;
    }


    const _getTrackByArtist = async (token, artist_Id)=>{
    
        const result = await fetch(`https://api.spotify.com/v1/artists/${artist_Id}/top-tracks?market=ES&limit=4&offset=1`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        const data = await result.json()
        console.log("tracks", data)
        return data.tracks

    }
    const _getAlbums = async (token, artist_Id)=>{
  
        const result = await fetch(`https://api.spotify.com/v1/artists/${artist_Id}/albums?market=ES&limit=5&offset=0`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        const data = await result.json()
        console.log("Data albums", data.items)

        return data.items

    }
    const _miliTomin =  (durations) => {
                const minutes = Math.floor(durations / 60000);
                 const seconds = ((durations % 60000) / 1000).toFixed(0);
         return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

  /*   const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;
    
        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
       
        return data.items;
    } */
   /*  _getTracks()

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }
 */
   

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },

        getSearch(token, nameId) {
            return _getSearch(token,nameId);
        },
        getArtist(token, artist_Id) {
            return _getArtist(token,artist_Id);
        },
        
       getTrackByArtist(token, artistId){
            return _getTrackByArtist(token, artistId)
        }, 
       miliTomin(durations){
            return _miliTomin(durations)
        }, 

       getAlbums(token, artistId){
            return _getAlbums(token, artistId)
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
        divSearch: '#id-search',
        divTracks: '#id-tracks',
        btnSearch: "#btn-search",

        divArtist: "#id-artist",
        divAlbums: "#id-albums",
        playIcon: ".play-icon",
        inputSearch: "#input-search",

        divPlayList:"#id-playlist",
        
    
         selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',


        
        divGenreType: ".genre_type",
        types: ".types",
       

        divSonglist: '.song-list'
        
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                /* genreType: document.querySelector(DOMElements.typeGenre), */
                search: document.querySelector(DOMElements.divSearch),
                tracksByArtist: document.querySelector(DOMElements.divTracks),
                albums: document.querySelector(DOMElements.divAlbums),
                artist :document.querySelector(DOMElements.divArtist),
                btn_search: document.querySelector(DOMElements.btnSearch),
                input_search: document.querySelector(DOMElements.inputSearch),   
                playlist_div : document.querySelector(DOMElements.divPlayList),
                play_icon: document.querySelector(DOMElements.playIcon),
                playlist: document.querySelector(DOMElements.selectPlaylist),

                /* genres: document.querySelector(DOMElements.divGenre), */
                genres: document.querySelector(DOMElements.divGenreType),
                /* types: document.querySelector(".types"), */
               /*  submitGenre: document.querySelector(DOMElements.types), */
                submitGenre : document.querySelector(DOMElements.types),

                tracks: document.querySelector(DOMElements.divSonglist),
                
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },




        createSearch(id,name, followers,images) {
           
        
                const html =   `    
                  
                    <article class="result-search"  id="${id}">
                    
                    <img id="${id}" src="${images}" alt=""/>
                    <h6 id="${id}">${name}</h6>
                    <div class="play-icon"></div>
                    </article>
                 
                 
                    `;
                document.querySelector(DOMElements.divSearch).insertAdjacentHTML('beforeend', html)
            
        }, 

        /// create tracks by artists //
        createTracksByArtist(id,name, images, artist, durations){

            const html =`
            
            <div  class="tracks_by_artist" id=${id}>
            <img src="${images}" alt=""/>
           <div class="tracks-info">
                <div class="tracks-names-artist">
                     <p> ${name}</p>
                     <p>${artist}</p>
                </div>
                 <p>${durations}</p>
           </div>
              
             </div>
            `

            document.querySelector(DOMElements.divTracks).insertAdjacentHTML('beforeend',html)

        },
        createAlbums(id, name, images, artist){
              const html =`
            
            <div  class="albums_by_artist" id="${id}">
            
             <img src="${images}" alt=""/>
             <p class="p-tittle"> ${name}</p>
             <h6>${artist}</h6>
              </div>
            `

            document.querySelector(DOMElements.divAlbums).insertAdjacentHTML('beforeend',html)

        },

        createArtist(id, name, images, type){

            const html =`
            <h3>Resultado principal</h3>
            <div class="container-artist-card">
            
            <div  class="artist" id="${id}">
            <img src="${images}" alt=""/> 
            <h1>${name}</h1>
              <p>${type}</p> </div>
            </div>
            `

            document.querySelector(DOMElements.divArtist).insertAdjacentHTML('beforeend',html)

        },


        createPlaylist(text,value, images) {
             const html = `
             <div  class="play" value="${value}">
                <img src="${images}" alt=""/>
               
             </div>`;
            

            document.querySelector(DOMElements.divPlayList).insertAdjacentHTML('beforeend', html);
        },

         createGenre(text, value, images){
               const html = `
       
              
               <div class="type_genre" id="${value}">
               <img id="${value}" src="${images}" alt=""/>    
               <p id="${value}">${text}</p>  
               </div>
               
            
               
               
               `;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);


         /*     const html = `<div class="types" id="${value}"> <p>${text}</p> <img src="${images}" alt=""/></div>`
            document.querySelector(DOMElements.divGenreType).insertAdjacentHTML("beforeend", html) */
            
         },


        // need method to create a track list group item 
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
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

        resetSearchList(){
          
        
            this.inputField().search.innerHTML =  '';
            
          

            

        },
        
        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetArtists() {
            this.inputField().artist.innerHTML = '';
            
        },
        resetAlbums() {
            this.inputField().albums.innerHTML = '';
            
        },
        resetTracksByArtists() {
            this.inputField().tracksByArtist.innerHTML = '';
            
        },
        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist_div.innerHTML = '';
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
   
    
    // GET SEARCH FOR INPUT !!
    DOMInputs.btn_search.addEventListener("click", async (e)=>{
        
        e.preventDefault()
        
        UICtrl.resetSearchList()
        //search select element
        
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        
        //get the search
        const nameId =   DOMInputs.input_search.value
        console.log(nameId)
        const search = await APICtrl.getSearch(token, nameId);

 
        search.forEach(e =>  UICtrl.createSearch(e.id,e.name, e.followers.total, e.images[0].url)); 
        
    })
    
    
    //
         DOMInputs.search.addEventListener("click", async (e)=>{
            
            
            console.log(e.target.id)
            e.preventDefault()
            
            UICtrl.resetArtists()
            UICtrl.resetTracksByArtists()
            UICtrl.resetAlbums()

            /* UICtrl.resetSearchList() */


            const token = await APICtrl.getToken();     
            UICtrl.storeToken(token);
            const artist_Id = e.target.id
          
            const artist = await APICtrl.getArtist(token, artist_Id)

            //get data for arstist in one obj 
            UICtrl.createArtist(artist[4], artist[6], artist[5][0].url, artist[8]);
            
            
            const icon_play = document.querySelector(".play-icon")
            console.log(icon_play)

            const tracksByArtist = await APICtrl.getTrackByArtist(token, artist_Id)

            //I used slice for limit num of tracks
            
            tracksByArtist.slice(0,4).forEach( t =>{
                
                const min = APICtrl.miliTomin(t.duration_ms)
                UICtrl.createTracksByArtist(t.id,t.name,t.album.images[2].url,t.artists[0].name, min)
                            })
            


            const albums = await APICtrl.getAlbums(token,artist_Id)
            albums.forEach(a => UICtrl.createAlbums(a.id, a.name, a.images[1].url, a.artists[0].name))

            /* id,name, images */
         })
         

    
    
    // gea genres on page load
     const loadGenres = async () => {
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
    
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element

       
        genres.forEach(element => UICtrl.createGenre(element.name, element.id, element.icons[0].url));

        
     }

     

     //Eve
       DOMInputs.genre.addEventListener('click', async (e) => {
          
        console.log(e.target.id)
        e.preventDefault()
      
      /*   const div = document.querySelector(".container-genres")
        div.classList.toggle("is-hidden") */
         //reset the playlist
        UICtrl.resetPlaylist();
        //get the token that's stored on the page
        const token = UICtrl.getStoredToken().token;        
        // get the genre select field
             
        // get the genre id associated with the selected genre
        const genreId = e.target.id;             
        // ge the playlist based on a genre
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);       
        // create a playlist list item for every playlist returned
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href,  p.images[0].url ,p.tracks.id));
      

    });
     
     
     /*   types.addEventListener("click", async ()=>{
         console.log("Hola")
        }) */
        
        // create genre change event 
        
        
        // create submit button click event listener
        DOMInputs.submit.addEventListener('click', async (e) => {
            // prevent page reset
            e.preventDefault();
            // clear tracks
            UICtrl.resetPlaylist();
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
            /* loadSearch(); */
            loadGenres();
           
           
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();