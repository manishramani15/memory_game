function MemoryGame(mainContainer, startButton) {
  this.mainContainer = mainContainer;
  this.startButton = startButton;
  this.imgArr = [];
  this.intArray = [];
  this.imageContainerArray = [];
}

MemoryGame.prototype.init = function() {
  this.fetchImages();
  this.startEventHandler();
};

MemoryGame.prototype.startEventHandler = function() {
  this.startButton.on("click", this.createContainers.bind(this));
};

MemoryGame.prototype.fetchImages = function() {
  for (var i = 0; i < 36; i++) {
    this.intArray.push(i);
    if (i < 18) {
      this.imageContainerArray.push($('<img>', {
        'src': 'image_' + i + '.jpg',
        'data-image-index': i
      }));
      this.imageContainerArray.push($('<img>', {
        'src': 'image_' + i + '.jpg',
        'data-image-index': i
      }));
    }
  }
};

MemoryGame.prototype.createContainers = function(event) {
  this.startButton.hide();
  this.startTimer();
  for (var i = 0; i < 36; i++) {
    $('<div>', {
        'data-type': 'img-container',
        'data-index': i
      }).addClass("boxContainer")
      .appendTo(this.mainContainer);
  }
  for (i = this.intArray.length; i--;) {
    var random = this.intArray.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    $('[data-index=' + random + ']').append(this.imageContainerArray[i]);
  }

  $('img').hide();
  this.imageEventHandler();
};

MemoryGame.prototype.startTimer = function() {
  setTimeout(function() {
    $('[data-type="img-container"]').unbind();
    alert("Time Over");
  }, 120000);
};

MemoryGame.prototype.imageEventHandler = function() {
  var _this = this;
  $('[data-type="img-container"]').on("click", function(event) {
    var imageIndex = $(event.target).find('img').data('image-index');
    if (imageIndex === undefined) {

    } else {
      if (_this.imgArr.length === 0) {
        _this.imgArr.push(imageIndex);
        $(event.target).find('img').show();
      } else {
        var present = $.inArray(imageIndex, _this.imgArr);
        if (present == -1) {
          $('[data-image-index="' + _this.imgArr[0] + '"]').fadeOut();
          $(event.target).find('img').show().fadeOut();
        } else {
          $(event.target).find('img').show();
        }
        _this.imgArr = [];
      }
    }
  });
};

$(function() {
  var mainContainer = $('[data-behaviour="container"]'),
    startButton = $('[data-type="button"]'),
    memoryGame = new MemoryGame(mainContainer, startButton);
  memoryGame.init();
});