'use strict';

const anchors = document.querySelectorAll('.anchor-title');
const menuItems = document.querySelectorAll('.menu-item');
const btnsForms = document.querySelectorAll('.form-show');
const btnSendOrder = document.querySelector('#send-order');

const orderForm = document.querySelector('#order-form');

const modalForm = document.querySelector('#modal-form');
const modalMessage = document.querySelector('#modal-message');
const modalMessageText = document.querySelector('#modal-message-text');
const modalClose = document.querySelectorAll('.mclose');

let formData = {};
orderForm.reset();

$(document).ready(function(){
    $('#carousel-photo').owlCarousel({
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            640: {
                items: 2
            },
            768: {
                items: 3
            }
        },
        navText: [
            '<img src="img/arrow_left.png" alt="left" title="left" width="40" height="43">',
            '<img src="img/arrow_right.png" alt="left" title="left" width="40" height="43">'
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
        document.querySelector('#no-phone').classList.add('is-hidden');
    });
});

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(orderForm);

    sendOrder(formData)
        .then((result) => {
            if(result) {
                document.querySelector('#sending-error').classList.add('is-hidden');
                modalForm.classList.remove('is-active');
                orderForm.reset();
                modalMessageText.innerText = 'Заявка отправлена';
                modalMessage.classList.add('is-active');
            } else {
                document.querySelector('#sending-error').classList.remove('is-hidden');
            }
        });
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
    if(!formData.phone) {
        document.querySelector('#no-phone').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-phone').classList.add('is-hidden');
    };
    return flag;
}

async function sendOrder(formData) {
    const response = await fetch ('https://api.printing.ru/api/mailable/partner/franchise', {
        method: 'POST',
        body: formData
    });
    return await response.json();
};
