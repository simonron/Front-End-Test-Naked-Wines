
window.addEventListener("click", function (n) {
    console.log(n)
}, !1);

$(document).ready(function () {
    $("div.popupimage").click(function (event) {
        event.preventDefault();
        $('.modal img').attr('src', $(this).attr('href'));
        $('.modal').modal('show');
        //$('body').width('100vw');
    });
});
