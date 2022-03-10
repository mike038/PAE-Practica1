const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    res.append('Nombre', JSON.stringify(req.user.name));
    res.append('Email', JSON.stringify(req.user.email));
    res.append('FotoUrl', JSON.stringify(req.user.imageUrl));
    res.sendFile(path.resolve(__dirname + "/../public/html/profile.html"));
});

module.exports = router;
