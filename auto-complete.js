var autoComp = {
    create          :   create_auto_complete,
    editorNode      :   "",
    autoCompNode    :   "",
    setDefalts      :   set_defalt_autoComp,
    setCustoms      :   register_autoComp,
    inputs          :   ""
}

function create_autoComp(editorId, autoCompleteId){
    autoComp.editorNode = document.getElementById(editorId);
    autoComp.autoCompNode = document.getElementById(autoCompleteId);
    autoComp.editorNode.addEventListener('keyup', autocomp_keyupHandler, false);
}

function register_autoComp(instance){
    
}

function set_defalt_autoComp(){
    
}

function autocomp_keyupHandler(e){
    
}