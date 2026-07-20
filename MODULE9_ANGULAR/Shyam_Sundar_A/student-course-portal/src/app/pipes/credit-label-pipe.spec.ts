import { CreditLabelPipe } from './credit-label-pipe';

describe('CreditLabelPipe', () => {
  let pipe: CreditLabelPipe;

  beforeEach(() => {
    pipe = new CreditLabelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should render "1 Credit" for a value of 1', () => {
    expect(pipe.transform(1)).toBe('1 Credit');
  });

  it('should render "3 Credits" for a value of 3', () => {
    expect(pipe.transform(3)).toBe('3 Credits');
  });

  it('should render "No Credits" for a value of 0', () => {
    expect(pipe.transform(0)).toBe('No Credits');
  });

  it('should render "No Credits" for null', () => {
    expect(pipe.transform(null)).toBe('No Credits');
  });

  it('should render "No Credits" for undefined', () => {
    expect(pipe.transform(undefined)).toBe('No Credits');
  });

  it('should pluralize any value greater than 1', () => {
    expect(pipe.transform(4)).toBe('4 Credits');
  });
});
