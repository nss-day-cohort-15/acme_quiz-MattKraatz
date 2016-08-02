// Setting up global variables to be accessed via DOMprint function
var categories
var types
var products

// Loading all JSON files before initial print call
Promise.all([
  $.getJSON('categories.json').then(function(res){categories = res.categories}),
  $.getJSON('types.json').then(function(res){types = res.types}),
  $.getJSON('products.json').then(function(res){products = res.products[0]})
  ]).then(catFilter)

// Function to match the product type ID to it's actual name in the types object
function typeMatch(product) {
  for (var j in types) {
    if (product.id === types[j].category) {
      if (product.type === types[j].id) {
        return types[j]
      }
    }
  }
}

// Handler for click event on categories dropdown in the navbar
$('a').click(function(evt) {
  if (this.hash == "#music") {
    catFilter(0)
  } else if (this.hash == "#movies") {
    catFilter(1)
  } else if (this.hash == "#books") {
    catFilter(2)
  } else if (this.hash == "#all") {
    catFilter({})
  }
})

// Function for printing to the DOM, accepting a category ID. If the provided value is not a number, function will print everything
function catFilter(category) {
  $('#outputDiv').html('')
  for (var i in products) {
    if (products[i].id === category) {
      $('#outputDiv').append(
        `<article class='col-lg-4 col-md-4 col-sm-4'>
        <h3>${products[i].name}</h3
        <span>${categories[products[i].id].name}</span>
        <span>${typeMatch(products[i]).name}</span>
        <span>${products[i].description}</span>
        <br>
        <span>${typeMatch(products[i]).description}</span>
        </article>
        `
      )
    } else if (typeof category !== 'number') {
      $('#outputDiv').append(
        `<article class='col-lg-4 col-md-4 col-sm-4'>
        <h3>${products[i].name}</h3
        <span>${categories[products[i].id].name}</span>
        <span>${typeMatch(products[i]).name}</span>
        <span>${products[i].description}</span>
        <br>
        <span>${typeMatch(products[i]).description}</span>
        </article>
        `
      )
    }
  }
}
