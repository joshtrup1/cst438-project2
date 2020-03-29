/* global $ */
$(document).ready(function() {

    $.getJSON("/api/items")
    .then(getItems)

    $("#addItem").on('click',function(event) {
        
        createTodo()
        
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
    // alert($("input[name='user']").val());
    var newItem = $("input[name='color']").val();
    var newPrice = $("input[name='price']").val()
    var newDescription = $("input[name='description']").val()
    var newColor = $("input[name='color']").val()
    
    
    $.post("api/userItemRoutes",{color: newItem,descriptipn:newDescription,price: newPrice})
    .then(function(newTodo) {
        $("input[name='color']").val('');
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

