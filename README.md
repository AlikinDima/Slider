# Slider

Slider 0.1v - simple pure javascript slider.

## COMMENT

I am a beginner developer, it is very important for me to have feedback about my code.
If you have the opportunity to try my project and write a review/advice, please do so. It's important for me.

## INSTALL

Сonnect to site:
* include js file
* include css file
 
## GET START
1. paste your page in prepared container this code

        <div class="sliderOne">
            <div class="adslide-wrapper">
                <ul class="adslide-list">
                    <li class="adslide__element"><div class="content"><h1>1 Slide</h1></div></li>
                    <li class="adslide__element"><div class="content"><h1>2 Slide</h1></li>
                    <li class="adslide__element"><div class="content"><h1>3 Slide</h1></li>
                    <li class="adslide__element"><div class="content"><h1>4 Slide</h1></li>
                </ul>
            </div>
        </div>

2. create a new Slider object

        let slider = new Slider(".adslider", 3);
        
## SETTING

### Required parameters
1. first parameter -  slider class name: 

        new Slider(".adslider", 3);
        
2. second parameter - elements amount:

        new Slider(".adslider", 3);

### Additional parameters

3. Setting:
        new Slider(".sliderOne", 3, autoplay = false, dots = true, button = true);
        
   * autoplay:  autoscroll elements,
   * dots:      view/hide dots,
   * button:    view/hide button;
