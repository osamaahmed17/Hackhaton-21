import { MatxLoadable } from "matx";
import { authRoles } from "../../auth/authRoles";

const DebitTransfer = MatxLoadable({
  loader: () => import("./DebitTransfer")
})

const debitTransferRoutes = [
  {
    path: "/debitTransfer",
    component: DebitTransfer,
    auth: authRoles.admin
  }
];

export default debitTransferRoutes;
 