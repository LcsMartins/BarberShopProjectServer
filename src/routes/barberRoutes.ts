import { Router } from "express";
import Authentication from "../middleware/authentication";
import BarberController from "../controllers/BarberController";
import AuthController from "../controllers/AuthController";


const router = Router()
router
    .route('/barber')
    .post(BarberController.create)
    .get(Authentication.authenticate, BarberController.list)

router
    .route('/barber/:id')
    .get(Authentication.authenticate, BarberController.read)
    .patch(Authentication.authenticate, BarberController.update)
    .delete(Authentication.authenticate, BarberController.delete);

router.route('/barber-auth').post(AuthController.authenticateBarber);
router.route('/verify-token').post(AuthController.verifyToken);

export default router