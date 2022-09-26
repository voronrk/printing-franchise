'use strict';

const anchors = document.querySelectorAll('.anchor-title');
const menuItems = document.querySelectorAll('.menu-item');
const btnsSendOrder = document.querySelectorAll('.send-order');

const modal = document.querySelector('#modal');
const modalClose = document.querySelectorAll('.mclose');

btnsSendOrder.forEach((btn) => {
    btn.addEventListener('click', () => {
        modal.classList.add('is-active');
    });
});

modalClose.forEach((item) => {
    item.addEventListener('click', () => {
        modal.classList.remove('is-active');
    });
});






if ((target.className=='modal-background') || (target.id=='modal-close')) {
    modal.classList.remove('is-active');
};


// function selectMenuItem(selectedItem) {
//     menuItems.forEach((item) => {
//         item.classList.remove('has-text-weight-bold');
//         if(item.href == selectedItem) item.classList.add('has-text-weight-bold');
//     });
// }

// menuItems.forEach((menuItem) => {
//     console.log(menuItem.href);
//     menuItem.addEventListener('click', (e) => {
//         selectMenuItem(e.target.href);
//     });
// });