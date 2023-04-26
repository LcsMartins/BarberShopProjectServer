import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity('customers')
export class Customer{
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