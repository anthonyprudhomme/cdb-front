import { ComputerModule } from './computer.module';

describe('ComputerModule', () => {
  let computerModule: ComputerModule;

  beforeEach(() => {
    computerModule = new ComputerModule();
  });

  it('should create an instance', () => {
    expect(computerModule).toBeTruthy();
  });
});
