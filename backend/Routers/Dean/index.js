//  Auth dean

import login from "./Auth/login.js";

// Profil
import getprofil from "./Profil/getprofil.js";
import changeProfil from "./Profil/changeProfil.js";
import changephotos from "./Profil/changePhoto.js";
import changepassword from "./Profil/changepassword.js";

// Cros student

import addstudent from "./Cors Student/addStudent.js";
import editstudent from "./Cors Student/editStudent.js";
import deletestudent from "./Cors Student/deleteStudent.js"
import searchStudent from "./Cors Student/get Student.js";

// Cros teacher
import addteacher from "./Cors Teacher/addTeacher.js";
import editTeacher from "./Cors Teacher/editTeacher.js"
import deleteteacher from "./Cors Teacher/deleteTeacher.js"
import searchteacher from "./Cors Teacher/get Teacher.js"


export default [
  { path: "/login", route: login },
  { path: "/getprofile", route: getprofil },
  { path: "/changeProfile", route: changeProfil },
  { path: "/changephotos", route: changephotos },
  { path: "/changepassword", route: changepassword },
  { path: "/addstudent", route: addstudent },
  { path: "/editstudent", route: editstudent },
  { path: "/deletestudent", route : deletestudent},
  { path: "/searchstudent", route : searchStudent},
  {path : "/addteacher", route : addteacher},
  {path : "/editTeacher", route : editTeacher},
  {path : "/deleteteacher", route : deleteteacher},
  {path : "/searchteacher", route : searchteacher}
];
