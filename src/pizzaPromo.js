var axios = require('axios');
var qs = require('qs');

/**
 * Drives the pizza decisioning and ordering process.
 *
 * @param data - Object from urlencoded request
 * @returns Object {status: <pizza status>}
 * Pizza stata could be "no pizza", "pizza"
 */
async function orderPizza (data) {
  // Init the state of the Pizza
  let pizzaStatus  = {status: 'no pizza'}

  // Confirm that the data is formated correctly
  const cleanData = validateData(data);

  // Confirm this is a unique request
  idChecker (data)

  // Check if the location is in NYC
  if (!isNyCity(cleanData)) {
    /// TODO Inprove response here
    return (pizzaStatus)
  }

  // Determine if the visitor spoke "pizza"
  if (!detectPizzaString(cleanData.items)) {
    return (pizzaStatus)
  }

  // Order the Pizza
  // Collect the data nessasary to triangleate the location
  const orderData = {
    emailAddress: cleanData.visitor.emailAddress,
    phoneNumber: cleanData.visitor.phoneNumber }

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

} // End of orderPizza

/**
 * Determines if guest is in NYC, USA
 * @param data - Object from urlencoded request
 * @returns Booleon
 */
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
    console.log(`Error: unable to verify if cutomer is in NYC. Error ${e}`)
    return false
  }

} // End of isNyCity

/**
 * Stand in Method for a json validator for security.
 * @param data - Object from urlencoded request
 * @returns data
 */
function validateData (data) {
  // TODO Add a json validater
  return (data)
}

/**
 * Stand in Method a check to make sure the service is not
 * being spammed. Intends to use the visitor ID or IP.
 * @param data - Object from urlencoded request
 * @returns data
 */
 function idChecker (data) {
  return (data)
}

function detectPizzaString (convoArr) {
  try {
    let containsPizza = false;

    // filter to only the words the guest speaks
    convoArr = convoArr.filter((x) => {return x.kind === "MessageToOperator"});

    // covert all vistitor text to lowercase
    convoArr = convoArr.map((x) => {return x.body.toLowerCase()});

    // Returns true if the word pizza is spoken
    containsPizza = convoArr.some((x) => {return x.search(' pizza ') > -1})

    return (containsPizza)
  } catch (e) {
    console.log("Error, unable to parce chat")
    return (false)
  }

} // End detectPizzaString

/**
 * @param orderData  {emailAddress: STRING,
    phoneNumber: STRING}
 * @returns
 */
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
} // End placeOrder

const pizzaPromo = {
  orderPizza: orderPizza
}
module.exports = pizzaPromo