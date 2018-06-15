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
            
            }.then((res) => {
                let make = response.Results[0].Make;
                let model = response.Results[0].Model;
                let year = response.Results[0].ModelYear;
                console.log(make, model, year)
                res.render('index', {
                    make: make,
                    model: model,
                    year: year
                })
            })
        
        })
    }

    $(".btn-inbox").click(function (e) {
        e.preventDefault()
        if ( $(this).parent().find( ".card-body" ).is( ":hidden" ) ) {
          $(this).parent().find( ".card-body" ).slideDown( "slow" );
          $(this).text('CLOSE');
          $(this).parent(".card").addClass('clicked');
          $(this).parent().find("h5.card-title").addClass('clicked');
          $(this).parent().find(".card-img-overlay").addClass('clicked');
        } else {
          $(this).parent().find( ".card-body" ).slideUp("slow");
          $(this).text('INBOX');
          $(this).parent(".card").removeClass('clicked');
          $(this).parent().find("h5.card-title").removeClass('clicked');
          $(this).parent().find(".card-img-overlay").removeClass('clicked');
        }
      });


});