
function clickFunction2(){
  let url = "savory_pancakes.html";
  window.location.href = url;
}

function clickFunction(){
    let url = "sweet_pancakes.html";
    window.location.href = url;
}


/*popup*/

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal) 
  })
})


overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active') 
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}



function ShowContact() {
  var T = document.getElementById("hideDiv"),
  displayValue = "";
  if (T.style.display == "") 
    displayValue = "none"; 

  T.style.display = displayValue; 
}


function menuHamburger() {
  var x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } 
  else {
    x.className = "navbar";
  }
}


/*slideshow*/
let slideIndex = 1;
showSlides(slideIndex);
                
function plusSlides(n) {
  showSlides(slideIndex += n);
}
                
function currentSlide(n) {
    showSlides(slideIndex = n);
}
                
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1
    }

    if (n < 1) {
      slideIndex = slides.length 
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
        
    }
    
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}