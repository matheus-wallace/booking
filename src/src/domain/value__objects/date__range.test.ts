import { DateRange } from './date_range';

describe('DataRange Value Object', () => {
  it('deve lançar um erro se a data de término for antes da data de início', () => {
    expect(() => {
      new DateRange(new Date('2024-12-25'), new Date('2024-12-20'));
    }).toThrow('A data de término deve ser posterior à data de início.');
  });

  it('deve criar uma instância de date range com a data de iníco e término, e verifiar o retorno das datas', () => {
    const startDate = new Date('2024-12-20');
    const endDate = new Date('2024-12-25');
    const dateRange = new DateRange(startDate, endDate);

    expect(dateRange.getStartDate()).toEqual(startDate);
    expect(dateRange.getEndDate()).toEqual(endDate);
  });

  it('deve calcular o total de noites corretamente', () => {
    const startDate = new Date('2024-12-20');
    const endDate = new Date('2024-12-25');
    const dateRange = new DateRange(startDate, endDate);
    const totalNights = dateRange.getTotalNights();

    expect(totalNights).toBe(5);

    const startDate1 = new Date('2024-11-20');
    const endDate1 = new Date('2024-11-31');
    const dateRange1 = new DateRange(startDate1, endDate1);
    const totalNights1 = dateRange1.getTotalNights();

    expect(totalNights1).toBe(11);
  });

  it('deve verificar se dois intervalos de datas se sobrepoem', () => {
    const dateRange1 = new DateRange(new Date('2024-11-20'), new Date('2024-11-30'));
    const dateRange2 = new DateRange(new Date('2024-11-22'), new Date('2024-11-27'));

    const overlaps = dateRange1.overlaps(dateRange2);

    expect(overlaps).toBe(true);
  });

  it('deve lancer erro caso a data de inicio e termino for iguáis', () => {
    const date = new Date('2024-12-20');
    expect(() => {
      new DateRange(date, date);
    }).toThrow('A data de início e término não pode ser iguais');
  });
});
