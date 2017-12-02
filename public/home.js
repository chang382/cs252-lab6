/*
 * Basic examples
 * Test a lot of handlers that don't require user login.
 *
 */
'use strict'

import Client from './src/Client';
import PlaylistHandler from './src/handlers/PlaylistHandler';
import UserHandler from './src/handlers/UserHandler';

let client = Client.instance;

client.settings = {
    clientId: 'c7b3b4be06ec43cfa7ed4facfed7a6bc',
    secretId: 'd8a020b39ffd43ddabd458ec712b7dad',
    scopes: ['user-library-read user-top-read playlist-read-private playlist-read-collaborative'],
    redirect_uri: 'https://spotiphy-0.firebaseapp.com/home.html'
};

function session() {
	if (sessionStorage.token) {
			client.token = sessionStorage.token;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
			sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
			client.token = sessionStorage.token;
	}
}
session();

/*
 * UserHandler Examples
 *
 */
var user = new UserHandler();

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

/*
 * #1 example
 * Get the current user.
 */
user.me().then((userEntity) => {
		console.log(userEntity);
		console.log(userEntity._id);
    const ul = document.getElementById('playlists')
		user.playlists(userEntity._id).then((playlistCollection) => {
			console.log(playlistCollection);
      playlistCollection.map(function(playlist) {
        let a = createNode('a'),
            img = createNode('img'),
            p = createNode('p');
        if (playlist._images.length == 1) {
          img.src = playlist._images[0]["url"];
          img.style.cssText = "width: 120px; height: 120px;";
        }
        else {
          img.src = playlist._images[1]["url"];
          img.style.cssText = "width: 120px; height: 120px;";
        }
        a.href = "playlist.html#id=" + playlist._id;
        a.className += " card";
        p.innerHTML = playlist._name;
        p.className += " card-text";
        append(a, img);
        append(a, p);
        append(ul, a);
      });
		});
});