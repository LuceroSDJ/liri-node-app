console.log('this is loaded');

//MODULARIZATION
//here we are exporting and making my "spotify id & secret" available to other js files
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};