Research & Project approval (Part 1)

1. Afro Lyrical Artistry

[  ] README
Afro Lyrical Artistry is a web application aimed at helping non-Afro music lovers increase their Afro artistry knowledge through music. Upon visiting the site, you can select a popular song and explore the artiste of song including the lyrics. Specifically, you can check out a biography of each song and share you knowledge the artiste within the context of the song.

2. Team Members
Michael Omotosho
[  ] Table of content
• Inspiration

• Technologies

• Getting Started

• Features

	- Song Selection
	- Artiste To Explore
	- Biography of artiste and lyrics of song
	- Suggest a Song Form

• API

• Future

• Attributions

• Author


[  ] Inspiration

Before I discovered my passion for software engineering, I was a finance specialist in Lagos, Nigeria. As a specialist in finance that deals with data and analysis, I checked into my hobby, which is listening to different genres of music from different continents, I found that music was such a powerful way to help people learn about others' biography and culture, since they all had a natural connection to it and it provided a context for their learning. Drawing from my experiences in the, I was inspired to create Afro Lyrical Artistry.

Initially, Afro Lyrical Artisry was going to solely allow non-Africans to check out popular afro songs for lyrics within songs. However, after reflecting upon how I leveraged music in my own understanding cum analysis and getting feedback from other heads, I decided to also allow users to test their knowledge of what artiste is on the songs. By exploring both the literal and figurative meaning of artistes in songs they know, students can deepen their understanding of the knowledge of African artistes in a context that is familiar to them.


[  ] Technologies

3. Technologies 

MySQL
SQLAlchemy
Python
Flask
Nginx
DigitalOcean
Goonicon
Bootstrap 


Architecture

4. Challenge statement
“Challenge”:

• Afro Lyrical Artistry is a web application aimed at helping non-Afro music lovers increase their Afro artistry knowledge through music.

• This project is NOT meant for Non-african artistry, just mainly afro music artistes.

• It is aimed at helping non-african listeners to know more about afro music artistes.

• Project is not relevant or dependent on a specific locale, but is about afro music artistes.


5. Risks

• The technical risks might be issue of licensing, as content are temporarily from already made web contents, but the potential impact is to have a working project, and the safeguards or alternatives are only secured web links and pages will be utilized.

• While the non-technical risks might be misguiding contents that can NOT be proven at the moment, which potential impact might be misleading information on biography, but strategies (cross-checking and proofreading) are in place to prevent these negative outcomes



6. Infrastructure

[  ] Getting Started

To start using this web application, visit afrolyricalartistry.pacmanlolo.tech. To install it, simply clone this repository. You can start the app by running web_app.app and api.v1.app as Python modules in separate terminal windows. Please note, in order to run this app, you will need to install necessary dependencies as well as pass in the correct MySQLdb and Words API credentials respectively.


[  ] Song selection

Afro Lyrical Artistry provides a selection of "clean" and vocabulary-rich songs to explore from a variety of different afro music. The data for each song is fetched from the internal RESTful API and is used to fill each Bootstrap card. The song's id is used as the id for the "View" button within the song's card. This allows for the correct song details to be fetched when the user clicks on the button since the id becomes part of the URL for the song.

[  ] Artist To Explore

When a user selects a song, they are re-directed to a song-specific page where the song's details are fetched from the internal RESTful API. This includes biography of artiste to explore. Event listeners are setup on each artist so that the biography can be fetched from an external API.


[  ] Bioraphy of Artiste and Lyrics of Song
When a user selects a specific song, the lyrics is fetched from the external Words API. The JS script will then create a menu based the parameters available for the biography. When a user clicks on one of the entries, the script will then see what sections are available for that entry (ex: "Date of Birth", "Nationality", "Achievements"). The available sections and their content will populate a dynamic tabbed interface for the user to browse. In addition, the artist name is highlighted on the lyrics. This was made possible by first parsing the lyrics and adding span elements around parameters of the biography that appear in the "Know the artiste" list. The spans have aligned classes added to them that allow them to be targeted and thus highlighted when a parameter is selected.




[  ] Suggest a Song Form

If a user would like to suggest a song to be added to the collection of songs to learn from, they can visit the "Suggest a Song" page and fill out the form. The form will ask for all necessary attributes for creating a new Song object including the song's artist, title, and a little more biography. The user must also submit their email and name so they can be notified if the song is added to the collection and receive credit for their contribution.




7. Existing Solutions

API
I built an internal RESTful API for this web application so that data can be flexibly retrieved from the MySQLdb. All available endpoints can be found in the api.v1.views directory. Here's a description of each endpoint:



EXTRAS

[  ] Future

Beyond this initial MVP which was built in almost 3 weeks, I would like to continue to add many more features to Afro Lyrical Artistry. In particular, I would like to set up an authentication system. With this, I would also like to enable users to have profiles so they can check out their past progress and further personalise the experience by suggesting songs and artists to explore based on past use. In addition, I'd like to allow users to edit past submissions and upvote each other's knowledge of the artist as well. I am also considering adding a "Top Users" board on the homepage too.

If you have any feedback (ex: feature ideas) or would like to contribute to this project, please feel free to contact me.


[  ] Attributions

Shout-out to Genius.com for the lyrics!

Licences for images from Wikipedia
- https://en.m.wikipedia.org/wiki/File:Burna_Boy_-_Last_Last.png
- https://en.m.wikipedia.org/wiki/File:Wizkid_at_Iyanya%27s_album_launch_concert,_2013_(cropped).jpg
- https://en.m.wikipedia.org/wiki/File:Davido_-_Timeless_album_cover.jpg





[  ] Author

Michael PacmanLoLo is a former finance specialist and current full stack software engineer with a passion for creating products that connect and empower others. He used his skills on the back-end and front-end to create Afro Lyrical Artistry.


