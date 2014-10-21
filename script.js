$(function () {
    for (var i = 0; i < data.length; i++) {
        createParentItem(i);
    }

    $('a.parent').click(parentClickedOn);
});

function parentClickedOn() {
    $('#children').empty();
    
    var parentId = $(this).attr('data-id');
    
    createGeneralChildItem(parentId-1);
    
    for (var i1 = 0; i1 < data.length; i1++) {
        if (parentId == data[i1].id) {
            for (var i2 = 0; i2 < data[i1].children.length; i2++) {
                createChildItem(i1, i2);
            }
        }
    }
    
    $(':input').change(function () {
        var parentId = $(this).attr('parent-data-id');
        var childId = $(this).attr('child-data-id');
        
        if ($(this).is(":checked")) {
            if (childId === undefined) {
                addToBucket(parentId-1);   
                return;
            }
            
            for (var i1 = 0; i1 < data.length; i1++) {
                if (parentId == data[i1].id) {
                    for (var i2 = 0; i2 < data[i1].children.length; i2++) {                 
                        if (childId == data[i1].children[i2].id) {
                            addToBucket(i1, i2);
                        }
                    }
                }
            }
        }
        else {
            if (childId === undefined) {
                $('#p' + parentId).remove();
                return;
            }
            
            $('#p' + parentId + 'c' + childId).remove();
        }
    });
}

function createParentItem(index) {
    var boxA = $('<a>', {class: 'parent', "data-id": data[index].id, text: data[index].name});
    $('div#parents').append(boxA).append("<br />");
}

function createChildItem(pIndex, cIndex) {
    var checkbox = $('<input type="checkbox" class="child" parent-data-id="'+data[pIndex].id+'" child-data-id="'+data[pIndex].children[cIndex].id+'">');
    $('div#children').append(checkbox).append(data[pIndex].children[cIndex].name + "<br />");
}

function createGeneralChildItem(pIndex) {
    var checkbox = $('<input type="checkbox" class="parent" parent-data-id="'+data[pIndex].id+'">');
    $('div#children').append(checkbox).append(data[pIndex].name + "<br />");    
}

function addToBucket(pIndex, cIndex) {
    if (cIndex === undefined) {
        var generalChild = data[pIndex];
        var childElm = $('<button>', {
            class: 'btn btn-default',
            id: 'p'+(pIndex+1),
            text: generalChild.name
        });
        $('#bucket').append(childElm);    
        return;
    }
    
    var child = data[pIndex].children[cIndex];
    var childElm = $('<button>', {
        class: 'btn btn-default',
        id: 'p'+(pIndex+1)+'c'+(cIndex+1),
        text: child.name
    });
    $('#bucket').append(childElm);
}





