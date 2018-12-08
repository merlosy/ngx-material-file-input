import { FileInput } from './file-input.model';

describe('FileInput', () => {
  let model: FileInput;

  it('should have empty fileName (empty array)', () => {
    model = new FileInput([]);
    expect(model.fileNames).toBe('');
  });

  it('should have empty fileName (null)', () => {
    model = new FileInput(null);
    expect(model.fileNames).toBe('');
  });
});
