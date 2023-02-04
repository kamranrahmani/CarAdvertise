const images = document.getElementById('slides').children;
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const counter = document.getElementById('counter');

nextButton.addEventListener('click',()=>{showImages(1)});
prevButton.addEventListener('click',()=>{showImages(-1)});

let slideIndex = 0;
showImages(slideIndex);

function showImages(n){
    slideIndex += n;
    if(slideIndex == images.length){slideIndex = 0};
    if(slideIndex < 0){slideIndex = images.length - 1};
    counter.textContent = `${slideIndex+1}/${images.length}`;
    for(let i = 0; i < images.length; i++){
        images[i].classList.add('hidden');
    }
    images[slideIndex].classList.remove('hidden');
}
