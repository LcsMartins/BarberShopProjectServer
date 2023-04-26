import { Request, Response } from 'express'
import  BarberRepository  from '../repositories/BarberRepository'
import bcrypt from 'bcrypt';

 class BarberController {

	async create(req: Request, res: Response) {
		const { email, password, ...data } = req.body //desestruturação
		//senha para criptografar
		try {

            const emailUsed = await BarberRepository.findUserByEmail(email)
            if (emailUsed){
                return res.status(400).json({massage: 'email already used'})
            }

            //testar essa parte se ta funcoinano
            const hashedPassword = await bcrypt.hash(password,12);
            let newBarber ;
            if (hashedPassword){
                newBarber =  await BarberRepository.createBarber({email, password: hashedPassword, ...data})
            }
			 

			if (!newBarber){
				return res.status(400).json({massage: 'wrong parameters'})
			}
			console.log("barberr", newBarber)
			return res.status(201).json(newBarber)

		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		} 
	}

	async list(req: Request, res: Response) {
        
        try {

            const barbers = await BarberRepository.listBarbers();

            if (barbers === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return res.status(200).json(barbers);
        } catch (error) {
            return error;
        }
    }

	async read(req: Request, res: Response) {
        try {

            const { id } = req.params;
            const barber = await BarberRepository.findBarberById(id);
            if (barber === null) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (barber === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }
			console.log("controler", barber)

            return res.status(200).json(barber);
        } catch (error) {
            return error;
        }
    }

	async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const updatedBarber = await BarberRepository.updateBarberById(
                id,
                req.body,
            );

            if (updatedBarber === null) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (updatedBarber === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return res.status(200).json(updatedBarber);
        } catch (error) {
            return error;
        }
    }



	async delete(req: Request, res: Response) {
            try {
                const { id } = req.params;
                const barber = await BarberRepository.deleteUserById(id);
    
                if (barber?.affected === 0) {
                    return res.status(404).json({ message: 'barber not fond' });
                }
    
                if (barber?.affected === 1) {
                    return res
                        .status(200)
                        .json({ message: 'barber successfully deleted' });
                }
    
                return res.status(400).json({ message: 'Incorrect params' });
            } catch (error) {
                return error;
            }
        }
    
       

}
export default new BarberController
