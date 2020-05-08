const mongoose =require('mongoose');

const User = new mongoose.Schema({
'Movie Name':String,
    Year:String,
    IMDbRating:String,
    votes:String,
    Awards:String,
    language:String,
    alttext:String

});

module.exports= mongoose.model('User',User);