import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const AccountCreation = MatxLoadable({
  loader: () => import("./AccountCreation")
})

const accCreateRoutes = [
  {
    path: "/accountCreation",
    component: AccountCreation,
    auth: authRoles.admin
  }
];

export default accCreateRoutes;
 