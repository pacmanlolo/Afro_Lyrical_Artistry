document.addEventListener('DOMContentLoaded', function (event) {
  const index = window.location.href.lastIndexOf('/');
  const id = window.location.href.substring(index + 1);
  const songApiUrl = 'http://0.0.0.0:5001/api/v1/songs/' + id;
  songDetails(songApiUrl);
  songArtistes(id);
  console.log("first");

// Fetches all data for specific song and sets up navigation to other songs with same genre
  async function songDetails(songApiUrl) {
    try {
      let songApiResponse = await fetch(songApiUrl)
      let songData = await songApiResponse.json()
      document.getElementById('song-title').innerHTML = `${songData.title}`;
      document.getElementById('song-artist').innerHTML = `${songData.artist}`;
      document.getElementById('song-lyrics').innerHTML = `${songData.lyrics}`;
      document.getElementById('song-genre').innerHTML = `Genre: ${songData.genre}`;
      document.getElementById('song-genre').setAttribute('text', songData.genre);
      document.getElementById('song-image').setAttribute('src', songData.image_url);
      genre = document.getElementById('song-genre').getAttribute('text');
      const genreApiUrl = 'http://0.0.0.0:5001/api/v1/songs/genre/' + genre;
      console.log("second");
      let genreApiResponse = await fetch(genreApiUrl)
      genreData = await genreApiResponse.json()
      if (genreData.length > 1) {
        document.getElementById('genre-suggestions').insertAdjacentHTML('beforeEnd', `<p>Other ${genreData[0].genre} songs to explore:</p><ul id="suggestion-list"></ul><a class="card-link" href="#"></a>`);
        suggestionDict = suggestions(genreData);
        for (const [key, value] of Object.entries(suggestionDict)) {
          item = document.createElement('LI');
          text = document.createTextNode(value);
          item.appendChild(text);
          item.setAttribute('id', key);
          document.getElementById('suggestion-list').appendChild(item);
          suggestionNav(key);
        }
      } else {
        document.getElementById('genre-suggestions').insertAdjacentHTML('beforeEnd', `<p>Check back for more ${genreData[0].genre} songs!</p><a class="card-link" href="#"></a>`);
      }} catch(err){
	console.error(err);
    }}

  // Fetches associated words and modifies lyrics HTML for highlighting of selected artiste
  async function songArtistes(id) {
    try {
      const songArtistesApiUrl = 'http://0.0.0.0:5001/api/v1/songs/' + id + '/artistes';
      let songArtistesResponse = await fetch(songArtistesApiUrl);
      let songArtistesData = await songArtistesResponse.json();
      console.log("third");
      for (i = 0; i < songArtistesData.length; i++) {
	item = document.createElement('LI');
	text = document.createTextNode(songArtistesData[i].text);
	item.appendChild(text);
	document.getElementById('wordlist').appendChild(item);
	setupWordFetch(item);
      }
      featuredArtistes = document.getElementById('artistelist').querySelectorAll('li');
      modFeaturedArtistes = [];
      for (i = 0; i < featuredArtistes.length; i++) { modFeaturedArtistes.push(featuredArtistes[i].innerText); }
      lyrics = document.getElementById('song-lyrics').innerHTML;
      console.log(lyrics);
      modLyrics = lyrics.replace(/\n/g, '+\n');
      console.log('Modified: ' + modLyrics);
      words = modLyrics.split(/\+| /);
      console.log(artistes);
      for (i = 0; i < artistes.length; i++) {
        console.log(artistes[i]);
        if (modFeaturedArtistes.includes(artistes[i].replace(/[\".,\/#!$%\^&\*;:{}=\-_`~()\n]/g, ''))) {
          console.log('Found: ' + artistes[i]);
          artistes[i] = `<span class = ${artistes[i].replace(/[\".,\/#!$%\^&\*;:{}=\-_`~()]/g, '')}>` + artistes[i] + '</span>';
        }
      }
      document.getElementById('song-lyrics').innerHTML = artistes.join(' ');
    } catch(err) {
      console.error(err);
    }
  }

  /**
 * Creates button group for menu of artiste entries
 *
 * @returns {HTML}
 */
  function buttonGroupHTML () {
    return (
    `<div class="btn-group flex-wrap" role="group" aria-label="Basic example" id="entries_button_group">
      </div>`
    );
  }
  /**
 * Creates button for artiste entry in button group
 *
 * @param {number} index
 * @returns {undefined}
 */
  function buttonHTML (index) {
    return (`<button type="button" class="btn btn-secondary" id=${index}>${index}</button>`);
  }
  /**
 * Adds event listener so different info about artiste can be displayed in tabs
 *
 * @param {dictionary} data
 * @param {number} entryId
 * @returns {undefined}
 */
  function setupEntry (data, entryId) {
    document.getElementById(entryId).addEventListener('click', function () {
      const tabDict = {};
      const keys = Object.keys(data.results[entryId]);
      for (i = 0; i < keys.length; i++) {
        if (keys[i] == 'introduction' || keys[i] == 'backgroundCheck' ||
	  keys[i] == 'achievements' || keys[i] == 'discography' ||
	  keys[i] == 'others') {
          if (data.results[entryId][keys[i]] != null) { tabDict[keys[i]] = data.results[entryId][keys[i]]; }
        }
      }
      document.getElementById('artisteTabs').innerHTML = '';
      document.getElementById('myTabContent').innerHTML = '';
      document.getElementById('artisteTabs').classList.add('nav', 'nav-tabs');
      appendTabs(tabDict);
      document.getElementById('artisteCard').classList.add('card');
      if (!document.getElementById('prompt')) {
        addBiographyPrompt(data);
        setupPost();
      }
      if (document.getElementById('displaySection').innerHTML == '') { displayBiography(); }
    });
  }
  /**
 * Sets up display of tabs and associated panels for content
 *
 * @param {dictionary} tabDict
 * @returns {undefined}
 */
  function appendTabs (tabDict) {
    tabDictKeys = Object.keys(tabDict);
    for (i = 0; i < tabDictKeys.length; i++) {
      if (i == 0) {
        tab = '<li class="nav-item"><a class="nav-link active"' +
	`id="${tabDictKeys[i]}-tab" data-toggle="tab" href="#${tabDictKeys[i]}"` +
	`role="tab" aria-controls="${tabDictKeys[i]}" aria-selected="true">${tabDictKeys[i]}</a></li>`;
        tabContent = '<div class="tab-pane fade show active"' +
	`id="${tabDictKeys[i]}" role="tabpanel"` +
	`aria-labelledby="${tabDictKeys[i]}-tab"><p>${tabDict[tabDictKeys[i]]}</p></div>`;
      } else {
        tab = '<li class="nav-item"><a class="nav-link"' +
	`id="${tabDictKeys[i]}-tab" data-toggle="tab"` +
      `href="#${tabDictKeys[i]}" role="tab" aria-controls="${tabDictKeys[i]}" aria-selected="true">${tabDictKeys[i]}</a></li>`;
        tabContent = `<div class="tab-pane fade" id="${tabDictKeys[i]}"` +
	`role="tabpanel" aria-labelledby="${tabDictKeys[i]}-tab">${tabDict[tabDictKeys[i]]}</div>`;
      }
      document.getElementById('wordTabs').insertAdjacentHTML('beforeend', tab);
      document.getElementById('myTabContent').insertAdjacentHTML('beforeend', tabContent);
    }
  }
  /**
 * Creates and inserts HTML for submitting biography
 *
 * @param {dictionary} data
 * @returns {undefined}
 */
  function addBiographyPrompt (data) {
    prompt = `<br><label for="biography-text-area" id="prompt">After exploring a few entries, share what you know about the artist by <i>\"${data.artiste}\"</i>...</label>`;
    textArea = '<textarea class="form-control" form="biography-section" name="biography "id="biography-text-area" rows="3" ></textarea>';
    submitButton = '<br><button type="submit" class="btn btn-primary">Submit</button>';
    document.getElementById('biography-section').insertAdjacentHTML('beforeend', prompt);
    document.getElementById('biography-section').insertAdjacentHTML('beforeend', textArea);
    document.getElementById('biography-section').insertAdjacentHTML('beforeend', submitButton);
  }
  /**
 * Adds event listener for posting of biography to internal REST API
 *
 * @returns {undefined}
 */
  function setupPost () {
    form = document.getElementById('biography-section');
    form.addEventListener('submit', postBiography);
  }
  /**
 * Checks for profanity in biography, makes POST request to internal REST API, and displays confirmation dialog
 *
 * @param {event object} event
 * @returns {undefined}
 */
  async function postBiography (event) {
    try {
      event.preventDefault();
      artiste = document.getElementById('selectedArtiste').getAttribute('text');
      artisteIdUrl = 'http://0.0.0.0:5001/api/v1/artistes/' + artiste;
      let artisteIdResponse = await fetch(artisteIdUrl);
      let artisteIdData = await artisteIdResponse.json();
      console.log(artisteIdData);
      biography = document.getElementById('biography-text-area').value;
      biographyDict = { text: biography };
      biographyUrl = 'http://0.0.0.0:5001/api/v1/biography/' + artisteIdData + '/' + id;
      let biographyUrlResponse = await fetch(
	biographyUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(biographyDict) })
      let biographyData = biographyUrlResponse.json()
      document.getElementById('biography-section').style.display = 'none';
      if ('error' in biographyData && bbiographyData.error == 'Profane') {
	confirmationDialog = `<br><p id = "confirmationDialog">Your submission for <i>${artiste}</i> contains profane content. It will not be posted.</p>`;
      } else {
	confirmationDialog = `<br><p id = "confirmationDialog">Thanks for your submission for <i>${artiste}</i>!</p>`;
      }
      document.getElementById('artiste-specific-body').insertAdjacentHTML('beforeend', confirmationDialog);
    }
    catch(err) {
      console.error(err);
    }}

  /**
 * Fetches and displays biography of artiste in specific song
 *
 * @returns {undefined}
 */
  async function displayBiography () {
    try {
      word = document.getElementById('selectedArtiste').getAttribute('text');
      ArtisteIdUrl = 'http://0.0.0.0:5001/api/v1/artistes/' + artiste;
      let artisteIdResponse = await fetch(artiseIdUrl);
      let artisteIdData = await artisteIdResponse.json();
      let biographyApiResponse = await fetch('http://0.0.0.0:5001/api/v1/biography/' + artisteIdData + '/' + id)
      let biographyData = await biographyApiResponse.json()
      displaySection = setupDisplaySection();
      document.getElementById('displaySection').insertAdjacentHTML('beforeend', displaySection);
      contentDiv = document.getElementById('content-div');
      if (biographyData.length > 0) {
	for (i = 0; i < biographyData.length; i++) {
	  contentDiv.insertAdjacentHTML('beforeend', `<p class="card-text">"<i>${biographyData[i].text}</i>"</p>`);
	}
      } else {
	contentDiv.insertAdjacentHTML('beforeend', `<p class="card-text">Be the first to share what you know about the artist by <i>${artiste}</i></p>`);
      }} catch(err) {
	console.error(err);
      }}

  /**
 * Creates HTML for displaying biography
 *
 * @returns {HTML} displaySection
 */
  function setupDisplaySection () {
    word = document.getElementById('selectedWord').getAttribute('text');
    return (
`<div role="tablist" id="accordion-1">
    <div class="card">
        <div class="card-header" role="tab">
            <h5 class="mb-0"><a data-toggle="collapse" aria-expanded="false" aria-controls="accordion-1 .item-1" href="#accordion-1 .item-1">Latest biography for <i>${artiste}</i></a></h5>
        </div>
        <div class="collapse item-1" role="tabpanel" data-parent="#accordion-1">
            <div class="card-body" id="content-div">
            </div>
        </div>
    </div>
</div>`);
}
/**
 * Returns of dictionary of other songs within the same genre based on API response from internal RESTful API
 *
 * @returns {dictionary} suggestionDict
 */
function suggestions (data) {
  if (data.length > 0) {
    suggestionDict = {};
    for (i = 0; i < data.length; i++) {
      if (data[i].title != document.getElementById('song-title').innerHTML) { suggestionDict[data[i].id] = data[i].title; }
    }
    return (suggestionDict);
  }
}
/**
 * Adds event listener for redirection to other song pages within same genre
 *
 * @returns {undefined}
 */
function suggestionNav (id) {
  document.getElementById(id).addEventListener('click', function () {
    window.location.href = 'http://0.0.0.0:5000/songs/' + id;
  });
}
});
