import { Property } from './property';
import { DateRange } from '../value__objects/date_range';
describe('Property Entity', () => {
  it('deve criar uma instância de Propertye com todos os atributos', () => {
    const property = new Property('1', 'Casa de praia', 'Uma bela casa na praia', 4, 200);

    expect(property.getId()).toBe('1');
    expect(property.getName()).toBe('Casa de praia');
    expect(property.getDescription()).toBe('Uma bela casa na praia');
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it('deve lançar um erro se o nome for vazio', () => {
    expect(() => {
      new Property('1', '', 'descrição', 4, 200);
    }).toThrow('O nome é obrigatório');
  });

  it('deve lançar um erro se o número máximo de hospedes for zero ou negativo', () => {
    expect(() => {
      new Property('1', 'Casa', 'descrição', 0, 200);
    }).toThrow('O numero de hóspedes deve ser maior que zero');
  });

  it('deve validar o número  máximo de hóspedes', () => {
    const property = new Property('5', 'Casa de campo', 'descrição', 5, 150);

    expect(() => property.validateGuestCount(7)).toThrow(
      `O número de hóspedes foi execedido máximo permitido ${property.getMaxGuests()}.`,
    );
  });

  it('Não deve aplicar desconto para estadias menores que 7 noites', () => {
    const property = new Property('10', 'Apartamento', 'descrição da casa', 5, 150);
    const dateRange = new DateRange(new Date('2024-12-20'), new Date('2024-12-26'));
    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(900);
  });

  it('deve aplicar desconto em estadias maiores que 7 noites', () => {
    const property = new Property('10', 'Apartamento', 'descrição da casa', 5, 150);
    const dateRange = new DateRange(new Date('2024-12-18'), new Date('2024-12-26'));
    const totalPrice = property.calculateTotalPrice(dateRange);
    expect(totalPrice).toBe(1080);
  });
});
