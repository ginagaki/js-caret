var caret = {
    // create caret object
    create          : create_caret,
    // selection class
    selectionId     : "caret-selection",
    // editor node
    editorNode      : "",
    // selectionStart
    getStart        : function () { return get_caret_selectionSE('start'); },
    // selectionEnd
    getEnd          : function () { return get_caret_selectionSE('end'); },
    // before caret's start
    getBefStCaret   : function () { return get_before_caret('start'); },
    // before caret's end
    getBefEnCaret   : function () {return get_before_caret('end'); },
    // caret position
    position        : get_caret_position,
    // caret range
    range           : "",
    // caret selection
    selection       : "",
    // caret selected node
    selectedNode    : "",
};

function create_caret (editorid) {
    caret.editornode = document.getElementById(editorid);
}

function get_caret_selectionSE (se) {
    if(caret.editornode.innerHTML || caret.editornode.textContent){
        return remove_tags(getbeforecaret(se)).length;
    }
}

function get_before_caret (se){
    caret.range = getSelection().getRangeAt(0);
    
    var container = caret.range[se + "Container"];
    var offset = caret.range[se + "Offset"]
    var from = caret.editornode.childNodes[0];
    
    var resultHTML = get_innerHtml_fromto(from, container) + container.textContent.substring(0, offset);
    
    return remove_tags(resultHTML);
}

function get_caret_position () {
    try{
        if (!set_select_area()) { return false };

        return {
            left    : caret.selectedNode.getBoundingClientRect().left + window.pageXOffset,
            top     : caret.selectedNode.getBoundingClientRect().top  + window.pageYOffset
        }
    }finally{
        dispose_select_area();
    }
}

function set_select_area(){
    caret.selection = getSelection();
    if(!caret.selection.isCollapsed){ return false; }

    var span = document.createElement('span');
    span.setAttribute('id', caret.selectionId);
    
    caret.range = caret.selection.getRangeAt(0);
    caret.range.surroundContents(span);
    caret.selectedNode = document.getElementById(caret.selectionId);
    
    return true;
}

function dispose_select_area(){
    caret.range.detach();
    var pnode = caret.selectedNode.parentNode;
    pnode && pnode.removeChild(caret.selectedNode);
}

function remove_tags(txt){
    return txt.replace(/<(\/)?[^>]*>/g,'');
}

function get_innerHtml_fromto(from, to){
    var txt = '';
    while(from && from != to){
        if(from.textContent){
           if(from.contains(to)){
               txt = txt + from.outerHTML.match(/<[^>]*>/)[0];
               from = from.childNodes[0];
           } else {
               txt = txt + from.textContent;
               from = from.nextSibling;
           }
        }else{
            from = from.nextSibling;
        }
    }
    
    return txt;
}