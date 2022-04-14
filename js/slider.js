class Dots{
  
  wrapper;
  elements;

  get wrapper() {
    return this.wrapper;
  }

  constructor(amount){
    this.elements = this.createElements(amount);
    this.wrapper = this.createWrapper();
  }

  createElements(amount){
    let dots =[];
    for (let i = 0; i < amount; i++) {
      dots.push(document.createElement('div'));
      dots[i].classList.add('dots-wrapper__elements');
      dots[i].setAttribute('indexDots', i);
    }
    return dots;
  }

  createWrapper() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('adslide__dots-wrapper');
    return wrapper;
  }

  render(globalContainer){
    globalContainer.append(this.wrapper);
    this.wrapper.append(...this.elements);
  }

  switchStatus(prevIndex, nextIndex){
    this.elements[prevIndex].classList.remove('active');
    this.elements[nextIndex].classList.add('active');
  }
}

class Button{
  wrapper;
  elements;
  
  constructor(){
    this.wrapper = this.createWrapper();
    this.elements = this.createElements();
  }

  createWrapper() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('adslide__key-wrapper');
    return wrapper;
  }

  createElements(){
    let elem = {};

    elem.left = document.createElement('div');
    elem.left.classList.add('adslide__key-left');

    elem.right = document.createElement('div');
    elem.right.classList.add('adslide__key-right');
    
    return elem;
  }

  render(globalContainer){
    document.querySelector(`${globalContainer} .adslide-wrapper`).prepend(this.wrapper);
    this.wrapper.append(...[this.elements.left,this.elements.right]);
  }

}

class Slider {

  container;
  nameContainer;

  widthSlide;

  list;

  indexActiveElement;

  constructor(container = ".adslide", firstElement = 0, autoplay = false, dots = true, button = true) {
    this.setting = {
      firstSlide: firstElement,
      dots: dots,
      button: button,
      autoplay: autoplay
    };

    this.nameContainer = container;
    this.container = document.querySelector(`${container}`);
    this.widthSlide = this.container.offsetWidth;

    this.list = document.querySelector(`${container} .adslide-list`);

    this.countElement = document.querySelectorAll(`${container} .adslide__element`).length;

    this.indexActiveElement = firstElement;

    this.mount();

  }


  mount() {
    if(!this.container.classList.contains('adslide')){
      this.container.classList.add('adslide');
    }

    this.checkStartPosition();

    this.acceptSetting();

    this.checkResize();
  }

  acceptSetting(){
    if(this.setting.button){
      this.createButton();
    }
    
    if(this.setting.dots) {
      this.createDots(this.countElement);
      this.dots.switchStatus(0, this.indexActiveElement);
    }

    if(this.setting.autoplay){
      this.autoplay();
    }
  }

  createButton(){
    this.button = new Button();
    this.button.render(this.nameContainer);
    this.createEventsButton();
  }

  createEventsButton(){
    this.button.elements.left.addEventListener('click', (e) => {
      this.prevSlide();
    });

    this.button.elements.right.addEventListener('click', (e) => {
      this.nextSlide();
    });
  }

  createDots(amountDots){
    this.dots = new Dots(amountDots);
    this.dots.render(this.container);
  }

  checkStartPosition() {
    if(this.indexActiveElement < this.countElement && this.indexActiveElement > 0) {
      this.setPosition(this.indexActiveElement);
    } else {
      this.indexActiveElement =  0;
    }
  }

  checkResize(){
    window.addEventListener(`resize`, event => {
      this.widthSlide = this.container.offsetWidth;
      this.setPosition(this.indexActiveElement);
    });
  }

  setPosition(indexElem) {    
    this.widthSlide = this.container.offsetWidth;
    let position = indexElem * this.widthSlide ;
    this.list.style.transform = `translate(${-position}px)`;
  }

  prevSlide() {
    let prevIndex = this.indexActiveElement;
    if (this.indexActiveElement == 0) {
      this.indexActiveElement = this.countElement - 1;
      this.setPosition(this.indexActiveElement);
    } else {
      this.setPosition(--this.indexActiveElement);
    }
    this.dots.switchStatus(prevIndex, this.indexActiveElement);
  }

  nextSlide() {
    let prevIndex = this.indexActiveElement;
    if (this.indexActiveElement == this.countElement - 1) {
      this.indexActiveElement = 0;
      this.setPosition(this.indexActiveElement);
    }else {
      this.setPosition(++this.indexActiveElement);
    }
    this.dots.switchStatus(prevIndex, this.indexActiveElement);
  }

  autoplay(){
    setInterval(() => {
      if(this.setting.autoplay){
        this.nextSlide();
      }
    },2000);
    this.checkHoverOnSlider();
  }

  checkHoverOnSlider(){
    this.container.addEventListener('mouseover',(event) => {
      this.setting.autoplay = false;

    });

    this.container.addEventListener('mouseout',(event) => {
      this.setting.autoplay = true;
    });
  }
}