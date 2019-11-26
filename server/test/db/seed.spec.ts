import '../../src/env';
import { sequelize } from '../../src/utils/sequelize';
import {
  User,
  Event,
  TicketType,
  Order,
  OrderTicket,
  TicketSubscription,
} from '../../src/models';

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
  it('Order 데이터가 유효', async () => {
    //given, when
    const orders = await Order.findAll({
      attributes: { exclude },
    });
    //then
    expect(orders).toMatchSnapshot();
  });
  it('OrderTicket 데이터가 유효', async () => {
    //given, when
    const ordertickets = await OrderTicket.findAll({
      attributes: { exclude },
    });
    //then
    expect(ordertickets).toMatchSnapshot();
  });
  it('TicketSubscription 데이터가 유효', async () => {
    //given, when
    const ticketsubscription = await TicketSubscription.findAll({
      attributes: { exclude },
    });
    //then
    expect(ticketsubscription).toMatchSnapshot();
  });
});
