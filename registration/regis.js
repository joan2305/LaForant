$(document).ready(function() {
    $(".see-button").click(function() {
        $('html, body').animate({
            scrollTop: eval($("#form-section").offset(). top - 70)
        }, 1000);
    });
});