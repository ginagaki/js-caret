var autoComp = {
    create              :   autoComp_create,
    editorNode          :   "",
    autoCompNode        :   "",
    setDefalts          :   autoComp_defaults,
    setCustoms          :   autoComp_regist,
    inputs              :   "",
}

function autoComp_create(editorId, autoCompleteId){
    autoComp.editorNode = document.getElementById(editorId);
    autoComp.autoCompNode = document.getElementById(autoCompleteId);
    autoComp.editorNode.addEventListener('keydown', autocomp_update, false);
    autoComp.autoCompNode.style.display = 'none';
    autoComp.autoCompNode.style.position = 'absolute';
}

function autoComp_regist(instance){
    
}

function autoComp_defaults(){
    
}

function autocomp_update(e){
    if(65 <= e.keyCode && e.keyCode <= 90 && !e.ctrlKey && !e.shiftKey){
        autoComp.autoCompNode.style.display = 'inline';
        autoComp_position(caret.position());
    }else{
        autoComp.autoCompNode.style.display = 'none';
    }
}

function autoComp_position(pos){
    if(!pos) return;

    autoComp.autoCompNode.style.top = (pos.top + 12) + "px";
    autoComp.autoCompNode.style.left = (pos.left + 12) + "px";
}