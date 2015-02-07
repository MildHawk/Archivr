/**
 * AngularJS directives for social sharing buttons - Facebook Like, Google+, Twitter and Pinterest 
 * @author Jason Watmore <jason@pointblankdevelopment.com.au> (http://jasonwatmore.com)
 * @version 1.0.0
 */

/* jshint ignore:start */
  angular
    .module('Archivr.directives.angulike', []);

    .directive('tweet', [
      '$window', function ($window) {
        return {
          restrict: 'A',
          scope: {
            tweet: '='
          },
          link: function (scope, element, attrs) {
            if (!$window.twttr) {
              // Load Twitter SDK if not already loaded
              $.getScript('http://platform.twitter.com/widgets.js', function () {
                renderTweetButton();
              });
            } else {
              renderTweetButton();
            }

            var watchAdded = false;
            function renderTweetButton() {
              if (!scope.tweet && !watchAdded) {
                // wait for data if it hasn't loaded yet
                watchAdded = true;
                var unbindWatch = scope.$watch('tweet', function (newValue, oldValue) {
                  if (newValue) {
                    renderTweetButton();
                    // only need to run once
                    unbindWatch();
                  }
                });
                return;
              } else {
                element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="' + scope.tweet + '">Tweet</a>');
                $window.twttr.widgets.load(element.parent()[0]);
              }
            };
          };
        };
      };
    ]);
/* jshint ignore:end */
