'use strict';

const anchors = document.querySelectorAll('.anchor-title');
const menuItems = document.querySelectorAll('.menu-item');
const btnsForms = document.querySelectorAll('.form-show');
const btnSendOrder = document.querySelector('#send-order');
const btnFeedback = document.querySelector('#button-feedback');
const btnSendFeedback = document.querySelector('#send-feedback');

const orderForm = document.querySelector('#order-form');
const feedbackForm = document.querySelector('#feedback-form');

const modalForm = document.querySelector('#modal-form');
const modalFeedback = document.querySelector('#modal-feedback');
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
            '<img src="img/arrow_left_gray.svg" alt="left" title="left" width="40" height="43">',
            '<img src="img/arrow_right_gray.svg" alt="left" title="left" width="40" height="43">'
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
        video: true,
        navText: [
            '<img src="img/arrow_left_gray.svg" alt="left" title="left" width="40" height="43">',
            '<img src="img/arrow_right_gray.svg" alt="left" title="left" width="40" height="43">'
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
        modalFeedback.classList.remove('is-active');
        modalMessage.classList.remove('is-active');
        document.querySelector('#no-name').classList.add('is-hidden');
        document.querySelector('#no-city').classList.add('is-hidden');
        document.querySelector('#no-email').classList.add('is-hidden');
        document.querySelector('#no-phone').classList.add('is-hidden');

        document.querySelector('#no-name-feedback').classList.add('is-hidden');
        document.querySelector('#no-city-feedback').classList.add('is-hidden');
        document.querySelector('#no-email-feedback').classList.add('is-hidden');
        document.querySelector('#no-phone-feedback').classList.add('is-hidden');
        document.querySelector('#no-address-feedback').classList.add('is-hidden');
        document.querySelector('#no-photo-feedback').classList.add('is-hidden');
        document.querySelector('#no-comment-feedback').classList.add('is-hidden');
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

btnFeedback.addEventListener('click', () => {
    modalFeedback.classList.add('is-active');
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formData = new FormData(feedbackForm);

    sendFeedback(formData)
        .then((result) => {
            if(result) {
                document.querySelector('#sending-error-feedback').classList.add('is-hidden');
                modalFeedback.classList.remove('is-active');
                feedbackForm.reset();
                modalMessageText.innerText = 'Отзыв отправлен';
                modalMessage.classList.add('is-active');
            } else {
                document.querySelector('#sending-error-feedback').classList.remove('is-hidden');
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

function feedbackValidate(formData) {
    let flag = true;
    if(!formData.name) {
        document.querySelector('#no-name-feedback').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-name-feedback').classList.add('is-hidden');
    };
    if(!formData.city) {
        document.querySelector('#no-city-feedback').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-city-feedback').classList.add('is-hidden');
    };
    if(!formData.email) {
        document.querySelector('#no-email-feedback').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-email-feedback').classList.add('is-hidden');
    };
    if(!formData.phone) {
        document.querySelector('#no-phone-feedback').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-phone-feedback').classList.add('is-hidden');
    };
    if(!formData.address) {
        document.querySelector('#no-address-feedback').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-address-feedback').classList.add('is-hidden');
    };
    if(!formData.comment) {
        document.querySelector('#no-comment-feedback').classList.remove('is-hidden');
        flag = false;
    } else {
        document.querySelector('#no-comment-feedback').classList.add('is-hidden');
    };
    return flag;
}

async function sendOrder(formData) {
    const response = await fetch ('back.php', {
        method: 'POST',
        body: formData
    });
    return await response.json();
};

async function sendFeedback(formData) {
    const response = await fetch ('back.php', {
        method: 'POST',
        body: formData
    });
    return await response.json();
};
