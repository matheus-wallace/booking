import { User } from './User';

describe('User Entity', () => {
  it('deve criar uma instancia de User com Id e Nome', () => {
    const user = new User('1', 'João da Silva');
    expect(user.getId()).toBe('1');
    expect(user.getName()).toBe('João da Silva');
  });

  it('Deve lançar um erro se o nome for vazio', () => {
    expect(() => new User('2', '')).toThrow('O nome é obrigatório');
  });

  it('Deve lançar um erro se o nome for vazio', () => {
    expect(() => new User('', 'João da Silva')).toThrow('O ID é obrigatório');
  });
});
