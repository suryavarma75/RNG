let data = ['Aparichitudu Asish', 'Charming Chandan', 'Charismatic Chandini', 'Dotnet Divya', 'Goa Govardhini', 'Hurry Harika', 'Hailing Himavarshini', 'Kinetic Keerthika', 'Mallepuvvu Madhu', 'Noble Nagasai', 'Naughty Naveen', 'Powerful Pavan', 'Rising Rahul', 'Rendering Reguvel', 'Royal Rishi','Sampangi Saketh', 'XO Helen Sahith', 'Silencer Sajid', 'Silent Sasidhar', 'Saviour Sreekar', 'Spidey Suketh', 'Single Surya', 'Terrifying Tejasree', 'Toddler Tejaswini', 'Terrorist Trinadh', 'Viral Vyyari Vinay'];

let mod_data = [...data];
let rem_mems = []; 
let mem_div = document.getElementsByClassName("members")[0];
let edit_but = document.getElementById("editor-button");
let inp_div = document.getElementsByClassName("input")[0];
let teams_cont = document.getElementsByClassName("teams")[0];
teams_cont.style.display = "none";
let lists_cont = document.getElementsByClassName("lists")[0];
mem_div.style.display = "none";
function editMembers() {
    if(mem_div.style.display=="none"){
        mem_div.style.display = "block";
        edit_but.style.display = "none";
    } else {
        mem_div.style.display = "none";
        edit_but.style.display = "block";
    }

    if(mem_div.children.length===2){
        createMembers();
    }
}

function createMembers(){
    data.forEach((member)=>{
        let container = document.createElement("div");
        container.className = "member-container";
        let id = mod_data.indexOf(member);
        let inp = document.createElement("input");
        inp.type = "checkbox";
        inp.id = "mem"+id;
        inp.classList.add("member-checkbox");
        inp.value = member;
        inp.checked = true;
        inp.addEventListener('change', function () {
            if (this.checked) {
                if(rem_mems.includes(this.value)){
                    rem_mems.splice(rem_mems.indexOf(this.value),1);
                }
                mod_data.push(this.value);
            } else {
                rem_mems.push(this.value);
                mod_data.splice(mod_data.indexOf(this.value), 1);
            }
            console.log("Selected Members: ", mod_data);
            console.log("Removed Members: ", rem_mems);
        });
        let label = document.createElement("label");
        label.htmlFor = "mem"+id;
        label.appendChild(document.createTextNode(member));
        container.appendChild(inp);
        container.appendChild(label);
        mem_div.appendChild(container);
    })
}

function generate() {
    console.log("Generating Teams...");
    if (inp_div) {
        inp_div.style.display = "none";
    }
    let no_of_teams = document.getElementById("numTeams").value;
    if(no_of_teams<=0 || no_of_teams>mod_data.length){
        alert("Please enter a valid number of teams (1 - " + mod_data.length + ")");
        if (inp_div) {
            inp_div.style.display = "inherit";
        }
        return;
    }
    teams_cont.style.display = "block";
    lists_cont.innerHTML = "";
    let dummy_data = [...mod_data];
    let max_lim = Math.floor(mod_data.length / no_of_teams);
    let rem = mod_data.length % no_of_teams;
    let teams = {};
    for (let j = 0; j < no_of_teams; j++) {
        teams[j] = [];
        for (let i = 0; i < max_lim; i++) {
            let rand_index = Math.floor(Math.random() * dummy_data.length);
            teams[j].push(dummy_data[rand_index]);
            dummy_data.splice(rand_index, 1);
        }
    }
    if(rem>0){
        for(let i=0;i<rem;i++){
            let rand_index = Math.floor(Math.random() * dummy_data.length);
            teams[i].push(dummy_data[rand_index]);
            dummy_data.splice(rand_index, 1);
        }
    }
    for (let k in teams) {
        generateItems(parseInt(k) + 1, teams[k]);
    }
}
function gagain() {
    if (inp_div.style.display === "none") {
        inp_div.style.display = "inherit";
    }
    lists_cont.innerHTML = "";
    teams_cont.style.display = "none";
}
function generateItems(team_num, team_mates) {
    let team_name = document.createElement("h3");
    team_name.innerHTML = "Team " + team_num;
    lists_cont.appendChild(team_name);
    let ol = document.createElement("ol");
    ol.className = "list";
    ol.id = "list" + team_num;

    for (let i of team_mates) {
        let li_ele = document.createElement("li");
        li_ele.innerHTML = i;
        ol.appendChild(li_ele);
    }
    lists_cont.appendChild(ol);
}