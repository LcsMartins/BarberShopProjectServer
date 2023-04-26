import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity('barbers')
export class Barber{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'text' })
    name: string
   
    @Column({ type: 'text' })
    contactNumber: string

    //entidade está em maiusculo 
    @OneToMany(() => Appointment, appointment => appointment.id)
	appointment: Appointment[]
}
