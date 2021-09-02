const Clarifai = require('clarifai');
const { json } = require('express');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'fd0c3de9d67f407b98a399313080a9d0'
});

const handelApiCall = (req,res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(errr => res.status(400).json('unable to work with API'))
}
   
const handelImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1).returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }).catch(err => res.status(400).json('failed'));
}

module.exports = {
    handelImage,
    handelApiCall
}