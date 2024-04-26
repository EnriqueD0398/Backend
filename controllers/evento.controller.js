const mongoose = require("mongoose");
const Evento = require("../models/Evento.model")



module.exports.evento = (req, res, next) => {
    res.render("eventos/eventos");
}
module.exports.doEvento = (req, res, next) => {
const renderWithErros = (errors, values) => {
    res.render("evento", {errors, values} )
}

Evento.create(req.body)
.then(() => {
    res.redirect("/home");
})
.catch((err) => {
    if(err instanceof mongoose.Error.ValidatorError){
        renderWithErros(err.errors, req.body)
    } else {
        next(err)
    }
})
}