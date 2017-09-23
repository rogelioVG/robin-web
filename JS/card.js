// Create a Stripe client
var stripe = Stripe('pk_live_4mxodS1urqM170r0EBSO5qG4');
var elements = stripe.elements();

var card = elements.create('card', {
  hidePostalCode: true,
  style: {
    base: {
      iconColor: '#F99A52',
      color: '#32315E',
      lineHeight: '48px',
      fontWeight: 400,
      fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7DF',
      }
    },
  }
});
card.mount('#card-element');

function setOutcome(result) {
  var successElement = document.querySelector('.success');
  var errorElement = document.querySelector('.error');
  successElement.classList.remove('visible');
  errorElement.classList.remove('visible');

  if (result.token) {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    successElement.querySelector('.token').textContent = result.token.id;
    successElement.classList.add('visible');
    createCharge(result.token.id);

  } else if (result.error) {
    errorElement.textContent = result.error.message;
    errorElement.classList.add('visible');
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
  stripe.createToken(card, extraDetails).then(setOutcome);
});

function createCharge(token) {
  $.ajax({
      url: "https://lobby-boy.herokuapp.com/user",
      method: "POST",
      data: {
        stripeToken: token,
        name: "Rogelio Valdes",
        email: "rogelio.vg@icloud.com",
        phone: "8110930503"
      },
      dataType: "json",
      success:function(response) {
        alert(response);
        alert("CSSCS");
      },
      error: function(){
        alert("Connection Failed :(");
      }
    });
}
