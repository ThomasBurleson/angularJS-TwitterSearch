/**
 * Twitter `Recent Tweets` Angular JS application was originally presented
 * by Thierry Chatel. This version has
 *
 * This bootstrap uses head.js to load the required libraries before
 * we start the `TweetSearch`.
 *
 *  @author Thomas Burleson
 */

 (function() {

  head.js(
    // { boostrap  : "/assets/js/lib/jquery/bootstrap/js/bootstrap.js" },
    { jquery    : "./assets/js/lib/jquery/jquery.min.js",                size: "93876"   },
    { angular   : "./assets/js/lib/angular/angular.js",                  size: "473234"  },
    { sanitize  : "./assets/js/lib/angular/angular-sanitize.js",          size: "17359"   },
    // { resources : "/assets/js/lib/angular/angular-resource.js",      size: "15782"   },
    { app       : "./assets/js/Twitter.js"                                               },
    { search    : "./assets/js/SearchController.js"                                      }

  )
  .ready("ALL", function() {

    // Start the main application
    angular.module("TwitterSearch", ["ngSanitize", "TwitterServices"] );

  });

}).call(this);


 /*
    TODO

    - Center header bar
    - progress bar for countdown
    - show hour info
    - hover animatoin
    - hover highlight
    - select highlight
    - animate show filters

 */