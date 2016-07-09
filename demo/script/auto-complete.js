var autoComp = {
    create          :   create_autoComp,
    editorNode      :   "",
    autoCompNode    :   "",
    setDefalts      :   set_defalt_autoComp,
    setCustoms      :   register_autoComp,
    inputs          :   "",
    caret           :   "",
    topOffset       :   15,
    leftOffset      :   0,
    position        :   set_position_autoComp
}

function create_autoComp(editorId, autoCompleteId){
    autoComp.editorNode = document.getElementById(editorId);
    
    autoComp.autoCompNode = document.getElementById(autoCompleteId);
    
    autoComp.editorNode.addEventListener('keyup', autocomp_keyupHandler, false);
    autoComp.editorNode.addEventListener('keydown', autocomp_keyupHandler, false);

    autoComp.autoCompNode.style.display = 'none';
    autoComp.autoCompNode.style.position = 'absolute';
    
    caret.create(editorId);
}

function register_autoComp(instance){
    
}

function set_defalt_autoComp(){
    
}

function autocomp_keyupHandler(e){
    var pos = caret.position();
    
    set_position_autoComp(pos);

    autoComp.autoCompNode.style.display = 'inline';
}
    
function set_position_autoComp(pos){
    if(!pos) return;

    autoComp.autoCompNode.style.top = (pos.top + autoComp.topOffset) + "px";
    autoComp.autoCompNode.style.left = (pos.left + autoComp.leftOffset) + "px";
}