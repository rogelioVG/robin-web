// Create a Stripe client ‎5579 0900 1953 3885
var stripe = Stripe('pk_live_4mxodS1urqM170r0EBSO5qG4');
var elements = stripe.elements();

var card = elements.create('card', {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#F99A52',
      color: '#32315E',
      lineHeight: '100px',
      fontWeight: 400,
      fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
      fontSize: '1.5em',
      '::placeholder': {
        color: '#CFD7DF',
      }
    },
  }
});
card.mount('#card-element');

function setOutcome(result) {
  // var successElement = document.querySelector('.success');
  // var errorElement = document.querySelector('.error');
  // successElement.classList.remove('visible');
  // errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    alert(result.token.id);
    // successElement.querySelector('.token').textContent = result.token.id;
    // successElement.classList.add('visible');
    createCharge(result.token.id);

  } else if (result.error) {
    alert(result.error.message);
    // errorElement.textContent = result.error.message;
    // errorElement.classList.add('visible');

  }
}

card.on('change', function(event) {
  setOutcome(event);
});

document.querySelector('center').addEventListener('submit', function(e) {

  e.preventDefault();
  var form = document.querySelector('form');
  var extraDetails = {
    name: form.querySelector('input[name=cardholder-name]').value
  };
  alert("CACACA");
  stripe.createToken(card, extraDetails).then(setOutcome);

});

$('.create-card').on('click', function() {
  
  stripe.createToken(card).then(setOutcome);

})

function createCharge(token) {

  var $name = $(".nameTextField").val();
  var $email = $(".emailTextField").val();
  alert(token);
  alert($email);

  $.ajax({
      url: "https://lobby-boy.herokuapp.com/user",
      method: "POST",
      type: "POST",
      xhrFields: {
        withCredentials: true
      },
      data: {
        'stripeToken': token,
        'name': $name,
        'email': $email,
      },
      dataType: "jsonp",
      success:function(response) {
        alert(response);
        alert("CSSCS");
      },
      error: function(response){
        alert("Connection Failed :(");
        alert(response);
      }
    });
}
