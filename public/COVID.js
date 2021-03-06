/* global $ */
$(document).ready(function() {

    function parseSerializedInput(data) {
        dataObj = {}
        $(data).each(function(i, field){
            dataObj[field.name] = field.value;
          });
          return dataObj;
    }

    //Delete
    $(document).on('click','#deleteItem',function() {
        
        var id = $("#deleteItem").closest("div");
        // console.log($(this).parent());
        var clickParent = $(this).parent();
        console.log(clickParent.data('id'))
        // console.log(clickParent.children('#deleteItem').attr('class'));
        removeItem(clickParent);
    });

    $(document).on('click','#UpdateCurrentItem',function() {
        
        var updateInputValues = $("#UpdateItemValues").serializeArray()
        var parseData = parseSerializedInput(updateInputValues)
        console.log(parseData);
        
        updateItem(dataObj);
    });

    $(document).on('click','#CreateNewItem',function() {
        
        var updateInputValues = $("#NewItemValues").serializeArray()


        var parseData = parseSerializedInput(updateInputValues)
        console.log(parseData);
        $("#confirm_creation").text("Item has been created");
        createItem(parseData);

    });

    $(document).on('click',"#filterSearch",function() {
        var searchData = $("#searchQueryValues").serialize()
        // console.log(searchData);
        
        getItemsBySearch(searchData)
    })

    

    getItems();


});

function getItems() {
    $.ajax({
        method: 'GET',
        url: '/api/items',
        
    })
    .done((data) => {
        data.forEach((element,index) => {
            var divItem = $("<div id='" + element._id + "'></div>");


            var color = $("<p>Color: " +element.color + "</p>");
            var price = $("<p>Price: $" + element.price + "</p><br>");
            var link = $("<img style='width:200px;height:200px;' src=" + element.link +"><br>");
            var updateBTN = $("<button><a href='/updateItem/" + element._id + "'> Update </a></button></div>");
            var deleteBTN = $("<button class = '" + element._id + "'  id='deleteItem'>delete </button></div>");
            var addToCartBTN = $("<button><a href='/addItemToCart/" + element._id + "'> Add to Cart </a></button></div><br><br>");
            divItem.append(link,color,price,updateBTN,deleteBTN, addToCartBTN);
            $('#display_items').append(divItem);
        });
        
        
        
        // console.log(data);
    })
}

function getItemsBySearch(searchItems) {
    $('#displaySearchResult').empty()
    var searchURL = "/api/items/search?" + searchItems;
    $.ajax({
        method: 'GET',
        url: searchURL,
    })
    .then((data) => {
        var color = $("<p>Color: " + data[0].color + "</p>");
        var price = $("<p>Price: $" + data[0].price + "</p><br>");
        var link = $("<img style='width:100px;height:100px;' src=" + data[0].link +"><br>");
        $('#displaySearchResult').append(price,color,link);
        console.log(data[0].price);
    })
    

    

}
function addItem(item) {
    var newItem = item.name;
    newItem.data('id',item._id);
    newItem.data('color',item.color);
    newItem.data('price',item.price);
    newItem.data('quantity',item.quantity);

    if(item.completed) {
        newItem.addClass("done");
    }
    $('.list').append(newTodo);
    
}

function addItems(item) {
    item.forEach(t => {
        addTodo(t);
    });
}

function createItem(item) {

    $.ajax({
        method: 'POST',
        url: "/api/items",
        data: item
    })
    .then((data) => {
        console.log("Item is Created");
    })

}

function removeItem(item) {
    var deleteID = item.children('#deleteItem').attr('class');
    console.log(deleteID);
    var deleterUrl = 'api/items/'+ deleteID;
    console.log(item);
    
    $.ajax({
        method: 'DELETE',
        url: deleterUrl
    })
    .then((data) => {
        console.log(data);
        item.remove();
    })
}

const updateItem = (item) => {
    var updateUrl = '/api/items/' + item.id;

    var itemColor = item.color;
    var itemPrice = item.price;
    var itemLink = item.link;
    // console.log(item);

    var updateData = {color: itemColor, price: itemPrice,link:itemLink};
    // console.log(updateData)
    console.log(updateData);
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData

    })
    .then(function(updateItem) {
        $("#confirm_update").text("Item has been updated");
        console.log("Updated");
    })

};