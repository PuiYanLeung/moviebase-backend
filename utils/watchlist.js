const User = require("../models/user");
const Film = require("../models/film");
const WatchList = require("../models/watchlist");

const addWatchList  = async(req, res) => {
    try {
        const watchlist = await WatchList.build({
            UserId: req.body.UserId, 
            FilmId: req.body.FilmId}); 
        await watchlist.save();

        return watchlist.id;
    } catch(error) {
        console.log(error);
    }
}

const findWatchList = async(UserId) => {
    try {


        const films = await Film.findAll({
            attributes: ["id","name", "genre", "lang", "filmyear", "duration", "restriction", "director", "casting", "rating", "photoURL", "image"],
            include: {
              model: WatchList,
              where: {
                UserId: UserId
              }
            }
          });

        //console.log(JSON.stringify(films, null, 2));
        return films;
       
    } catch(error) {
        console.log(error);
        return [];
    }
}

const deleteFilmFromWatchList = async(id) => { 

    const film = await WatchList.destroy({ where: { id } });      

    if(film === 0){
        throw new Error("No film from WatchList was deleted!");
    }        
    console.log(`Removed: ${film} film from WatchList`);
}

const removeUserWatchList = async(UserId) => { 

        const film = await WatchList.destroy({
              where: {
                UserId: UserId
              }
          });

        if(film === 0){
            throw new Error("No user WatchList was deleted!");
        }        
        console.log(`Removed: ${film} film from WatchList`);
}

module.exports = {
    addWatchList,
    findWatchList,
    removeUserWatchList,
    deleteFilmFromWatchList
};