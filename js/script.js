//adds toggle all function to "All" system checkboxes
function toggleSysToggles(toggle){
    const toggles = document.querySelectorAll(`.${toggle.value}`);
    if (toggle.checked){
        toggles.forEach((box) => {
            if (!box.checked) {
                box.click();
            }
        });
    }
    else {
        toggles.forEach((box) => {
            if (box.checked) {
                box.click();
            }
        });
    }
}
//toggle all eventlisteners
const toggleAlls = document.querySelectorAll("input[type=checkbox][name=all_select]");
toggleAlls.forEach((allToggle)=>{
    allToggle.addEventListener('change', ()=>{
        toggleSysToggles(allToggle);
    });
    console.log(toggleAlls);
});
//make all toggle turn on and off depending on state of sys toggles.
function checkAllToggle(){
    let srcAllSelected = true;
    let destAllSelected = true;
    systemSelects.forEach((sysToggle)=>{
        if (sysToggle.classList.contains('src-check')){
            if (!sysToggle.checked) {
                srcAllSelected = false;
            }
        }
        else {
            if (!sysToggle.checked) {
                destAllSelected = false;
            }
        }
    });
    toggleAlls[0].checked = srcAllSelected;
    toggleAlls[1].checked = destAllSelected;
}
//adds select optgroup toggle to checkboxes of name "system_select"
function toggleOptGroup(sel){
    const optGroup = document.getElementById(sel.value);
    if (sel.checked){
        optGroup.style.display = "inline";
    }
    else {
        optGroup.style.display = "none";
    }
}
//select optgroup toggle eventlisteners
const systemSelects = document.querySelectorAll("input[type=checkbox][name=system_select]");
systemSelects.forEach((sysToggle)=>{
    sysToggle.addEventListener('change', ()=>{
        toggleOptGroup(sysToggle);
        checkAllToggle();
    });
});


