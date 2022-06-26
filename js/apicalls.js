//here we simulate a complex api just calling the gets and sets from mockapi adding the extra logic just here

//mockapis url and endpoints
let mockapiURL = 'https://62b464aca36f3a973d33036e.mockapi.io/';
//user roles are : 0 - admin | 1 - user | 2 - visitor
//user status are : 0 - suspended | 1 - approved | 2 deleted

//list of all users gooten from the appi
//jus as a pivot to do filters insted of the api from mockapi that cant
let userList = []
//checks if theres no users and adds a test user (just for dev purpouses)
addTestIfEmpty();

async function reloadUsers(){
   let listado = getAllUsers();
   listado.then((res)=>{userList = [...res];console.log(userList);});
}

/* get all users from the api
test : getAllUsers().then(res=>groupLog('getAllUsers',res));
*/
async function getAllUsers(){
  let userList = await axios.get(mockapiURL+ 'users');
  let response = userList.data;
  
  return response;
}

/* get one user from the api by id
test : getUserById(1).then(res=>groupLog('getUserById',res));
*/

async function  getUserById(id){
    let gottenUser =  await  axios.get(`${mockapiURL}/users/${id}`);
    let response = gottenUser.data;
    return response;    
}
/* get one user from the api by id
test : getUserByName('MaxBernas').then(res=>groupLog('getUserByName',res));
*/
export async function  getUserByName(name){
    let allUsers =  await axios.get(`${mockapiURL}/users/`);
    let found = allUsers.data.find(x => x.userName === name);
    let response = found;
    return response;    
}
let testUser = {
    created_at: Date.now(),
    role: 1,
    userName:'asd',
    password: 'U2FsdGVkX1+GwpnGLxTzd+GrUNsDL/t9cc9KYeNqQ3M=', //asdasd
    status: 1,
    token: 'a1b2c3',
    tkn_exp: Date.now() + 86400000
}
createUser(testUser);
/* exportable interfce for addUser */
export async function createUser(user){
    let result = {};
    let search =  getUserByName(user.userName).then(searchRes =>
        {
            console.log(searchRes)
            if(searchRes == undefined || searchRes.userName !== user.userName){
                addUser(user).then((addUserRes)=>{
                result = {
                    userName: addUserRes.userName,
                    token: addUserRes.token,
                    tkn_exp: addUserRes.tkn_exp
                }});
            }
            else{
                result = {
                    error: 'user name already exists'
                }
                groupLog('User Creation error:', result.error)
            }
        }
    );
    
    return result;
}

/* add one user to the api
test : 
let testUser = {
        created_at: Date.now(),
        role: 1,
        userName:'MaxBernas',
        password: 'asdasd',
        status: 1,
        token: 'a1b2c3',
        tkn_exp: Date.now() + 86400000
    }
addUser(testUser).then(res=>groupLog('addUser',res));
*/
async function addUser(user) {
   let addedUser = await axios.post(mockapiURL+ 'users', user);
   let response = addedUser.data;
   console.log(response);
   return response;
}

async function addTestIfEmpty(){
    let response =  getAllUsers();
    let testUser = {
        created_at: Date.now(),
        role: 1,
        userName:'MaxBernas',
        password: 'U2FsdGVkX1+GwpnGLxTzd+GrUNsDL/t9cc9KYeNqQ3M=', //asdasd
        status: 1,
        token: 'a1b2c3',
        tkn_exp: Date.now() + 86400000
    }
    response.then((res)=>{ res.length < 1 ? addUser(testUser) : console.debug('User List not empty');}); 
}


async function checkToken(token){
    await getAllUsers();
    let response = userList.find(x => x.token === token);
    return response;
}



////////////////////////////////
//function for logging by groups
function groupLog(groupname, logs){
    console.group(groupname);
    if(typeof logs === 'array'){
    for (let data in logs){
        console.debug(data)
    }}
    else{
        console.debug(logs);
    }
    console.groupEnd();
}

