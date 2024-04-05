var app = angular.module('my-app',[]);
app.controller('slider', function($scope){
    $scope.images = [
    
        {
            "imageUrl": "./Images/akaza-upakaza.jpg",
            "imageLink": "https://www.uhdpaper.com/2021/09/akaza-upper-moon-demon-slayer-4k-5961c.html",
            "imageInformation": "Demon Slayer - Akaza"
        },
        {
            "imageUrl": "./Images/luffy.jpg",
            "imageLink": "https://www.uhdpaper.com/2024/04/luffy-scar-one-piece-4k-2643a.html",
            "imageInformation": "One Piece - Luffy"
        },
        {
            "imageUrl": "./Images/goku.jpg",            
            "imageLink": "https://www.uhdpaper.com/2024/04/goku-dragon-ball-4k-2653a.html",
            "imageInformation": "Dragon Ball Z - Goku"
        },
        {
            "imageUrl": "./Images/solo-lvl.jpg",            
            "imageLink": "https://www.uhdpaper.com/2022/05/solo-leveling-anime-sung-jinwoo-4k-4841i.html",
            "imageInformation": "Solo Leveling - Sung JinWoo"
        },
        {
            "imageUrl": "./Images/chrollo.jpg",            
            "imageLink": "https://www.uhdpaper.com/2021/08/chrollo-hunter-x-hunter-4k-5150b.html",
            "imageInformation": "Hunter X Hunter - Chrollo Lucifer"
        },
        {
            "imageUrl": "./Images/twelve-moon.jpg",
            "imageLink": "https://www.uhdpaper.com/2020/09/8976-demon-slayer-twelve-moon-demons.html",
            "imageInformation": "Demon Slayer - Twelve Moon"
        }
     ]
    // async function getAllImages() {
    //     const res = await fetch('./data.json')
    //     const data = await res.json();
    //     addData(data);

    //     // fetch('./data.json')
    //     // .then((res)=>res.json())
    //     // .then((data)=>((tempArr = data)))
    //     // .catch((err)=>console.log(err)) 
    // }
    // function addData(obj){
    //     obj.forEach(element => {
    //         $scope.images.push(element)
    //     });
        
    // }
    // getAllImages()
    console.log('arr',$scope.images)

    const maxVal = 1070
    let interval;
    const vert = function(scrollBar){
        interval = setInterval(function(){
            scrollBar=scrollBar+10
            $('.announcementContainer').scrollTop(scrollBar)
            if(scrollBar>maxVal){
                //clearInterval(vert)
                scrollBar=0
            }
        },100)
    }
    function animate() {
        console.log("Animate")
        $('.announcementContainer').css("overflow-y","hidden")
        let scrollBar = $('.announcementContainer').scrollTop()
        vert(scrollBar);
        $('.announcementContainer').mouseenter(function(){
            $('.announcementContainer').css("overflow-y","scroll")
            clearInterval(interval)
        })
        $('.announcementContainer').mouseleave(function(){
            $('.announcementContainer').css("overflow-y","hidden")
            scrollBar = $('.announcementContainer').scrollTop()
            vert(scrollBar)
        })

    }
    $(document).ready(function() {
        animate();
    })
})