import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barber } from "./Barber";
import { Customer } from "./Customer";


@Entity('appointments')
export class Appointment{

    //duvida aq se tem como juntar datetime+ id+ id para virar chave e se faz sentido
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn({ type: 'date' })
    dateTime: Date

    @Column({ type: 'text' })
    customerId: string

    @Column({ type: 'text' })
    barberId: string

    @ManyToOne (() => Barber, barber => barber.id,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'barberId'})
	barber: Barber

    @ManyToOne(() => Customer, customer => customer.id,{
        onDelete:"CASCADE"
    })
    @JoinColumn({name:'customerId'})
	customer: Customer

}