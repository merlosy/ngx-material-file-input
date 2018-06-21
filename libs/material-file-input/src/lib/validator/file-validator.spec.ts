import { FormControl } from '@angular/forms';
import { FileInput } from '../model/file-input.model';
import { FileValidator } from './file-validator';

describe('FileValidator', () => {

    describe('maxContentSize', () => {

        it('should validate', () => {
            const data = new FileInput([
                new File(['test'], 'test.txt')
            ]);
            const control = new FormControl(data, [FileValidator.maxContentSize(5)]);
            expect(control.value).toBe(data);
            expect(control.valid).toBeTruthy();
        });

        it('should validate with size equal', () => {
            const data = new FileInput([
                new File(['test'], 'test.txt')
            ]);
            const control = new FormControl(data, [FileValidator.maxContentSize(4)]);
            expect(control.value).toBe(data);
            expect(control.valid).toBeTruthy();
        });

        it('should not validate', () => {
            const data = new FileInput([
                new File(['test'], 'test.txt')
            ]);
            const control = new FormControl(data, [FileValidator.maxContentSize(3)]);
            expect(control.value).toBe(data);
            expect(control.valid).toBeFalsy();
        });

        it('should not validate, with "maxContentSize" error', () => {
            const data = new FileInput([
                new File(['test'], 'test.txt')
            ]);
            const control = new FormControl(data, [FileValidator.maxContentSize(3)]);
            expect(control.errors.maxContentSize).toEqual({
                actualSize: 4, maxSize: 3
            });
            expect(control.hasError('maxContentSize')).toBeTruthy();
        });

    });

});
