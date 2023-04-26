import { Router } from "express";
import BarberController from "../controllers/BarberController";
import Authentication from "../middleware/authentication";
import AuthController from "../controllers/AuthController";


const router = Router()
router
    .route('/barber')
    .post( BarberController.create)
    .get( BarberController.list)

router
    .route('/barber/:id')
    .get(Authentication.authenticate, BarberController.read)
    .patch(Authentication.authenticate, BarberController.update)
    .delete(Authentication.authenticate, BarberController.delete);

router.route('/user-auth').post(AuthController.authenticateBarber);
router.route('/verify-token').post(AuthController.verifyToken);
export default router