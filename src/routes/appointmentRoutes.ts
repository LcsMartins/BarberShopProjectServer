import { Router } from "express";
import Authentication from "../middleware/authentication";
import AppointmentController from "../controllers/AppointmentController";



const router = Router()
router
    .route('/appointment')
    .post(Authentication.authenticate, AppointmentController.create)
    .get(Authentication.authenticate, AppointmentController.list)

router
    .route('/appointment/:id')
    .get(Authentication.authenticate, AppointmentController.read)
    .patch(Authentication.authenticate, AppointmentController.update)
    .delete(Authentication.authenticate, AppointmentController.delete);

export default router