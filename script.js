import {createUser} from './js/apicalls.js';

//check for loaded users on localhost
let dayToMilliseconds = 86400000;
let tomorrow = Date.now() + dayToMilliseconds;


//get the localstoreage token if theres one
let localStorageUserToken = JSON.parse(localStorage.getItem('localStorageUserToken'));

// check if local storage token exists and its valid
if(localStorageUserToken != null && localStorageUserToken.token !== undefined &&  localStorageUserToken.time !== undefined){
    //if it exists, then check if its not expired
   if(localStorageUserToken.time > Date.now()){
    //check if on the server it is still a valid one
   }
   else{
    // call for loggin
   }
}
else{
    //call for loggin
}


//if not loaded, redirect to login
//once with checekd user procede
// fetch users properties
// load landing with access to direferent pages of the site
// The menu has options to add or search between 4 columns , Propiedades | Propietarios | Inquilinos | Contratos
// each collumn has loaded their elements qith a button for more information
// inside each item, the description of the item and the edit
// a button for deletion || goes to modal for confirmation
// a cancel button || goes for modal to confirm loosing changes
