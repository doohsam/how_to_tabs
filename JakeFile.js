/*globals desc: false, task:false, fail:false */

(function() {
    "use strict"; //runtime error checking

    var semver = require("semver");
    var jshint = require("simplebuild-jshint");

//***** General-purpose tasks */

    desc("Default build");
    task("default",["version", "lint"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Run a localhost server");
    task("run", function() {
        jake.exec("node node_modules/http-server/bin/http-server src", {interactive:true}, complete, {async: true});

        console.log("Run http-server here");

    }); 

//**** Supporting tasks */
    desc("Check Node version");
    task("version",function(){

        console.log("Checking Node version: .");
        
        var packageJson = require("./package.json");
        var expectedVersion = packageJson.engines.node;

        var actualVersion = process.version;
        if (semver.neq(expectedVersion, actualVersion)){

         fail("Incorrect Node version: expected " + expectedVersion);
        }
    });

    desc("Lint JavaScript code");
	task("lint", function() {
		process.stdout.write("Linting JavaScript: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/**/*.js" ],
			options: {
                bitwise: true,
                eqeqeq: true,
                freeze: true,
                futurehostile: true,
                latedef: "nofunc",
                noarg: true,
                nonbsp: true,
                nonew: true,
                strict: true,
//                undef: true,

                node: true,
                browser:true
            },
			globals: {}
		}, complete, fail);
	}, { async: true });

}());