import '../../src/env';
import { sequelize } from '../../src/utils/sequelize';
import { User, Event, TicketType, UserTicket } from '../../src/models';

const exclude = ['createdAt', 'updatedAt'];

afterAll(async () => {
  await sequelize.close();
});
describe('DB seed 데이터가 유효', () => {
  it('User 데이터가 유효', async () => {
    //given, when
    const users = await User.findAll({
      attributes: { exclude },
    });
    //then
    expect(users).toMatchSnapshot();
  });
  it('Event 데이터가 유효', async () => {
    //given, when
    const events = await Event.findAll({
      attributes: { exclude },
    });
    //then
    expect(events).toMatchSnapshot();
  });
  it('TicketType 데이터가 유효', async () => {
    //given, when
    const tickettypes = await TicketType.findAll({
      attributes: { exclude },
    });
    //then
    expect(tickettypes).toMatchSnapshot();
  });
  it('UserTicket 데이터가 유효', async () => {
    //given, when
    const ordertickets = await UserTicket.findAll({
      attributes: { exclude },
    });
    //then
    expect(ordertickets).toMatchSnapshot();
  });
});
