var caret = {
    // create caret object
    create          : create_caret_object,
    // selection class
    selectionId     : "caret-selection",
    // duplicated class(internal)
    editorNode      : "",
    // selectionStart
    getStart        : function () { return get('start'); },
    // selectionEnd
    getEnd          : function () { return get('end'); },
    // before start caret
    getBefStCaret   : function () { return getbeforecaret('start'); },
    // before end caret
    getBefEnCaret   : function () {return getbeforecaret('end'); },
    // caret position
    position        : get_position_of_caret,
    // caret range
    range           : "",
    // caret selection
    selection       : "",
    // caret selected node
    selectedNode    : "",
    // caret span
    span            : ""
};

function create_caret_object (editorid) {
    caret.editornode = document.getElementById(editorid);
}

function get (se) {
    if(caret.editornode.innerHTML || caret.editornode.textContent){
        return remove_tags(getbeforecaret(se)).length;
    }
}

function getbeforecaret (se){
    caret.range = getSelection().getRangeAt(0);
    return get_innerHtml_fromto(caret.editornode.childNodes[0], caret.range[se + "Container"]) + caret.range[se + "Container"].textContent.substring(0, caret.range[se + "Offset"]);
}

function get_position_of_caret () {
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

    caret.span = document.createElement('span');
    caret.span.setAttribute('id', caret.selectionId);
    
    caret.range = caret.selection.getRangeAt(0);
    caret.range.surroundContents(caret.span);
    caret.selectedNode = document.getElementById(caret.selectionId);
    
    return true;
}

function dispose_select_area(){
    caret.range.detach();
    caret.selectedNode.parentNode && caret.selectedNode.parentNode.removeChild(caret.selectedNode);
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