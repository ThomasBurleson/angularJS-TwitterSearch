/**
 * Twitter `Recent Tweets` Angular JS application was originally presented
 * by Thierry Chatel. This version has
 *
 *   -  improved Controller
 *   -  use of angular.module in main app wrapper (TweetSearch.js)
 *   -  improved skinning [with Twitter Bootstrap library],
 *   -  improved, complex filters and refresh timer,
 *   -  refresh count down, auto-reset, auto-search
 *   -  use of promise [see .then()],
 *   -  use of ng-hide/ng-show/,enter/return-key to search
 *   -  row selection,
 *   -  and more...
 *
 * Because `tweets.html` uses <div ng-controller="SearchController">
 * AngularJS will attempt to instantiate and scope a `SearchController` for
 * the specified <div /> and its descendants.
 *
 *  @author Thomas Burleson, Thierry Chatel
 *
 */
function SearchController($scope, $twitter, $log, $rootScope)
{
	var timerID;	// useful if we every wanted to kill the refresh timer

		// *****************************************************
		// Private methods used by controller features
		// *****************************************************

		function sameCase(value) {
			return $scope.filters.caseSensitive ? value : value.toUpperCase();
		}

		function updateTweets(items, merge) {
				merge = merge || false;
				this.tweets = merge ? items.concat( this.tweets ) : items;
		}

		function isEmpty(value) {
			return (typeof value == 'undefined') || value === '' || value === null || value !== value;
		}

	// *****************************************************
	// $scope variables and methods
	// *****************************************************

	$scope.tweets    =  [ ];
	$scope.selected  =  {};
	$scope.query     =  "angularjs";

	$scope.searching =  false;
	$scope.countDown =  180;

	$scope.filters   =  {
		visible         : false,
		caseSensitive 	: false,
		any				: '',
		text			: '',
		from			: '',

		// Custom filters to match specific fields
		// e.g.
		// 			ng-repeat="tweet in tweets | filter:filters.msgFilter | filter:filters.fromFilter"
		fromFilter : function(item) {
			var partial = sameCase($scope.filters.from);
			var from    = sameCase(item.from_user_name);
			return partial === "" || (from.indexOf(partial) > -1)
		},
		msgFilter  : function(item) {
			var partial = sameCase($scope.filters.text);
			var text    = sameCase(item.text);
			return partial === "" || (text.indexOf(partial) > -1)
		},

		// Self-aware clearing feature
		clear        : function() {

			//$log.log( "filters.clear()" );

			$scope.filters.any	= '';
			$scope.filters.text = '';
			$scope.filters.from	= '';

			// Now hide filters also
			$scope.filters.visible = false;
		}

	};

	/**
	 *	Submit query request to Twitter online service
	 *
	 *  @param searchTerm string contain the topic to be queried.
	 *  @return promise for future response
	 */
	$scope.doSearch  = function (searchTerm) {
		//$log.log("doSearch( '" + searchTerm + " ')");

		$scope.searching = true;

		return $twitter
					.search( searchTerm )
					.then( function( response ){
						var merge = (searchTerm == $scope.refreshURL);

						// Call private merge() method
						angular.bind($scope, updateTweets)(response.items, merge);

						$scope.countDown  = 180;
						$scope.lastQuery  = $scope.query;
						$scope.refreshURL = response.refreshURL;
						$scope.searching  = false;
					})
	};

	/**
	 * hasFilters() is a boolean getter function that simplfies
	 * view-based directives such as `ng-show="hasFilters()`
	 */
	$scope.hasFilters = function() {
		return	!isEmpty( $scope.filters.any) 	||
				!isEmpty( $scope.filters.from) 	||
				!isEmpty( $scope.filters.text);
	};


	/**
	 *  canRefresh() is a boolean getter function that simplfies
	 *  view-based directives such as `ng-hide="canRefresh()"`
	 */
	$scope.canRefresh = angular.bind($scope, function() {
		return 	(this.query !== "") 			&&
				(this.query === this.lastQuery)	&&
				(this.searching != true);
	});


	/**
	 * selectTweet() is used to simulate a radio-group
	 * like feature; where only 1 row may be selected
	 * at any time.
	 */
	$scope.selectTweet = function(tweet) {
		//$log.log("selectTweet( '" + tweet.id + " ')");

		if ( $scope.tweet ) {
			$scope.tweet.isSelected = false;
		}

		if ( tweet ) {
			$scope.tweet = tweet;
			$scope.tweet.isSelected = true;
		}
	};

	// *****************************************************
	// Now perform startup search and initiate the refresh timer
	// *****************************************************

	$scope.doSearch( $scope.query );
	timerID = setInterval( function() {

		 if ( !$scope.searching ){

			 if ( 0 === --$scope.countDown ) {
			 	$scope.doSearch( $scope.query );
			 }

		 	 // If not already digesting, the force watchers to rescan
		 	 if (!$rootScope.$$phase) $rootScope.$digest();
		 }

	}, 1000 );
}
