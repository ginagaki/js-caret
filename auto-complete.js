var autoComp = {
    create              :   autoComp_create,
    editorNode          :   "",
    autoCompNode        :   "",
    editorCache         :   "",
    words               :   ["aiueo","test","sansuu","manbou","document","getElementById","getTest","test2","Test","Sample"]
}

function autoComp_create(editorId, autoCompleteId){
    autoComp.editorNode = document.getElementById(editorId);
    autoComp.autoCompNode = document.getElementById(autoCompleteId);
    autoComp.editorNode.addEventListener('keydown', autocomp_update, false);
    autoComp.autoCompNode.style.display = 'none';
    autoComp.autoCompNode.style.position = 'absolute';
}

function autocomp_update(e){
    var editortext = autoComp.editorNode.textContent;
    if(autoComp.editorCache != editortext){
        var currentText = autoComp_get_current_text(editortext, caret.Start());
        
        if(currentText){
            if(e.keyCode === 32 || e.keyCode === 190 && !e.ctrlKey && !e.shiftKey & !e.altKey){
                autoComp.autoCompNode.style.display = 'inline';
                autoComp_position(caret.position());
            }
            autoComp.editorCache = autoComp.textContent;
        }
    }
}

function autoComp_position(pos){
    if(!pos) return;

    autoComp.autoCompNode.style.top = (pos.top) + "px";
    autoComp.autoCompNode.style.left = (pos.left) + "px";
}

function autoComp_get_current_text(editortext, selstart){
    var txt     = "";
    var current = selstart;
    var last    = editortext.length - 1;
    var ch      = editortext.charAt(current);
    
    while(!ch.test(/[ .]/) || current != last){
        txt = txt + ch;
        current++;
        ch = editortext.charAt(current);
    }
    
    current = selstart - 1;
    ch = editortext.charAt(current);
    
    while(!ch.test(/[ .]/) || current != -1){
        txt = ch + txt;
        current--;
        ch = editortext.charAt(current);
    }
    
    return txt;
}