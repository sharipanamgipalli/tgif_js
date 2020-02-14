const statistcs = {
    numOFDemocrats :0,
    numOFReplublicans : 0,
    numOFIndependents :0,
    avgOfDemocrats :0,
    avgOfRepublicans:0,
    avgOfIndependents:0,
   least_Engaged_pct :[],
   most_Engaged_pct : [],
   least_Loyal_pct : [],
    most_Loyal_pct : []
   
   
    };


   let party = []
   let democrats = []
   let republicans = []
   let independents = []
   let democrats_per=[]
   let republicans_per=[]
   let independents_per=[]
   let party_type=null
   let reps= null
   let votes = null
   let votes_with_D_per = []
   let votes_with_R_per = []
   let votes_with_I_per = []
   let listOfAvgs=[]
   let avgOfAvgs=null
   let totalListOfAvgs=[]
   let sumOfReps=null
   let leastEngaged = []
   let mostEngaged = []
   let leastLoyal = []
   let mostLoyal = []
   

function getSenateAtAGlancetable(members){
    
   for(i=0; i< members.length;i++){
    party.push(data.results[0].members[i].party)
    
    }
 console.log(party)
 for(i=0;i<members.length;i++){
    let party_value = data.results[0].members[i].party
    let per_value = data.results[0].members[i].votes_with_party_pct
    if(party_value==="D"){
        votes_with_D_per.push(per_value)
    }else if (party_value==="R"){
        votes_with_R_per.push(per_value)  
    } else if (party_value==="I"){
        votes_with_I_per.push(per_value)
    }
 }
 

statistcs.avgOfDemocrats=calculateAverage(votes_with_D_per)
statistcs.avgOfRepublicans=calculateAverage(votes_with_R_per)
statistcs.avgOfIndependents=calculateAverage(votes_with_I_per)
statistcs.avgOfIndependents=0


console.log("AVERAGE OF DEMOCRATS" + statistcs.avgOfDemocrats)
console.log("AVERAGE OF REPUBLICANS" + statistcs.avgOfRepublicans)
console.log("AVERAGE OF INDEPENDENTS" + statistcs.avgOfIndependents)

listOfAvgs.push(statistcs.avgOfDemocrats) 
listOfAvgs.push(statistcs.avgOfRepublicans)
listOfAvgs.push(statistcs.avgOfIndependents)
totalListOfAvgs=listOfAvgs
console.log("TOTAL LIST"+totalListOfAvgs)

if(statistcs.avgOfIndependents!==0){
    avgOfAvgs=calculateAverage(totalListOfAvgs)
    console.log("AVERAGE OF AVERAGES" +avgOfAvgs)
} else if(statistcs.avgOfIndependents===0){
    avgOfAvgs=calculateAverageForTwo(totalListOfAvgs)
    console.log("AVERAGE OF AVERAGES" +avgOfAvgs)
}
/*---Create 3 lists of R,D and I---*/
for(i=0; i<party.length;i++){
    if(party[i]==="D")
    democrats.push(party[i])
 
}
console.log("Democrats"+democrats)
statistcs.numOFDemocrats = democrats.length
console.log(statistcs.numOFDemocrats)

for(i=0; i<party.length;i++){
if(party[i]==="R")
republicans.push(party[i])


}
console.log(republicans)
statistcs.numOFReplublicans = republicans.length
console.log(statistcs.numOFReplublicans)
for(i=0; i<party.length;i++){
if(party[i]==="I")
independents.push(party[i])

}
console.log(independents)
statistcs.numOFIndependents = independents.length
console.log(statistcs.numOFIndependents)

sumOfReps = statistcs.numOFDemocrats + statistcs.numOFReplublicans + statistcs.numOFIndependents


tableParty("Democrats",statistcs.numOFDemocrats,statistcs.avgOfDemocrats.toFixed(2))
tableParty("Replublicans",statistcs.numOFReplublicans,statistcs.avgOfRepublicans.toFixed(2))
tableParty("Independents",statistcs.numOFIndependents,statistcs.avgOfIndependents.toFixed(2))
tableParty("Total",sumOfReps,avgOfAvgs.toFixed(2))

 }

/*----Calucualte average------*/
 function calculateAverage(v1){
    if(v1.length!==0 && v1!==null){
        let sum=0
        let avg=0    
        for(i=0;i<v1.length;i++){
            sum = sum+v1[i]        
        }
        console.log("SUM" +sum)
        avg = sum/v1.length
        console.log("AVERAGE" +avg)
        return avg
 
    } else {
    console.log("Average cannot be calculated")
    }
    }
/*---Calculate average of 2 nos---*/
function calculateAverageForTwo(v1){
    let sum=0
        let avg=0    
        for(i=0;i<v1.length;i++){
            sum = sum+v1[i]        
        }
        console.log("SUM" +sum)
        avg = sum/2
        console.log("AVERAGE" +avg)
        return avg
}

/*---Create a function and pass the parameters as values to be add into the table--*/
function tableParty(party_type,reps,votes){
let tbody2 = document.getElementById("tbody2")

    tr= document.createElement("tr");  
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    td1.innerHTML=party_type
    td2.innerHTML=reps
    td3.innerHTML=votes

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)

    tbody2.appendChild(tr)
    
}




/*-----ENGAGE------*/

function getEngageTable(members){
    
    leastEngaged = members
    mostEngaged = members
    
    /*---Calculate the missed votes----*/
    console.log("-----------------------")
    
    
    for(let i=0;i<leastEngaged.length;i++){
        leastEngaged.sort(function(a,b){
            return b.missed_votes_pct - a.missed_votes_pct
           
    
       })
      /*console.log("DESCENDING ORDER ARRAY" +leastEngaged[i].missed_votes_pct)*/
    }
    for(let n=0; n<(leastEngaged.length)*0.1;n++){
        statistcs.least_Engaged_pct.push(leastEngaged[n])
       console.log("TOP TEN LIST" +statistcs.least_Engaged_pct[n].missed_votes_pct + statistcs.least_Engaged_pct[n].first_name + statistcs.least_Engaged_pct[n].missed_votes)
        console.log("length"+statistcs.least_Engaged_pct.length)
       } 
       
    tableEngaged(statistcs.least_Engaged_pct,"least_engaged")
     
    /*-------Creation of most engaged table -------*/
    
    for(i=0;i<mostEngaged.length;i++){
        mostEngaged.sort(function(a,b){
            return a.missed_votes_pct - b.missed_votes_pct
        } )
    }
    
    for(n=0;n<(mostEngaged.length)*0.1;n++){
        statistcs.most_Engaged_pct.push(mostEngaged[n])
        console.log("BOTTOM ten" +statistcs.most_Engaged_pct[n].missed_votes_pct)
        console.log("BOTTOM LEN"+statistcs.most_Engaged_pct.length)
    }
    
    tableEngaged(statistcs.most_Engaged_pct, "most_engaged")
    
    
    
    function tableEngaged(sort_list, str){
    console.log("Sort list"+sort_list)
    let tbody = document.getElementById(str)
    for(i=0;i<sort_list.length;i++){
        let tr = document.createElement("tr")
        let td1= document.createElement("td")
        let td2= document.createElement("td")
        let td3= document.createElement("td")
    
        
        var a=document.createElement("a")
    
        if (str ="least_engaged"){
        a.innerHTML=sort_list[i].first_name + " " + sort_list[i].last_name
        a.href=sort_list[i].url
        td1.appendChild(a)
        td2.innerHTML= sort_list[i].missed_votes
        td3.innerHTML= sort_list[i].missed_votes_pct
        } else if (str ="most_engaged"){
            a.innerHTML=sort_list[i].first_name + " " + sort_list[i].last_name
            a.href=sort_list[i].url
            td1.appendChild(a)
            td2.innerHTML= sort_list[i].missed_votes
            td3.innerHTML= sort_list[i].missed_votes_pct
            }
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tbody.appendChild(tr)  
        
    }
    }
    }   
/*-----------LOYAL--------------*/

function getLoyaltyTable(){
    leastLoyal = members
    mostLoyal = members
    
    /*---Calculate the top 10 votes against party pct----*/
    console.log("-----------------------")
    
    
    for(let i=0;i<leastLoyal.length;i++){
        leastLoyal.sort(function(a,b){
        return b.votes_against_party_pct - a.votes_against_party_pct
       })
      console.log("DESCENDING ORDER ARRAY" +leastLoyal[i].votes_against_party_pct)
    }
    for(let n=0; n<(leastLoyal.length)*0.1;n++){
        statistcs.least_Loyal_pct.push(leastLoyal[n])
       console.log("TOP TEN LIST" + statistcs.least_Loyal_pct[n].first_name + statistcs.least_Loyal_pct[n].total_votes + statistcs.least_Loyal_pct[n].votes_against_party_pct)
        console.log("length"+statistcs.least_Loyal_pct.length)
       } 
       
    tableLoyal(statistcs.least_Loyal_pct,"least_Loyal")
     
    /*-------Calculate bottom 10 votes against party pct -------*/
    
    for(i=0;i<mostLoyal.length;i++){
        mostLoyal.sort(function(a,b){
            return a.votes_against_party_pct - b.votes_against_party_pct
        } )
    }
    
    for(n=0;n<(mostLoyal.length)*0.1;n++){
        statistcs.most_Loyal_pct.push(mostLoyal[n])
        console.log("BOTTOM ten" +statistcs.most_Loyal_pct[n].votes_against_party_pct)
        console.log("BOTTOM LEN"+statistcs.most_Loyal_pct.length)
    }
    
    tableLoyal(statistcs.most_Loyal_pct, "most_Loyal")
    
    
    
    function tableLoyal(sort_list, str){
    console.log("Sort list"+sort_list)
    let tbody = document.getElementById(str)
    for(i=0;i<sort_list.length;i++){
        let tr = document.createElement("tr")
        let td1= document.createElement("td")
        let td2= document.createElement("td")
        let td3= document.createElement("td")
    
        
        var a=document.createElement("a")
    
        if (str ="least_Loyal"){
        a.innerHTML=sort_list[i].first_name + " " + sort_list[i].last_name
        a.href=sort_list[i].url
        td1.appendChild(a)
        td2.innerHTML= sort_list[i].total_votes
        td3.innerHTML= sort_list[i].votes_against_party_pct
        } else if (str ="most_Loyal"){
            a.innerHTML=sort_list[i].first_name + " " + sort_list[i].last_name
            a.href=sort_list[i].url
            td1.appendChild(a)
            td2.innerHTML= sort_list[i].total_votes
            td3.innerHTML= sort_list[i].votes_against_party_pct
            }
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tbody.appendChild(tr)  
        
    }
    }
    }