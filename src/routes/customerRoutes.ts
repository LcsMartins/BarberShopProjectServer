import { Router } from "express";
import Authentication from "../middleware/authentication";
import CustomerController from "../controllers/CustomerController";
import AuthController from "../controllers/AuthController";


const router = Router()
router
    .route('/customer')
    .post( CustomerController.create)
    .get(Authentication.authenticate, CustomerController.list)

router
    .route('/customer/:id')
    .get(Authentication.authenticate, CustomerController.read)
    .patch(Authentication.authenticate, CustomerController.update)
    .delete(Authentication.authenticate, CustomerController.delete);

router.route('/customer-auth').post(AuthController.authenticateCustomer);
router.route('/verify-token').post(AuthController.verifyToken);

export default router