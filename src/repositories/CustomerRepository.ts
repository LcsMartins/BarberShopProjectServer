import { AppDataSource } from '../data-source'
import { Customer } from '../entities/Customer'

export interface CreateCustomer {
    email: string;
    password: string;
    name: string;
    contactNumber: string;
}

//o q sera devolvido
export interface ResultCustomer {
    id: string
    email: string;
    password: string;
    name: string;
    contactNumber: string;
}

const CustomerRepository = AppDataSource.getRepository(Customer).extend({

    async createCustomer(customer: CreateCustomer): Promise< ResultCustomer | boolean> {
        try{
            const result = this.create(customer)
            await this.save(result)
            return result
        }catch(error){
            console.log(error)
            return false
        }
    },

    async listCustomers(): Promise< ResultCustomer[] | boolean> {
     
        try {
            const result = await this.find();
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async findCustomerById(id: string): Promise<ResultCustomer | null | boolean> {
        try {
            console.log(id)
            const result = await this.findOneBy({
                id: id,
            })
            if (!result) {
                return null;
            }

            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async updateCustomerById(id: string, customer: CreateCustomer): Promise< ResultCustomer | null | boolean> {
        try {
            await this.update(id, customer);

            const updatedCustomer = await this.findOneBy({
                id: id,
            })

            if (!updatedCustomer) {
                return null;
            }

            return updatedCustomer;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    
    async deleteUserById(id: string) {
        try {
            const result = await this.delete(id);
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async findUserByEmail(email: string): Promise<ResultCustomer | null> {
        try {
            const result = await this.findOne({
                where: { email },
                select: [
                    'id',
                    'email',
                    'password',
                    'name',
                    'contactNumber'
                ],
            });

            if (!result) {
                return null;
            }

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
})

export default CustomerRepository
