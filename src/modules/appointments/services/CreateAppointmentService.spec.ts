import ExceptionHandling from '@shared/errors/ExceptionHandling';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment ', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment).toHaveProperty('date');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should be able to not create an appointment on the same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
    await createAppointment.execute({
      date: new Date(2020, 12, 19, 10, 8, 5, 1),
      provider_id: '123456',
    });

    expect(
      createAppointment.execute({
        date: new Date(2020, 12, 19, 10, 8, 5, 1),
        provider_id: '123456',
      })
    ).rejects.toBeInstanceOf(ExceptionHandling);
  });
});
