'use strict';

const anchors = document.querySelectorAll('.anchor-title');
const menuItems = document.querySelectorAll('.menu-item');
const btnsForms = document.querySelectorAll('.form-show');
const btnSendOrder = document.querySelector('#send-order');

const orderForm = document.querySelector('#order-form');

const modalForm = document.querySelector('#modal-form');
const modalMessage = document.querySelector('#modal-message');
const modalClose = document.querySelectorAll('.mclose');

let formData = {};
orderForm.reset();

$(document).ready(function(){
    $('#carousel-photo').owlCarousel({
        margin: 10,
        loop: true,
        items: 3,
        nav: true,
        dots: false,
        navText: [
            '<img src="img/arrow_left_white.svg" alt="left" title="left" width="20" height="23">',
            '<img src="img/arrow_right_white.svg" alt="left" title="left" width="20" height="23">'
        ]
    })
  });

$(document).ready(function(){
    $('#carousel-video').owlCarousel({
        margin: 10,
        loop: true,
        items: 1,
        nav: true,
        dots: false,
        navText: [
            '<img src="img/arrow_left_gray.svg" alt="left" title="left" width="20" height="23">',
            '<img src="img/arrow_right_gray.svg" alt="left" title="left" width="20" height="23">'
        ]
    })
  });

btnsForms.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalForm.classList.add('is-active');
    });
});

modalClose.forEach((item) => {
    item.addEventListener('click', () => {
        modalForm.classList.remove('is-active');
        modalMessage.classList.remove('is-active');
        document.querySelector('#no-name').classList.add('is-hidden');
        document.querySelector('#no-city').classList.add('is-hidden');
        document.querySelector('#no-email').classList.add('is-hidden');
    });
});

btnSendOrder.addEventListener('click', (e) => {
    e.preventDefault();
    formData = {
        'name': orderForm.elements.name.value,
        'city': orderForm.elements.city.value,
        'email': orderForm.elements.email.value,
        'phone': orderForm.elements.phone.value,
        'comment': orderForm.elements.comment.value
    };
    if (formValidate(formData)) {
        sendOrder(formData)
            .then((result) => {
                if(result) {
                    document.querySelector('#sending-error').classList.add('is-hidden');
                    modalForm.classList.remove('is-active');
                    orderForm.reset();
                    modalMessage.classList.add('is-active');
                } else {
                    document.querySelector('#sending-error').classList.remove('is-hidden');
                }
            });        
    };    
});

//---------------functions---------------------------
function formValidate(formData) {
    let flag = true;
    if(!formData.name) {
        document.querySelector('#no-name').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-name').classList.add('is-hidden');
    };
    if(!formData.city) {
        document.querySelector('#no-city').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-city').classList.add('is-hidden');
    };
    if(!formData.email) {
        document.querySelector('#no-email').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-email').classList.add('is-hidden');
    };
    return flag;
}

async function sendOrder(formData) {
    const response = await fetch ('back.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    });
    return await response.json();
};
