/*globals desc: false, task:false, fail:false */

(function() {
    "use strict"; //runtime error checking

    var semver = require("semver");
    var jshint = require("simplebuild-jshint");
    var karma = require("simplebuild-karma");

    var KARMA_CONFIG = "karma.conf.js";
    var BROWSERS = ["Chrome 56.0.2924 (Windows 10 0.0.0)", "Edge 14.14393.0 (Windows 10 0.0.0)", "IE 11.0.0 (Windows 10 0.0.0)"];

//***** General-purpose tasks */

    desc("Start the Karma server (run this first)");
    task("karma", function(){
        console.log("Starting Karma server:");
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, {async:true});

    desc("Default build");
    task("default",["version", "lint", "test"], function() {
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
			options: lintOptions(),
            globals: lintGlobals()
		}, complete, fail);
	}, { async: true });

    desc("Run tests");
    task("test", function(){
        console.log("Testing JavaScript:");
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: BROWSERS,
            strict: false // cloud use: !process.env.loose but need jake loose=true on command line
        }, complete, fail);
    }, {async:true});
 
    function lintOptions () {
        return {
            bitwise: true,
            eqeqeq: true,
            freeze: true,
            futurehostile: true,
            latedef: "nofunc",
            noarg: true,
            nonbsp: true,
            nonew: true,
            strict: true,
            node: true,
            browser:true
        };
    }

    function lintGlobals() {
        return {
            //mocha
            describe:false,
            it:false,
            before:false,
            after:false,
            beforeEach:false,
            afterEach:false
        };    
    }

    function browserGlobals() {
        return {
            //mocha
            describe:false,
            it:false,
            before:false,
            after:false,
            beforeEach:false,
            afterEach:false
        };    
    }

}());