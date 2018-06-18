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

    // var registerUser = () =>{
    //     let user = $("#signup-email").val();
    //     let pass = $("#signup-password").val();
    //     let vin = $("#vin").val();
    //     let plate = $("#licenseplate").val();
    //     $.get({
    //         url: `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`,
    //         method: "GET",
    //         success: function (response) {
    //             let make = response.Results[0].Make;
    //             let model = response.Results[0].Model;
    //             let year = response.Results[0].ModelYear;
            
    //         }.then((res) => {
    //             let make = response.Results[0].Make;
    //             let model = response.Results[0].Model;
    //             let year = response.Results[0].ModelYear;
    //             console.log(make, model, year)
    //             res.render('index', {
    //                 make: make,
    //                 model: model,
    //                 year: year
    //             })
    //         })
        
    //     })
    // }

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



      var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
});