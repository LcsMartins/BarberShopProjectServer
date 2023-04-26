import { Router } from "express";
import  BarberController  from "./controllers/BarberController";
import Authentication from "./middleware/authentication";


const routes = Router()


// //routes.post('/barber', new BarberController().create)
// routes.get('/barbers',  BarberController.list)
// routes.get('/barber/:id',  BarberController.read)
// routes.put('/barber/update/:id',  BarberController.update)
// routes.get('/barber/del/:id',  BarberController.delete)

// routes.post('/customer', new CustomerController().create)
// routes.get('/customers', new CustomerController().list)
// routes.get('/customer/:id', new CustomerController().read)
// routes.put('/customer/update/:id', new CustomerController().update)
// routes.get('/customer/del/:id', new CustomerController().delete)

// routes.post('/appointment', new AppointmentController().create)
// routes.get('/appointments', new AppointmentController().list)
// routes.get('/appointment/:id', new AppointmentController().read)
// routes.put('/appointment/update/:id', new AppointmentController().update)
// routes.get('/appointment/del/:id', new AppointmentController().delete)



export default routes