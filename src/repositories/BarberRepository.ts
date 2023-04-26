import { AppDataSource } from '../data-source'
import { Barber } from '../entities/Barber';

export interface CreateBarber {
    email: string;
    password: string;
    name: string;
    contactNumber: string;
}

//o q sera devolvido
export interface ResultBarber {
    id: string
    email: string;
    password: string;
    name: string;
    contactNumber: string;
}

const BarberRepository = AppDataSource.getRepository(Barber).extend({

    async createBarber(barber: CreateBarber): Promise< ResultBarber | boolean> {

        try{
            const result = this.create(barber)
            await this.save(result)
            return result
        }catch(error){
            console.log(error)
            return false
        }
    },

    async listBarbers(): Promise< ResultBarber[] | boolean> {
     
        try {
            const result = await this.find();
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async findBarberById(id: string): Promise<ResultBarber | null | boolean> {
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

    async updateBarberById(id: string, barber: CreateBarber): Promise< ResultBarber | null | boolean> {
        try {
            await this.update(id, barber);

            const updatedBarber = await this.findOneBy({
                id: id,
            })

            if (!updatedBarber) {
                return null;
            }

            return updatedBarber;
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
    
    async findUserByEmail(email: string): Promise< ResultBarber | null> {
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

export default BarberRepository
