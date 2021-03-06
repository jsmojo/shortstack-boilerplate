var SpaceOddity = (function () {
    //Define Params:
    //GridName = Main grid name that all cubes get appended to
    //generalSQ = Default cube CSS class that each cube will get assigned
    //targetSQ = Each square will use this CSS class and then append a unique number to it
    function SpaceOddity(gridName, generalSQ, targetSQ) {
        this.grid = gridName;
        this.generalSq = generalSQ;
        this.targetSq = targetSQ;
        this.size = this.getSQSize();
        this.count = this.getGridCount();
        this.createGrid();
    }
    //Step 1  - get the size of the square
    SpaceOddity.prototype.getSQSize = function () {
        var width = $(window).width();
        if (width < 800) {
            width = width / 19;
        }
        else if (width < 1500) {
            width = width / 28;
        }
        else if (width < 1800) {
            width = width / 35;
        }
        else if (width < 2000) {
            width = width / 40;
        }
        else {
            width = 100;
        }
        this.size = width;
        return width;
    };
    //Step 2 - returns the amount of cubes to show on the page
    SpaceOddity.prototype.getGridCount = function () {
        //console.log('getGridCount');
        return Math.floor($(window).width() / this.size) * Math.floor($(window).height() / this.size);
    };
    //Step 3
    //remove - calls boxGenerator to give initial count of cubes.
    SpaceOddity.prototype.createGrid = function () {
        //console.log('createGrid');
        this.boxGenerator(0, this.count - 1);
    };
    //Step 4 - Adds new cubes to the page. 
    SpaceOddity.prototype.boxGenerator = function (startIndex, stopIndex) {
        //console.log('boxGenerator');
        var fragment = document.createDocumentFragment();
        for (var i = startIndex; i <= stopIndex; i++) {
            var box = document.createElement('div');
            box.className += this.generalSq + " " + this.targetSq + "_" + i;
            $(box).attr('data-color', this.colorGenerator());
            //box.style.width = this.size + "px";
            //box.style.height = this.size + "px";
            $('.' + this.generalSq).css({
                'width': this.size,
                'height': this.size
            });
            $(box).css('background-color', 'hsl(' + $(box).attr('data-color') + ',100%,50%)');
            $(fragment).append(box);
        }
        $('.' + this.grid).append(fragment);
    };
    //Step 5 - gives an initial color for each cube.
    SpaceOddity.prototype.colorGenerator = function () {
        //console.log('colorGenerator');
        return Math.floor(Math.random() * (360 - 0)) + 0;
    };
    //Step 6 - hides then calls box Generator to show less,more or the same amount of cubes on the page. 
    SpaceOddity.prototype.underPressure = function () {
        //console.log('underPressure');
        $('.' + this.generalSq).addClass('💔💕');
        $('.' + this.generalSq).css({
            'width': this.size,
            'height': this.size
        });
        var currentCount = this.getGridCount();
        $('.' + this.generalSq).removeClass('💔💕');
        if (this.count < currentCount) {
            if (currentCount > $('.' + this.generalSq).length) {
                console.log('** need more');
                this.boxGenerator(this.count + 1, currentCount);
            }
            else {
                console.log('** displaying some');
                for (var i = this.count + 1; i <= currentCount; i++) {
                    $('.' + this.targetSq + '_' + i).removeClass('😭🌧😢🌧');
                    $('.' + this.targetSq + '_' + i).css('display', 'block');
                }
            }
        }
        else if (this.count > currentCount) {
            console.log('** hiding some');
            for (var i = currentCount; i <= this.count; i++) {
                $('.' + this.targetSq + '_' + i).css('display', 'none');
            }
        }
        else {
            console.log('** the same');
        }
        this.count = currentCount;
    };
    //Step 7  - somehow set's dispay hover
    SpaceOddity.prototype.starman = function () {
        //console.log('starman');
        var randomBananas = [], currentBananas = [], bananas;
        for (var i = 0; i <= this.count / 1.8; i++) {
            randomBananas.push("." + this.targetSq + "_" + Math.floor(Math.random() * this.count));
        }
        while (randomBananas.length) {
            var length_1 = randomBananas.length;
            currentBananas = randomBananas.splice(length_1 - 50);
            bananas = currentBananas.join(",");
            (function (bananas) {
                setTimeout(function () {
                    $(bananas).css('opacity', '.3');
                }, Math.floor(Math.random() * (1500 - 1000)) + 1000);
                setTimeout(function () {
                    $(bananas).css('opacity', '');
                }, Math.floor(Math.random() * (3500 - 1800)) + 1800);
            })(bananas);
        }
    };
    //Step 8 - adding event handles to cubes Hover
    SpaceOddity.prototype.fashion = function () {
        //console.log('fashion');
        $('.' + this.generalSq).on('mouseenter', function () {
            $(this).addClass('🌋🌌🌙');
        }).mouseleave(function () {
            $(this).attr('data-color', parseInt($(this).attr('data-color')) + 50);
            $(this).css('background-color', 'hsl(' + $(this).attr('data-color') + ',100%, 50%)');
            $(this).removeClass('🌋🌌🌙');
        });
    };
    SpaceOddity.prototype.displayCubes = function () {
        this.getSQSize();
        this.underPressure();
        this.starman();
        this.fashion();
    };
    return SpaceOddity;
}());
$(function () {
    var heroes = new SpaceOddity('🌊🌊', '😍🔥😍', '💦💥💦');
    var timerElement;
    heroes.displayCubes();
    $(window).on('resize', function () {
        //console.log('resize listening');
        clearTimeout(timerElement);
        timerElement = setTimeout(function () {
            //console.log('resize Start');
            heroes.displayCubes();
            //console.log('resize finish');
        }, 250);
    });
});
