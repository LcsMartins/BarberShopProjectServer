import { Request, Response } from 'express'
import  AppointmentRepository  from '../repositories/AppointmentRepository'

class AppointmentController {

	async create(req: Request, res: Response) {
		//const { email, password, ...data } = req.body //desestruturação
		try {
			//const newAppointment =  await AppointmentRepository.createBarber({email, password, ...data})
			const newAppointment =  await AppointmentRepository.createAppointment(req.body)

			if (!newAppointment){
				return res.status(400).json({massage: 'wrong parameters'})
			}
			console.log("appointmentt", newAppointment)
			return res.status(201).json(newAppointment)

		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		} 
	}

	async list(req: Request, res: Response) {
        
        try {

            const appointments = await AppointmentRepository.listAppointments();

            if (appointments === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return res.status(200).json(appointments);
        } catch (error) {
            return error;
        }
    }

	async read(req: Request, res: Response) {
        try {

            const { id } = req.params;
            const appointment = await AppointmentRepository.findAppointmentById(id);
            if (appointment === null) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (appointment === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }
			console.log("controler", appointment)

            return res.status(200).json(appointment);
        } catch (error) {
            return error;
        }
    }

	async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const updatedAppointment = await AppointmentRepository.updateAppointmentById(
                id,
                req.body,
            );

            if (updatedAppointment === null) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (updatedAppointment === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return res.status(200).json(updatedAppointment);
        } catch (error) {
            return error;
        }
    }



	async delete(req: Request, res: Response) {
            try {
                const { id } = req.params;
                const appointment = await AppointmentRepository.deleteUserById(id);
    
                if (appointment?.affected === 0) {
                    return res.status(404).json({ message: 'appointment not fond' });
                }
    
                if (appointment?.affected === 1) {
                    return res
                        .status(200)
                        .json({ message: 'appointment successfully deleted' });
                }
    
                return res.status(400).json({ message: 'Incorrect params' });
            } catch (error) {
                return error;
            }
        }
    


}

export default new AppointmentController