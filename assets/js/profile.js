$(document).ready(function() {
    $(".checkboxValue").click(function(e){
        e.preventDefault();
        console.log("inside jquery");
        var test = new Array();
        $("input[name='ReviewToBeGiven']:checked").each(function() {
            test.push($(this).val());
        });

        alert("My favourite programming languages are: " + test);
    });
});