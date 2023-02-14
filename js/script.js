const siPrefixes = [
    {name:"pico",factor: 1e-12},
    {name:"nano",factor:1e-9},
    {name:"micro",factor:1e-6},
    {name:"mili",factor:1e-3},
    {name:"centi",factor:1e-2},
    {name:"deci",factor:1e-1},
    {name:"",factor:1},
    {name:"decka",factor:1e1},
    {name:"hecto",factor:1e2},
    {name:"kilo",factor:1e3},
    {name:"mega",factor:1e6},
    {name:"giga",factor:1e9},
    {name:"tera",factor:1e12}
];
const units = {
    time : {
        SI : [
            {name:"second",factor:1,prefixes:siPrefixes}
        ],
        Imperial : [],
        "SI+" : [
            {name:"minute",factor:60},
            {name:"hour",factor: 3600},
            {name:"day",factor: 5000},
            {name:"year (Julian)",factor: 100000,prefixes:siPrefixes}
        ]
    },
    length : {
        SI : [
            {name:"meter",factor: 1,prefixes:siPrefixes}
        ],
        Imperial:[
            {name: "twip",factor: 2},
            {name:"thou",factor: 3},
            {name: "barleycorn",factor:4},
            {name:"inch",factor:5},
            {name:"hand",factor: 6},
            {name:"foot",factor: 7},
            {name:"yard",factor:8},
            {name: "chain",factor: 9},
            {name:"furlong",factor: 10},
            {name:"mile",factor: 11},
            {name:"league",factor: 12}
        ],
        "SI+" : []
    },
    mass : {
        SI : [
            {name:"gram",factor: 1,prefixes:siPrefixes}
        ],
        Imperial : [
            {name: "grain",factor: 2},
            {name:"drachm",factor: 3},
            {name: "ounce",factor:4},
            {name:"pound",factor:5},
            {name:"stone",factor: 6},
            {name:"quarter",factor: 7},
            {name:"hundredweight",factor:8},
            {name: "ton",factor: 9}
        ],
        "SI+" : []
    }
}
//fill optgroups depending on unit, multiplying by prefixes if required.
function fillOptGroups(unit){
    const optGroups = document.querySelectorAll("optgroup");
    optGroups.forEach((optGroup) => {
        let groups;
        for (const measure of units[unit][optGroup.label]){
            console.log(measure?.prefixes);
            if (measure?.prefixes !== undefined){
                measure.prefixes.forEach((prefix)=>
                    groups += `<option data-factor="${measure.factor * prefix.factor}">${prefix.name + measure.name}</option>`
                );
            }
            else {
                groups += `<option data-factor="${measure.factor}">${measure.name}</option>`;
            }
        }
        optGroup.innerHTML = groups;
    });
}
const unitSelect = document.getElementById("unit");
unitSelect.addEventListener("change", ()=>fillOptGroups(unitSelect.value));


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
//"all" systems toggle eventlisteners
const toggleAlls = document.querySelectorAll("input[type=checkbox][name=all_select]");
toggleAlls.forEach((allToggle)=>{
    allToggle.addEventListener('change', ()=>{
        toggleSysToggles(allToggle);
    });
});
//make "all" toggle turn on and off depending on state of sys toggles.
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
//hides and shows optgroups depending on sys toggle
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


