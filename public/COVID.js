/* global $ */
$(document).ready(function() {

    $.getJSON("/api/items")
    .then(getItems)

    $("#addItem").on('click',function(event) {
        if(event.which == 13) {
            createTodo()
        }
    });

    $('#RemoveItem').on('click',function() {
        removeTodo($(this).parent())
        
    });
    $('#UpdateCurrentItem').on('click',function() {
        updateTodo($(this));
        
    });
    $('#filterSearch').on('click',function() {
        var items = getItems();
        $("#display").append(items);
    })

});

function getItems() {
    $.ajax({
        method: 'GET',
        url: '/api/items',
        
    })
    .done((data) => {
        console.log(data);
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

function createItem() {
    var newItem = $("#todoInput").val();
    
    $.post("api/userItemRoutes",{name: newItem})
    .then(function(newTodo) {
        $("#todoInput").val('');
        addTodo(newItem);
    })
    .catch((err) => {
        console.log(err);
    })
}

function removeItem(item) {
    var clickedId = item.data('id');
    var deleterUrl = 'api/items/'+ clickedId;
    
    
    $.ajax({
        method: 'DELETE',
        url: deleterUrl
    })
    .then((data) => {
        todo.remove();
    })
}

const updateItem = (item) => {
    var updateUrl = 'api/items/'+ item.data('id');
    // var isDone = item.data('completed');
    // var itemID = newItem.data('id',item._id);
    var itemColor = newItem.data('color',item.color);
    var itemPrice = newItem.data('price',item.price);
    var itemQuantity = newItem.data('quantity',item.quantity);

    var updateData = {color: itemColor, price, itemPrice, quantity: itemQuantity};
    // console.log(updateData)
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData

    })
    .then(function(updateItem) {
        item.toggleClass("done");
    })

}

// function addItemToCart(item) {
//     var clickedId = todo.data('id');
//     var deleterUrl = 'api/userItemRoutes/'+ clickedId;
//     var updateData = {$inc: {quantity: -1}};
    
//     $.ajax({
//         method: 'DELETE',
//         url: deleterUrl,
//         data: updateData
//     })
//     .then((data) => {
//         todo.remove();
//     })
// }