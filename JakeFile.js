(function() {
    "use strict"; //runtime error checking

    var semver = require("semver");
    
    desc("Default build");
    task("default",["version"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version")
    task("version",function(){

        console.log("Checking Node version: .");
        
        var packageJson = require("./package.json")
        var expectedVersion = packageJson.engines.node;

        let actualVersion = process.version;
        if (semver.neq(expectedVersion, actualVersion)){

         fail("Incorrect Node version: expected " + expectedVersion);
        }


    });
}());