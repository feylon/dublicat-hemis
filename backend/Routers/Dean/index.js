//  Auth dean

import login from "./Auth/login.js";

// Profil
import getprofil from "./Profil/getprofil.js"

export default [
{path : '/login', route : login},
{path : '/getprofile', route : getprofil}
];
