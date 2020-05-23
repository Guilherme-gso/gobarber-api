import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ExceptionHandling from '@shared/errors/ExceptionHandling';
import AppointmentRepository from '../repositories/AppointmentRepos';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointment {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentHour = startOfHour(date);

    const findAppointmentBySameDate = await appointmentsRepository.findByDate(
      appointmentHour
    );

    if (findAppointmentBySameDate) {
      throw new ExceptionHandling('Appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentHour,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointment;
