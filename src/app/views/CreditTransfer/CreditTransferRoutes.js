import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const CreditTransfer = MatxLoadable({
  loader: () => import("./CreditTransfer")
})

const creditTransferRoutes = [
  {
    path: "/creditTransfer",
    component: CreditTransfer,
    auth: authRoles.admin
  }
];

export default creditTransferRoutes;
 