$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   

    $('#pedestrian-mode').click(()=>{
        if ($('#pedestrian-mode').is(":checked"))  {
            $('#vehicle-info').hide();
        } else {
            $('#vehicle-info').show();
        }
    })
    
    $('#signup-button').on('click', function (event) {
    event.preventDefault();
    registerUser();
    });

    var registerUser = () =>{
        let user = $("#signup-email").val();
        let pass = $("#signup-password").val();
        let vin = $("#vin").val();
        let plate = $("#licenseplate").val();
        $.get({
            url: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`,
            method: "GET",
            success: function (response) {
                let make = response.Results[0].Make;
                let model = response.Results[0].Model;
                let year = response.Results[0].ModelYear;
            
            // }.then(() => {
                console.log(make, model, year)
            }
        
        });
    }
});