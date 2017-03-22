(function() {
    "use strict";

    var EXPECTED_NODE_VERSION = "v6.9.1";
    desc("Default build");
    task("default",["version"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version")
    task("version",function(){

        console.log("Checking Node version: .");
        let actualVersion = process.version;
        if (actualVersion !== EXPECTED_NODE_VERSION){

         fail("Incorrect Node version: expected " + EXPECTED_NODE_VERSION);
        }


    });
}());