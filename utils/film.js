const Film = require("../models/film");

const addfilm = async(req, res) => {
    try {
        const newfilm = await Film.build({
            name: req.body.name, 
            genre: req.body.genre, 
            lang: req.body.lang,
            filmyear: req.body.year, 
            duration: req.body.duration, 
            restriction: req.body.restriction, 
            director: req.body.director, 
            casting: req.body.casting, 
            rating: req.body.rating, 
            photoURL: req.body.photoURL,
            image: req.body.image}); 
        await newfilm.save();

        return newfilm.id;
    } catch(error) {
        console.log(error);
    }
}

const listfilms = async() => {
    try {
        return await Film.findAll();
    } catch(error) {
        console.log(error);
        return [];
    }
}

const findfilm = async(id) => {
    try {
        const film = await Film.findOne({
            //attributes: ["name", "genre", "lang", "year", "duration", "director", "rating", "photoURL"],
            where: {id}
        });
        return film;
       
    } catch(error) {
        console.log(error);
        return [];
    }
}

const editfilm = async(id, newName) => { 

        const film = await Film.update(
            {name: newName},
            {where: {id}}
            
        );
        const noResult = (currentValue) => currentValue === 0;

        if(film.length === 1 && film.every(noResult)){
            throw new Error("No movie under this name");
        }        

        console.log(`Edited: ${film} film to  ${newName}`);

}

const removefilm = async(id) => { 

        const film = await Film.destroy({where: {id}});
        if(film === 0){
            throw new Error("No film deleted!");
        }        
        console.log(`Removed: ${film} film `);
}

module.exports = {
    addfilm,
    listfilms,
    findfilm,
    editfilm,
    removefilm
};