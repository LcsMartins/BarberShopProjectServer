import { Router } from "express";
import barberRouter from "./barberRoutes"
import customerRouter from "./customerRoutes"
import appointmentRouter from "./appointmentRoutes"

const router = Router();

router.use(barberRouter);
router.use(customerRouter);
router.use(appointmentRouter);

export default router;