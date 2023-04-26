import { Router } from "express";
import Authentication from "../middleware/authentication";
import CustomerController from "../controllers/CustomerController";


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

export default router