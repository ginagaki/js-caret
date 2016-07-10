window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var autoComp = {
    create              :   create_autoComp,
    editorNode          :   "",
    autoCompNode        :   "",
    setDefalts          :   set_defalt_autoComp,
    setCustoms          :   register_autoComp,
    inputs              :   "",
    caret               :   "",
    topOffset           :   15,
    leftOffset          :   0,
    position            :   set_position_autoComp,
    viewComp            :   false,
    leftUpdateTime      :   10
}

function create_autoComp(editorId, autoCompleteId){
    autoComp.editorNode = document.getElementById(editorId);
    autoComp.autoCompNode = document.getElementById(autoCompleteId);
    
    autoComp.editorNode.addEventListener('keydown', autocomp_update, false);
    
    autoComp.autoCompNode.style.display = 'none';
    autoComp.autoCompNode.style.position = 'absolute';
    
    caret.create(editorId);
}

function register_autoComp(instance){
    
}

function set_defalt_autoComp(){
    
}

function autocomp_update(e){
    if((e.keyCode == 37 || e.keyCode == 39 || 65 <= e.keyCode && e.keyCode <= 90) && !e.ctrlKey && !e.shiftKey){
        autoComp.autoCompNode.style.display = 'inline';
        autoComp.keydownTimestanp = Date.now();
        window.requestAnimationFrame(autocomp_posupdate);
    }else{
        autoComp.autoCompNode.style.display = 'none';
    }
}

function autocomp_posupdate(){
    if((Date.now() - autoComp.keydownTimestanp) < autoComp.leftUpdateTime){
        set_position_autoComp(caret.position());
        window.requestAnimationFrame(autocomp_posupdate)
    }
}

function set_position_autoComp(pos){
    if(!pos) return;

    autoComp.autoCompNode.style.top = (pos.top + autoComp.topOffset) + "px";
    autoComp.autoCompNode.style.left = (pos.left + autoComp.leftOffset) + "px";
}