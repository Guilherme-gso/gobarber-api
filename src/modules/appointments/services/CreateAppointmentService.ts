import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ExceptionHandling from '@shared/errors/ExceptionHandling';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    const findAppointmentBySameDate = await this.appointmentsRepository.findByDate(
      appointmentHour
    );

    if (findAppointmentBySameDate) {
      throw new ExceptionHandling('Appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentHour,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
