/* global $ */
$(document).ready(function() {

    $.getJSON("/api/userItemRoutes")
    .then(addItems)

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
        url: 'api/userItemRoutes',
        
    })
    .done((data) => {
        console.log(data);
    })
}

function addItem(item) {
    var newItem = item.name;
    newItem.data('id',item._id);
    newItem.data('completed',item.completed);
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

function removeItemFromCart(item) {
    var clickedId = todo.data('id');
    var deleterUrl = 'api/userItemRoutes/'+ clickedId;
    var updateData = {$inc: {quantity: 1}};
    
    $.ajax({
        method: 'DELETE',
        url: deleterUrl,
        data: updateData
    })
    .then((data) => {
        todo.remove();
    })
}
function addItemToCart(item) {
    var clickedId = todo.data('id');
    var deleterUrl = 'api/userItemRoutes/'+ clickedId;
    var updateData = {$inc: {quantity: -1}};
    
    $.ajax({
        method: 'DELETE',
        url: deleterUrl,
        data: updateData
    })
    .then((data) => {
        todo.remove();
    })
}



const updateItem = (item) => {
    var updateUrl = 'api/userItemRoutes/'+ item.data('id');
    var isDone = item.data('completed');
    // console.log(isDone)
    var updateData = {$inc: {quantity: 1}};
    // console.log(updateData)
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData

    })
    .then(function(updatedSelectedItem) {
        item.toggleClass("done");
    })

}