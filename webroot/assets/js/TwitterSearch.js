/**
 * Twitter `Recent Tweets` Angular JS application was originally presented
 * by Thierry Chatel. This version has
 *
 *   -  improved Controller
 *   -  use of angular.module in main app wrapper (TweetSearch.js)
 *
 * Here the $resource is not used; rather the $http service and its support for `promises`
 * is used to transform the data before the controller or the views are notified.
 * We also use closures in order to  publish a custom $twitter service with a single
 * API: search().
 *
 *  @author Thomas Burleson
 *
 */
 (function() {

  /**
   * Create a TweetSearch constructor function that configures the angular app module
   * and builds the custom $twitter service (that is injected into the controller)
   *
   * Because the tweets.html has <div ng-app="Twitter" >, we must create a module `Twitter`
   *
   * NOTE: how the cross-domain, JSONP call promise handler intercepts and transforms the data
   * prior to delivery to the controller.
   *
   */
  TwitterSearch = function() {

    angular.module('Twitter', [ ], function($provide) {

      /**
       * Not using ngResource/$resource since we need direct access to `promise`
       * so intead we use the $http service directly.
       */
      $provide.factory('$twitter', function($http, $log) {

        // Prepare cross-domain JSONP call to Twitter
        var url = 'http://search.twitter.com/search.json'             +
                  '?&rpp=100&include_entities=true&result_type=mixed' +
                  '&callback=JSON_CALLBACK';

        /**
         * Publish search API for our custom Twitter service
         */
        return {
                  /** !! search() responds with promise instance
                   * but intercept the initial response to parse the data items
                   */
          search: function(searchTerm, lastID) {
            var params = '&q=' + searchTerm + (lastID ? '&since_id='+lastID : '');
            //$log.log( params );

            // return a promise
            return $http.jsonp( url + params ).then( function(response) {

              // parse data items and format post dates
              var data = response.data.results;
              for (var i = 0; i < data.length; i++)
              {
                data[i].date = Date.parse(data[i].created_at);
              }

              // Build special response
              return {
                  items       : data,
                  refreshURL  : response.data.refresh_url,
                  query       : response.data.query
              };

            });
          }
        };

      });
    });

  };

}).call(this);