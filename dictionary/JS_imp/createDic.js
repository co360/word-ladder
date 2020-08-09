function createHashOfWords()
{
    console.log("Running");
    var fs = require("fs");
    var text = fs.readFileSync("./ScrabbleWords.txt");
    var textByLine = text.toString().split("\n")

    var hash = {};

    for ( var i = 0; i < textByLine.length; i++ )
    {
        hash[textByLine[i].toString()] = true;
        
    }
    console.log(hash["AA"]);


    return hash;
}