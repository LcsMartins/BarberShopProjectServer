import { AppDataSource } from '../data-source'
import { Appointment } from '../entities/Appointment'


export interface CreateAppointment {
    dateTime: Date

    customerId: string

    barberId: string
}

//o q sera devolvido
export interface ResultAppointment {
    id: string

    dateTime: Date

    customerId: string

    barberId: string
}

const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({

    async createAppointment(appointment: CreateAppointment): Promise< ResultAppointment | boolean> {

        try{
            const result = this.create(appointment)
            await this.save(result)
            return result
        }catch(error){
            console.log(error)
            return false
        }
    },

    async listAppointments(): Promise< ResultAppointment[] | boolean> {
     
        try {
            const result = await this.find();
            return result;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async findAppointmentById(id: string): Promise<ResultAppointment | null | boolean> {
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

    async updateAppointmentById(id: string, appointment: CreateAppointment): Promise< ResultAppointment | null | boolean> {
        try {
            await this.update(id, appointment);

            const updatedAppointment = await this.findOneBy({
                id: id,
            })

            if (!updatedAppointment) {
                return null;
            }

            return updatedAppointment;
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
    }

})

export default AppointmentRepository
