const express = require("express");
const { addWatchList, findWatchList, removeUserWatchList, deleteFilmFromWatchList } = require("../utils/watchlist");

const router = express.Router();

router.get("/findwatchlist", async (req, res)=>{
    res.status(200).json({"findWatchList successfully":await findWatchList(req.body.UserId)});
});

router.post("/addwatchlist", async(req, res) => {
    const watchlist_id = await addWatchList(req, res);
    res.status(201).json({"message": "Add a movie into WatchList successfully", "watchlist_id": watchlist_id});
});

router.delete("/deletefilmfromWatchList", async (req, res) => {
  try {
      await deleteFilmFromWatchList(req.body.id);
      res.status(200).json({msg: "delete a film from WatchList successfully"});
  } catch (err) {
    res.status(404).json({ msg: "WatchList does not exist" });
  }
});

  /* Delete replace value */
router.delete("/removeuserwatchlist", async (req, res) => {
    try {
        await removeUserWatchList(req.body.UserId);
        res.status(200).json({msg: "delete WatchList successfully"});
    } catch (err) {
      res.status(404).json({ msg: "WatchList does not exist" });
    }
});

module.exports = router;