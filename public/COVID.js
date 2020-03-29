/* global $ */
$(document).ready(function() {

    $(document).on('click','#deleteItem',function() {
        
        var id = $("#deleteItem").closest("div");
        console.log($(this).parent());
        var clickParent = $(this).parent();
        console.log(clickParent.children('#deleteItem').attr('class'));
        // removeItem(clickParent);
    });

    getItems();

    

});

function getItems() {
    $.ajax({
        method: 'GET',
        url: '/api/items',
        //
        //<a href='/campgrounds/" + element._id + "'>Delete<a/>
        //<a href='/deleteLightsaber/" + element._id + "'>Delete<a/>
    })
    .done((data) => {
        data.forEach((element,index) => {
            var divItem = $("<div id='" + element._id + "'></div>");
            var color = $("<p>color: " +element.color + "</p>");
            var price = $("<p>$" + element.price + "</p>");
            var updateBTN = $("<button><a href='/updateLightsaber/" + element._id + "'> Update </a></button></div>");
            var deleteBTN = $("<button class = '" + element._id + "' id='deleteItem'>delete </button></div>");
            divItem.append(color,price,updateBTN,deleteBTN);
            $('#display_items').append(divItem);
        });
        
        
        
        // console.log(data);
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
    // var newItem = $("input[name='color']").val();
    var newPrice = $("input[name='price']").val()
    var newDescription = $("input[name='description']").val()
    var newColor = $("input[name='color']").val()
    
    
    $.post("api/userItemRoutes",{color: newColor,descriptipn:newDescription,price: newPrice})
    .then(function(newTodo) {
        $("input[name='color']").val('');
        addTodo(newItem);
    })
    .catch((err) => {
        console.log(err);
    })
}

function removeItem(item) {
    var deleteID = item.children('#deleteItem').attr('class')
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

};