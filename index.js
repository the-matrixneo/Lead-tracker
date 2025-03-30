import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getDatabase ,
    ref , 
    push ,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";
const firebaseConfig = {
datebaseURL : "https://leads-tracker-app-2675f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refrenceInDB = ref(database , "leads")

const inputEl = document.getElementById("Input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")


//myLeads = JSON.parse(localStorage.getItem(myLeads)) //convert string into array
//myLeads.push("www.epiclead.com") //  add new array
 //myLeads = JSON.stringify(localStorage.getItem(myLeads))/ //array into sting /add new item to array

    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
        function render( leads){
        let listItems = ""
       for (let i = 0; i < leads.length; i++) {
          // listItems += "<li><a target = '_blank'  href = ' " + myLeads[i] + " '>" + myLeads[i] + "</a></li>"
           //console.log(listItems)
           listItems += ` 
           <li> 
           <a target = '_blank' href =' ${myLeads[i]}' > ${myLeads[i]} 
           </a>
           </li>`
           }
       ulEl.innerHTML = listItems
       
           }
         onValue(refrenceInDB , function(snapshot){
            const snapshotDoesExist = snapshot.exists()
            if(snapshotDoesExist){
                const snapshotValues = snapshot.val() //logs the "name" of the property
                const leads = Object.values(snapshotValues) 
                render(leads) 
            }
         
     })  
  deletebtn.addEventListener("dbclick" , function(){
    remove(refrenceInDB) //remove the data from the database
   inner.html = "" // manually clear the list
    })
    
 
//localStorage.setItem("Leads","ul-el") //localstorage.setItem("key","value")
//localStorage.getItem("Leads") //localstorage.getvalue("key") --string 
//localStorage.clear() //localstorage.clear() to clear the local storage 

inputBtn.addEventListener("click", function() {
   push(refrenceInDB, inputEl.value )// push to database
    inputEl.value = "" // clear input field
   })
