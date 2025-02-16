import { Property } from './property';
describe('Property Entity', () => {
  it('deve criar uma instância de Propertye com todos os atributos', () => {
    const property = new Property('1', 'Casa de praia', 'Uma bela casa na praia', 4, 200);

    expect(property.getId()).toBe('1');
    expect(property.getName()).toBe('Casa de praia');
    expect(property.getDescription()).toBe('Uma bela casa na praia');
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it('deve lancar um erro se o nome for vazio', () => {
    expect(() => {
      new Property('1', '', 'descrição', 4, 200);
    }).toThrow('O nome é obrigatório');
  });

  it('deve lancar um erro se o número máximo de hospedes for zero ou negativo', () => {
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
});
