$(document).ready(function() {
    $(".see-button").click(function() {
        $('html, body').animate({
            scrollTop: eval($("#system-req-section").offset(). top - 70)
        }, 1000);
    });
});