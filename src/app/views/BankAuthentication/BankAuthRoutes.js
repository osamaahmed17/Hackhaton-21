import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const BankAuth = MatxLoadable({
  loader: () => import("./BankAuth")
})

const bankAuthRoutes = [
  {
    path: "/bankAuth",
    component: BankAuth,
    auth: authRoles.admin
  }
];

export default bankAuthRoutes;
 