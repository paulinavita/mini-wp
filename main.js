$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks
    draggable: true // Choose whether you can drag to open on touch screens
  }
);

$(document).ready(function () {
  $("#editor").editor();
});