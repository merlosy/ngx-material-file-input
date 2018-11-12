import { FileInput } from './file-input.model';

describe('FileInput', () => {
  let model: FileInput;

  it('should have empty fileName', () => {
    model = new FileInput([]);
    expect(model.fileNames).toBe('');
  });
});
