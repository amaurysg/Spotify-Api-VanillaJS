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
        const limit =4

      const result = await fetch(`https://api.spotify.com/v1/search?q=${nameId}&type=track%2Cartist&limit=${limit}`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token},
          
      });
      
      const data = await result.json()
  
      return data.artists.items
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
        
        return data.playlists.items;
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
    _getTracks()

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
    }

   

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
        btnSearch: "#btn-search",
        inputSearch: "#input-search",

        divPlayList:"#id-playlist",
        
    
        
        /* selectGenre: '#select_genre', */
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
                /* genre: document.querySelector(DOMElements.selectGenre), */
                /* genreType: document.querySelector(DOMElements.typeGenre), */
                search: document.querySelector(DOMElements.divSearch),
                btn_search: document.querySelector(DOMElements.btnSearch),
                input_search: document.querySelector(DOMElements.inputSearch),   
                playlist_div : document.querySelector(DOMElements.divPlayList),
                
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
                  
                    <article  id="${id}">
                    <h6>${name}</h6>
                    <p>Followers: <b>${followers}</b></p>
                    <img src="${images}" alt=""/>
                    </article>
                 
                 
                    `;
                document.querySelector(DOMElements.divSearch).insertAdjacentHTML('beforeend', html)
            
        }, 

        createPlaylist(text,value) {
             const html = `<option value="${value}">${text}</option>`;
            

            document.querySelector(DOMElements.divPlayList).insertAdjacentHTML('beforeend', html);
        },

         createGenre(text, value, images){
             const html = `<div class="types" id="${value}"> <p>${text}</p> <img src="${images}" alt=""/></div>`
            document.querySelector(DOMElements.divGenreType).insertAdjacentHTML("beforeend", html)
            
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
            this.inputField().search.innerHTML = '';
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
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
    
    
    
    // get genres on page load
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