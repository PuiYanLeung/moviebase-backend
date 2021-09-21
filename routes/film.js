const express = require("express");
const { addfilm, removefilm, findfilm, editfilm, listfilms} = require("../utils/film");

const router = express.Router();

router.get("/listmovie", async(req, res)=>{
   res.status(200).json(await listfilms());
});

router.get("/findmovie", async (req, res)=>{
    res.status(200).json({"findmovie successfully":await findfilm(req.body.id)});
});


router.post("/addmovie", async(req, res) => {
    const movie_id = await addfilm(req, res);
    res.status(201).json({"message": "Created a movie successfully", "movie_id": movie_id});
});
  
router.put("/editmovie", async (req, res) => {
    try {
        await editfilm(req.body.id, req.body.newName);
        res.status(201).json({msg: "edit movie successfully"});
    } catch (err) {
        res.status(404).json({ msg: "movie does not exist" });
    }
  });

  /* Delete replace value */
router.delete("/deletemovie", async (req, res) => {
    try {
        await removefilm(req.body.id);
        res.status(200).json({msg: "delete movie successfully"});
    } catch (err) {
      res.status(404).json({ msg: "movie does not exist" });
    }
  });

module.exports = router;