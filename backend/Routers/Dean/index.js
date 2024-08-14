//  Auth dean

import login from "./Auth/login.js";

// Profil
import getprofil from "./Profil/getprofil.js"
import changeProfil from "./Profil/changeProfil.js"
import changephotos from "./Profil/changePhoto.js"
 
export default [
{path : '/login', route : login},
{path : '/getprofile', route : getprofil},
{path : '/changeProfile', route : changeProfil},
{path:"/changephotos", route : changephotos}

];
