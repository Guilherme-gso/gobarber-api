import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository } from 'typeorm';
import Appointment from '../entities/Appointment';

export default class AppointmentsRepository implements IAppointmentsRepository {
  constructor(private appointmentsRepository = getRepository(Appointment)) {}

  public async save(appointment: Appointment): Promise<Appointment> {
    await this.appointmentsRepository.save(appointment);

    return appointment;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(data);

    await this.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { date },
    });

    return appointment;
  }
}
