import { Request, Response } from 'express'
import  CustomerRepository  from '../repositories/CustomerRepository'
import bcrypt from 'bcrypt';

class CustomerController {

	async create(req: Request, res: Response) {
		const { email, password, ...data } = req.body //desestruturação
		//senha para criptografar
		try {

            const emailUsed = await CustomerRepository.findUserByEmail(email)
            if (emailUsed){
                return res.status(400).json({massage: 'email already used'})
            }
            
            const hashedPassword = await bcrypt.hash(password,12);
            
            let newCustomer ;
            if (hashedPassword){
                newCustomer =  await CustomerRepository.createCustomer({email, password: hashedPassword, ...data})
            }
			 
			if (!newCustomer){
				return res.status(400).json({massage: 'wrong parameters'})
			}
			return res.status(201).json(newCustomer)

		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Internal Server Error' })
		} 
	}

	async list(req: Request, res: Response) {
        
        try {

            const customers = await CustomerRepository.listCustomers();

            if (customers === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return res.status(200).json(customers);
        } catch (error) {
            return error;
        }
    }

	async read(req: Request, res: Response) {
        try {

            const { id } = req.params;
            const customers = await CustomerRepository.findCustomerById(id);
            if (customers === null) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (customers === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }
			console.log("controler", customers)

            return res.status(200).json(customers);
        } catch (error) {
            return error;
        }
    }

	async update(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const updatedCustomer = await CustomerRepository.updateCustomerById(
                id,
                req.body,
            );

            if (updatedCustomer === null) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (updatedCustomer === false) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect params' });
            }

            return res.status(200).json(updatedCustomer);
        } catch (error) {
            return error;
        }
    }

	async delete(req: Request, res: Response) {
            try {
                const { id } = req.params;
                const customer = await CustomerRepository.deleteUserById(id);
    
                if (customer?.affected === 0) {
                    return res.status(404).json({ message: 'customer not fond' });
                }
    
                if (customer?.affected === 1) {
                    return res
                        .status(200)
                        .json({ message: 'customer successfully deleted' });
                }
    
                return res.status(400).json({ message: 'Incorrect params' });
            } catch (error) {
                return error;
            }
        }
    


}
export default new CustomerController
