# TwitterSearch - AngularJS

<br/>
This project presents the TwitterSearch HTML5/Javascript application implemented with AngularJS. <br/>Originally presented by Thiery Chatel,
the project improves upon that excellent initial effort.

![Screenshot](https://github.com/ThomasBurleson/angularJS-TwitterSearch/raw/master/webroot/assets/image/snaps/tweetsearch_app.png)<br/>


<br/>
!! [TwitterSearch](http://jsfiddle.net/ThomasBurleson/8Gzj9/) is also live on jsFiddle.net.

---

This implementation improves upon the original with the following features:

*  use of `angular.module()` [main app TwitterSearch.js] to build a custom $twitter service
*  use of `$http` with promises
*  improved SearchController
*  improved skinning [with Twitter Bootstrap library],
*  improved, complex filters and refresh timer,
*  refresh count down, auto-reset, auto-search
*  use of promise [see use of .then()],
*  use of ng-hide/ng-show/,
*  support for enter/return-key to initiate search
*  row selection,
*  and more...

----
This Twitter search application demonstrates two (2) very amazing aspects of AngularJS: injection and databinding.

A  different version of TwitterSearch directly uses `$resource` instead of `$http`. `$resource.get()` actually returns an empty object { } while the asynchronous request is pending. The directive `ng-repeat='tweet in twitterResult.results` actually places databinding on the express `twitterResult.results`.
When the asynch response is received, $resource UPDATES the properties of the empty object { } with the response which - in turn- triggers databinding to process the ng-repeat directive.

Now truth be told, $resource actually uses $http under the hood. And $http uses promises [AngularJS provides a promise/deferred implementation inspired by [Kris Kowal's Q](https://github.com/kriskowal/q)]. So when the $resource promise resolves, then the emtpy object { } is updated. It is the use of databinding that is so amazingly magical in AngularJS... plus promises and injection. 

While that solution uses `$resource`, this one uses $http with promises to create another<a href="http://jsfiddle.net/ThomasBurleson/8Gzj9/" >AngularJS Twitter</a> example... a superior one IMHO.

----

Because TwitterSearch.html uses `<div ng-controller="SearchController">` AngularJS will attempt to instantiate and scope a `SearchController` instance for
the specified `<div />` and its DOM descendants.

In this implementation the $resource is not used; rather the $http service and its support for `promises` is used to transform the data before the controller or the views are notified.
Notice how closures are used to publish a custom `$twitter` service with a single API: `search()`.

A `TwitterSearch()` constructor function configures the angular app module and builds the custom $twitter service (that is injected into the controller). Because the TwitterSearch.html has `<div ng-app="Twitter" >`, we must create a module `Twitter`. Notice how the cross-domain, JSONP call promise handler intercepts and transforms the data prior to delivery to the controller.

Look at the TwitterSearch.html to see how we use the AngularJS directives:

*  ng-hide
*  ng-show
*  ng-click
*  ng-repeat
*  ng-class
*  ng-cloak
*  angular filters


## Directory Layout

    webroot/                  --> all of the files to be used in production

      TwitterSearch.html   --> HTML5 application

	    assets/

        css/              --> css files
          tweets.css      --> default stylesheet

        images/           --> image files

        js/
          
          bootstrap.js        --> asynch loader and initializer (using head.js)
          SearchController.js --> angular controller with $twitter injection and databinding
          TwitterSearch.js    --> application source code []angular.module()]

          lib/
            /angular
                angular.js      --> AngularJS v1.0rc4 IoC Framework
            
            jquery.min.js       --> jQuery v1.7 minified
            load.js             --> asynch script loader
            
    scripts/              
      run.coffee       --> simple NodeJS webserver



## Pending Features

This effort is still ongoing with some in-progress effort that will provide the following features:

*  Provide `loading indicator` as data load indicator
*  Convert disorganized CSS to LESS

## Contact

Stay tuned for upcoming blog article and video on the [GridLinked](http://www.gridlinked.info) blog.<br/>
For more information on angular please check out http://angularjs.org/

