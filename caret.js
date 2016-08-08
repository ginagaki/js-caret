var caret = {
    // create caret object
    create          : function (editorId) {caret.editornode = document.getElementById(editorId); },
    // selection class
    selectionId     : "caret-selection",
    // editor node
    editorNode      : "",
    // selectionStart
    Start           : function () { return caret_selectionSE('start'); },
    // selectionEnd
    End             : function () { return caret_selectionSE('end'); },
    // before caret's start
    BeforeStart     : function () { return caret_beforeSE('start'); },
    // before caret's end
    BeforeEnd       : function () { return caret_beforeSE('end'); },
    // caret position
    position        : caret_position,
    // caret range
    selectedNode    : "",
    // selection collapsed
    isCollapsed     : true
};

function caret_selectionSE (se) {
    if(caret.editornode.innerHTML || caret.editornode.textContent){
        return caret_removetag(caret_beforeSE(se)).length;
    }
}

function caret_beforeSE (se) {
    var sel = getSelection();
    
    caret.isCollapsed = sel.isCollapsed;
    
    var range = sel.getRangeAt(0);
    
    var container = range[se + "Container"];
    
    var offset = range[se + "Offset"]
    
    var from = caret.editornode.childNodes[0];
    
    var resultHTML = caret_FromTo(from, container) + container.textContent.substring(0, offset);
    
    return caret_removetag(resultHTML);
}

function caret_position () {
    var range;
    try{
        range = caret_setsel();
        var BCR = caret.selectedNode.getBoundingClientRect();
        return range ? {
            left    : BCR.left + window.pageXOffset,
            top     : BCR.top  + window.pageYOffset
        } : null;
    } finally {
        caret_dispose(range);
    }
}

function caret_setsel () {
    var sel = getSelection();
    if(!sel.isCollapsed){ return false; }
    
    var span = document.createElement('span');
        span.setAttribute('id', caret.selectionId);
    
    var range = sel.getRangeAt(0);
        range.surroundContents(span);
    
    caret.selectedNode = document.getElementById(caret.selectionId);
    
    return range;
}

function caret_dispose (range) {
    range.detach();
    
    var pnode = caret.selectedNode.parentNode;
        pnode && pnode.removeChild(caret.selectedNode);
}

function caret_removetag (txt) {
    return txt.replace(/<(\/)?[^>]*>/g,'');
}

function caret_FromTo (from, to) {
    var txt = '';
    var contains;
    
    while (from != to) {
        if (from.textContent) {
            contains = from.contains(to);
            
            txt  += (contains ? from.outerHTML.match(/<[^>]*>/)[0] : from.textContent);
            
            from = contains ? from.childNodes[0] : from.nextSibling;
        } else {
            from = from.nextSibling;
        }
    }
    
    return txt;
}