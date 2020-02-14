let data = []
let members =[]
let url=""
let array_D = []
let array_R =[]
let array_I =[]
let check_R = []
let check_I =[]
let selectedMembersList = []
let selectState = null
let checked_values = []

url_Senate ="https://api.propublica.org/congress/v1/113/senate/members.json"
url_House = "https://api.propublica.org/congress/v1/113/house/members.json"

var request = {
    headers : {
        'X-API-KEY': 'zyDAnA7Oci6KAPVnnlLl8qN2bmPpJq9K8KzzPfHl'
    }
}
if(document.title.includes("SENATE")){
    console.log("Using Senate data")
    url=url_Senate   
}else if(document.title.includes("HOUSE")){
    console.log("Using House data")
    url=url_House
}


fetch(url,request)
.then(response => {
    console.log(response)
    return response.json();
})
.then(myjson => {
    data=myjson
    console.log(data)
    members = data.results[0].members

    if(document.title.includes("FILTER")|| document.title.includes("FILTER")){

    document.getElementById("democrats").addEventListener('change', function(event){
        let dropDown = getDropDown()
        getfilteredListByBoth(dropDown)
    })
    document.getElementById("republicans").addEventListener('change', function(event){
        let dropDown = getDropDown()
        getfilteredListByBoth(dropDown)
     })
     document.getElementById("independents").addEventListener('change', function(event){
        let dropDown = getDropDown()
        getfilteredListByBoth(dropDown)
     })
     document.getElementById("filterState").addEventListener('change', function(event){
        let dropDown = getDropDown()
        getfilteredListByBoth(dropDown)
    })

    addDataToTable(members)
    createDropDownList(members)

    }
    if(document.title.includes("Attendance")){
        getSenateAtAGlancetable(members)
        getEngageTable(members)
        
    }
    if(document.title.includes("Loyalty")){
        getSenateAtAGlancetable(members)
        getLoyaltyTable(members)
        
    }
    
    
    
  })
  
.catch(error => {
    console.log("Error occured" + error);
  });

 
  function addDataToTable(members){
    let tbody = document.getElementById("tbody");
tbody.innerHTML=""
for(i=0; i< members.length; i++){
    let tr= document.createElement("tr"); 
    let td1= document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let td5=document.createElement("td");
    td1.innerHTML= members[i].first_name + " "+ members[i].last_name;
    td2.innerHTML=members[i].party;
    td3.innerHTML=members[i].state;
    td4.innerHTML=members[i].seniority;
    td5.innerHTML=members[i].votes_with_party_pct + "%";
        
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    
    tbody.appendChild(tr);
            
}     
}


function getDropDown(){
    let dropDrown = document.getElementById("filterState").value
    return dropDrown
}


/*----Filter Members By State-----*/
function createDropDownList(members){
let stateArray=[]
    for(i=0;i<members.length;i++){ 
        if(stateArray.indexOf(members[i].state)===-1){
            stateArray.push(members[i].state)  
            stateArray.sort()
            }
                   
        }
    console.log(stateArray)
      
    for(i=0;i<stateArray.length;i++){
    let select = document.getElementById("filterState")
    let option = document.createElement("option")
    option.innerHTML= stateArray[i]
    select.appendChild(option)
          
    }
}

function getfilteredListByBoth(selectedState){
    checked_values= filter()
    console.log(selectedState)
    console.log(checked_values)
    let filteredMembersList = []    
    for(i=0;i<members.length;i++){  
        if(checked_values.length===0 && selectedState==="All"){
            filteredMembersList.push(members[i])
    
        } else if(checked_values.includes(members[i].party) && selectedState==="All"){
            filteredMembersList.push(members[i])
    
        }else if(checked_values.length===0 && selectedState===members[i].state){
            filteredMembersList.push(members[i])
        
        }else if(checked_values.includes(members[i].party)&& selectedState===members[i].state){
            filteredMembersList.push(members[i])
        }
          
    }
      addDataToTable(filteredMembersList)
    if(filteredMembersList.length===0){
        let tbody= document.getElementById("tbody")
        tbody.innerHTML= "No results displayed"
    }     
      }

function filter(){
        const check_boxes = document.querySelectorAll('input[name=party]:checked')  
        console.log(check_boxes)
        const check_boxes_values =[]
        for(i=0;i<check_boxes.length;i++){
            check_boxes_values.push(check_boxes[i].value)
            console.log("check box values"+check_boxes_values)
        }
        return check_boxes_values
    }








 

    

      
    
    





