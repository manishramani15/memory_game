function MemoryGame(options) {
  this.mainContainer = options.mainContainer;
  this.startButton = options.startButton;
  this.numberOfBoxes = options.numberOfBoxes;
  this.timeForTimer = options.timeForTimer;
  this.imgArr = [];
  this.intArray = [];
  this.imageContainerArray = [];
}

MemoryGame.prototype.init = function() {
  this.fetchImages();
  this.bindEvents();
};

MemoryGame.prototype.bindEvents = function() {
  this.startButton.on('click', this.startEventHandler.bind(this));
  this.mainContainer.on('click', '[data-type="img-container"]', this.imageEventHandler.bind(this));
};

MemoryGame.prototype.pushImageToContainer = function(index) {
  this.imageContainerArray.push($('<img>', {
    'src': './images/image_' + index + '.jpg',
    'data-image-index': index
  }));
};

MemoryGame.prototype.fetchImages = function() {
  var index = 0;
  while (index < this.numberOfBoxes) {
    this.intArray.push(index);
    if (index < (this.numberOfBoxes / 2)) {
      this.pushImageToContainer(index);
      this.pushImageToContainer(index);
    }
    index++;
  }
};

MemoryGame.prototype.startEventHandler = function() {
  this.startButton.hide();
  this.startTimer();
  this.createContainers();
  this.distributeImagesAtRandom();
  this.imageEventHandler();
};

MemoryGame.prototype.distributeImagesAtRandom = function() {
  while (index = this.intArray.length) {
    var random = this.intArray.splice(Math.floor(Math.random() * (index + 1)), 1)[0];
    $('[data-index=' + random + ']').append(this.imageContainerArray[index]);
    index--;
  }
  this.mainContainer.find('img').hide();
};

MemoryGame.prototype.createContainers = function(event) {
  var index = 0,
  tempContainer = $('<div>');
  while (index < this.numberOfBoxes) {
    $('<div>', {
      'data-type': 'img-container',
      'data-index': index
    }).addClass("boxContainer")
    .appendTo(tempContainer);
    index++;
  }
  this.mainContainer.append(tempContainer.find('div'));
};

MemoryGame.prototype.startTimer = function() {
  var _this = this;
  this.timeOut = setTimeout(function() {
    _this.mainContainer.unbind();
    alert("Time Over");
  }, this.timeForTimer * 1000);
};

MemoryGame.prototype.imageEventHandler = function(event) {
  var eventTarget = $(event.target),
  imageIndex = eventTarget.find('img').data('image-index');
  this.imageOperation(eventTarget, imageIndex);
};

MemoryGame.prototype.imageOperation = function(target, imageIndex) {
  if (imageIndex !== undefined) {
    if (this.imgArr.length === 0) {
      this.imgArr.push(imageIndex);
      target.find('img').show();
    } else {
      var present = $.inArray(imageIndex, this.imgArr);
      if (present == -1) {
        $('[data-image-index="' + this.imgArr[0] + '"]').delay(2000).fadeOut();
        target.find('img').show().delay(2000).fadeOut();
      } else {
        target.find('img').show();
        this.ifWon();
      }
      this.imgArr = [];
    }
  }
};

MemoryGame.prototype.ifWon = function() {
  var hidden = $('[data-type="img-container"] img:hidden').length;
  if (hidden === 0) {
    clearTimeout(this.timeOut);
    $('[data-type="img-container"]').unbind();
    alert("You Won.!");
  }
};

$(function() {
  var options = {
    mainContainer: $('[data-behaviour="container"]'),
    startButton: $('[data-type="button"]'),
    numberOfBoxes: 36,
    timeForTimer: 12,
  },
  memoryGame = new MemoryGame(options);
  memoryGame.init();
});