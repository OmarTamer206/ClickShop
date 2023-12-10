function addNewAddress() 
{
    var dropdown = document.getElementById("dropdown-menu");

    var newAddressInput = document.getElementById("newAddress");
    var newAddress = newAddressInput.value;

    var option = document.createElement("option");
    option.value = newAddress.toLowerCase().replace(/\s/g, ''); 
    option.text = newAddress;

    dropdown.add(option);

    newAddressInput.value = '';
}