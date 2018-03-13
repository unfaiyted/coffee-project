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
    for(var i = 0; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function addCoffee(e, name, roast) {
    e.preventDefault();
    var name = (name !== undefined) ? name : document.querySelector('#add-coffee-name').value;
    var roast = (roast !== undefined) ? roast : document.querySelector('#add-roast-selection').value;
    var id = coffees.length+1;

    var coffee = {
        id: id,
        name: name,
        roast: roast
    };

    coffees.push(coffee);
    console.log(coffees.length);
    updateCoffees(e);
    updateStoredCoffee(coffees);

}

function updateStoredCoffee(coffees){
    var string = JSON.stringify(coffees);
    localStorage.setItem('coffees', string);
}

function resetCoffeeList(e) {
    e.preventDefault();
    var confirmReset = confirm("Would you like to remove user settings?");
    if (confirmReset === true) {
        localStorage.removeItem('coffees');
        coffees = Array.from(coffeeDefault);
        updateCoffees(e);

    }
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
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var userCoffees = JSON.parse(localStorage.getItem("coffees") || "[]");

var coffeeDefault = [
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

var coffees = Array.from(coffeeDefault);

coffees = (userCoffees.length === 0) ? coffees : Array.from(userCoffees);

var divbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName  = document.querySelector('#coffee-name');
var addCoffees  = document.querySelector('#add-coffee');
var resetCoffee = document.querySelector('#reset-coffee');
divbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
coffeeName.addEventListener('input', updateCoffees);
resetCoffee.addEventListener('click', resetCoffeeList);
addCoffees.addEventListener('click', addCoffee);