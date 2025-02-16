import { DateRange } from '../value__objects/date_range';
import { Property } from './property';
import { User } from './User';
import { Booking } from './booking';

describe('Booking entity', () => {
  it('Deve criar uma instância de booking com todos os atibutos', () => {
    const property = new Property('1', 'Casa', 'descricao', 4, 100);
    const user = new User('1', 'João Silva');
    const dateRange = new DateRange(new Date('2024-01-01'), new Date('2024-01-10'));
    const booking = new Booking('1', property, user, dateRange, 2);
    expect(booking.getId()).toBe('1');
    expect(booking.getProperty()).toBe(property);
    expect(booking.getUser()).toBe(user);
    expect(booking.getDateRange()).toBe(dateRange);
    expect(booking.getGuestCount()).toBe(2);
  });

  it('Deve verificar disponibilidade da propiedade', () => {
    const property = new Property('1', 'Apartamento', 'descricao', 4, 200);
    const dateRange = new DateRange(new Date('2024-01-06'), new Date('2024-01-10'));
    const dateRange2 = new DateRange(new Date('2024-01-07'), new Date('2024-01-15'));
    const user = new User('1', 'João Silva');

    new Booking('1', property, user, dateRange, 2);
    expect(property.isAvalable(dateRange)).toBe(false);
    expect(property.isAvalable(dateRange2)).toBe(false);
  });

  it('Deve lançar um erro se o número hospedes for 0', () => {
    const property = new Property('1', 'Apartamento', 'descricao', 5, 150);
    const user = new User('1', 'José Pereira');
    const dateRange = new DateRange(new Date('2024-01-06'), new Date('2024-01-10'));
    expect(() => {
      new Booking('1', property, user, dateRange, 0);
    }).toThrow('O número de hóspedes não pode ser 0');
  });

  it('Deve lançar um erro ao tentar reservar com um número de hóspedes acima do máximo permitido', () => {
    const property = new Property('1', 'Apartamento', 'descricao', 4, 150);
    const user = new User('1', 'José Pereira');
    const dateRange = new DateRange(new Date('2024-01-06'), new Date('2024-01-10'));
    expect(() => {
      new Booking('1', property, user, dateRange, 5);
    }).toThrow('O número de hóspedes foi execedido máximo permitido 4.');
  });

  it('Deve calcular o preço total com desconto', () => {
    // Arrange
    const property = new Property('1', 'Apartamento', 'descricao', 4, 150);
    const user = new User('1', 'José Pereira');
    const dateRange = new DateRange(new Date('2024-02-20'), new Date('2024-02-25'));

    // Act
    const booking = new Booking('1', property, user, dateRange, 2);

    // Assert
    expect(booking.getTotalPrice()).toBe(750);
  });
});
