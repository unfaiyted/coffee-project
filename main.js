"use strict"

function renderCoffee(coffee) {
    var html = '';
    // html += '<td>' + coffee.id + '</td>';
    html += '<div class="coffee p-2 h3">' + coffee.name + '';
    html += '<span class="roast card-subtitle mb-2 text-muted h5"> ' + coffee.roast + '</span></div>';
    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var coffeeName = document.querySelector('#coffee-name').value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {

        if (coffee.name.toLowerCase().includes(coffeeName.toLowerCase()) === true  || coffeeName === "") {

            if (coffee.roast === selectedRoast || selectedRoast === 'all') {
                filteredCoffees.push(coffee);
            }

        }
    });
    divbody.innerHTML = renderCoffees(filteredCoffees);
}
(0)
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var divbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName  = document.querySelector('#coffee-name');


divbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
coffeeName.addEventListener('input', updateCoffees);