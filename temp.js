app.directive('sliderImage', ['O365RestFactory', function (O365RestFactory) {
    return {
        restrict: 'E',
        template: '<div class="scrollableAnnouncement">\
        <ul class="announcementContainer" id="content-div" ng-mouseenter="handleMouseEnter()" ng-mouseleave="handleMouseLeave()">\
        <li class="announcementList" ng-repeat="image in images">\
      <div class="announcementDetails">\
        <div class="imageSection">\
          <img class="announcementImage" src="{{image.ImageUrl | picture}}" data-themekey="#" alt="" />\
        </div>\
        <div class="contentSection">\
         <a class="announcementTitle" href="{{image.LinkUrl | hyperlink}}">\
           <div class="announcementContent">{{image.Information}}</div>\
         </a>\
          <div class="announcementDate">{{image.PublishedOn?(image.PublishedOn | date:  \'dd MMM\') : (image.Created | date :  \'dd MMM\')}}</div>\
        </div>\
      </div>\
      <hr>\
  </li>\
</ul>\
</div>',
        controller: function ($scope) {
            $scope.images = [];
            var imageListName = 'HomePageCarousel';
            var animationOffset = 0;
            var contentHeight = 0;
            var containerHeight = 0;
            var interval = 0;
            var timer = 0;
            $scope.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
            $scope.currentIndex = 0;
            $scope.isAutoScrollEnabled = true;


            function animateContent() {
                if (Math.abs(animationOffset) < Math.abs(contentHeight - containerHeight + 50)) {
                    animationOffset -= 50;
                    $('#content-div').animate({ "marginTop": animationOffset + "px" }, 3000);
                }
                else {
                    animationOffset = 0;
                    $('#content-div').animate({ "marginTop": animationOffset + "px" }, 2000);
                }
            }

            function start() {
                timer = setTimeout(function () {
                    animateContent();
                }, 1000);
            }

            function restartTimer() {
                animationOffset = 0;
                contentHeight = $('#content-div').height();
                containerHeight = $('.sliderWrap').height();
                if (contentHeight > containerHeight) {
                    interval = setInterval(function () {
                        start();
                    }, 1000);
                }
            }
            function pauseAnimation() {
                var announcementList = document.querySelector('.announcementContainer');
                announcementList.style.animationPlayState = 'paused';
            }

            function resumeAnimation() {
                var announcementList = document.querySelector('.announcementContainer');
                announcementList.style.animationPlayState = 'running';
            }

            var getAllImages = function () {
                var imageResource = {
                    ListName: imageListName,
                    Filter: 'ShowInHomePage eq 1',
                    OrderBy: 'SortOrder'
                }
                O365RestFactory.getListItems(imageResource).then(function (response) {
                    $scope.images = response.data.value;
                    // if ($scope.images.length > 0) {
                    //     restartTimer();
                    // }
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    //   setTimeout(function () {
                    //             restartTimer();
                    //         }, 1000);




                    $scope.handleMouseEnter = function () {
                        $scope.isAutoScrollEnabled = false;
                        pauseAnimation();
                    };

                    $scope.handleMouseLeave = function () {
                        $scope.isAutoScrollEnabled = true;
                        $scope.isAutoScrollEnabled = true;
                        resumeAnimation();
                        // setTimeout(function () {
                        //     $scope.currentIndex = ($scope.currentIndex + ($scope.images.length + 2) % $scope.images.length);
                        // }, 1000);
                    };

                });
            }

            getAllImages();


        }
    };
}])