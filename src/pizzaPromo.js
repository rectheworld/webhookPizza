var axios = require('axios');
var qs = require('qs');


async function orderPizza (data) {
  // Init the state of the Pizza
  let pizzaStatus  = {status: 'no pizza'}
  // Confirm that the
  const cleanData = validateData(data);

  // Check if the location is in NYC
  if (!isNyCity(data)) {
    /// TODO Inprove response here
    return (pizzaStatus)
  }

  // Determine if the visitor spoke "pizza"
  if (!detectPizzaString(data.items)) {
    return (pizzaStatus)
  }

  // Order the Pizza
  // Collect the data nessasary to triangleate the location
  const orderData = {
    emailAddress: data.visitor.emailAddress,
    phoneNumber: data.visitor.phoneNumber }


  let orderStatus = await placeOrder(orderData);

  /// Dont love the magicstring but not sure what errors might look like
  if (orderStatus === 'pizza time!') {
    console.log(`Successfully ordered pizza for ${orderData.emailAddress}`)
    pizzaStatus.status = "pizza"
    return (pizzaStatus)
  } else {
    console.log(`Error: could not ordered pizza for ${orderData.emailAddress}. Pizza partner failed with Error ${orderStatus}`)
    pizzaStatus.error = orderStatus
    return (pizzaStatus)
  }

}

function isNyCity (data) {
  try {
    if ((data.visitor.country === 'United States' || data.visitor.country === 'United State') &
    data.visitor.region === 'NY' &
    data.visitor.city === 'New York'
    ) {
      return (true)
    }

    return false
  } catch (e) {
    console.log('unable to verify if cutomer is in NYC')
    return false
  }

}

function validateData (data) {
  // TODO Add a json validater
  return (data)
}


function detectPizzaString (convoArr) {
  try {
  let containsPizza = false;
  convoArr
  // filter to only the words the guest speaks
  convoArr = convoArr.filter((x) => {return x.kind === "MessageToOperator"});

  // covert all vistitor text to lowercase
  convoArr = convoArr.map((x) => {return x.body.toLowerCase()});

  convoArr

  containsPizza = convoArr.some((x) => {return x.search('pizza') > -1})

  return (containsPizza)
  } catch (e) {
    console.log("Error, unable to parce chat")
    return (false)
  }

}


async function placeOrder (orderData) {

  const fourmData = qs.stringify({
    'email': orderData.emailAddress,
   'phone': orderData.phoneNumber,
   'pizza-size': 'small',
   'topping': 'cheese'
   });

  const config = {
    method: 'post',
    url: 'https://young-robust-angolatitan.glitch.me/olark',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : fourmData
  };

  return await axios(config)
  .then(function (response) {

    return(response.data)
  })
  .catch(function (error) {
    return(error)
  });
}


const pizzaPromo = {
  orderPizza: orderPizza
}
module.exports = pizzaPromo