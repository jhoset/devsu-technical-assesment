import {TestBed} from '@angular/core/testing';
import {CommonProductsService} from "../../../../src/app/views/products/services/common-products.service";
import {FormControl} from "@angular/forms";

describe('CommonProductsService', () => {
  let service: CommonProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonProductsService]
    });
    service = TestBed.inject(CommonProductsService);
  });


  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should reset form correctly (case: CREATE)', () => {
    initFormWithMockValues()
    service.resetForm();

    expect(service.idControl.value).toBe(null);
    expect(service.nameControl.value).toBe(null);
    expect(service.descriptionControl.value).toBe(null);
    expect(service.logoControl.value).toBe(null);
    expect(service.dateReleaseControl.value).toBe(new Date().toISOString().split('T')[0]);
    expect(service.dateRevisionControl.value).toBe(new Date().toISOString().split('T')[0]);
  });

  test('should reset form correctly (case: UPDATE)', () => {
    initFormWithMockValues()
    service.case = 'UPDATE';
    service.resetForm();

    expect(service.idControl.value).toBe('P001');
    expect(service.nameControl.value).toBe(null);
    expect(service.descriptionControl.value).toBe(null);
    expect(service.logoControl.value).toBe(null);
    expect(typeof service.dateReleaseControl.value).toBe('string');
    expect(typeof service.dateRevisionControl.value).toBe('string');
  });

  test('should reset product DTO and form correctly', () => {
    initFormWithMockValues()
    const initialDtoValue = {
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      logo: 'testLogo',
      date_release: '2022-12-31',
      date_revision: '2023-01-01'
    };
    service.productDto$.next(initialDtoValue);

    service.resetProductDtoAndForm();

    expect(service.productDto$.value).toEqual(service.INITIAL_DTO_VALUE);
    expect(service.idControl.value).toBe(null);
    expect(service.nameControl.value).toBe(null);
    expect(service.descriptionControl.value).toBe(null);
    expect(service.logoControl.value).toBe(null);
    expect(typeof service.dateReleaseControl.value).toBe('string');
    expect(typeof service.dateRevisionControl.value).toBe('string');
  });

  test('should synchronize form group with product DTO', () => {
    const mockDto = {
      id: 'testId',
      name: 'testName',
      description: 'testDescription',
      logo: 'testLogo',
      date_release: '2022-12-31',
      date_revision: '2023-01-01'
    };
    service.productDto$.next(mockDto);

    service.syncFormGroup();

    expect(service.idControl.value).toBe(mockDto.id);
    expect(service.nameControl.value).toBe(mockDto.name);
    expect(service.descriptionControl.value).toBe(mockDto.description);
    expect(service.logoControl.value).toBe(mockDto.logo);
    expect(service.dateReleaseControl.value).toBe('2022-12-31');
    expect(service.dateRevisionControl.value).toBe('2023-01-01');
  });

  test('should synchronize product DTO with form group', () => {
    service.syncDto();

    expect(service.productDto$.value.id).toBe(service.idControl.value);
    expect(service.productDto$.value.name).toBe(service.nameControl.value);
    expect(service.productDto$.value.description).toBe(service.descriptionControl.value);
    expect(service.productDto$.value.logo).toBe(service.logoControl.value);
    expect(service.productDto$.value.date_release).toBe(service.dateReleaseControl.value);
    expect(service.productDto$.value.date_revision).toBe(service.dateRevisionControl.value);
  });

  test('should return invalidDate error (release validator)', () => {
    const control = new FormControl('2022-04-15');
    const validationResult = service.releaseDateValidator(control);
    expect(validationResult).toBeTruthy();
  });

  test('should not return invalidDate error (release validator)', () => {
    const control = new FormControl('2030-01-01');
    const validationResult = service.releaseDateValidator(control);
    expect(validationResult).toBeNull();
  });

  test('should return invalidDate error (revision validator)', () => {
    const releaseDateControl = new FormControl('2024-12-31');
    const revisionDateControl = new FormControl('2025-01-01');
    const validatorFn = service.revisionDateValidator(releaseDateControl);
    const validationResult = validatorFn(revisionDateControl);
    expect(validationResult).toBeTruthy();
  });

  test('should not return invalidDate error (revision validator)', () => {
    const releaseDateControl = new FormControl('2024-12-31');
    const revisionDateControl = new FormControl('2025-12-31');
    const validatorFn = service.revisionDateValidator(releaseDateControl);
    const validationResult = validatorFn(revisionDateControl);
    expect(validationResult).toBeNull();
  });

  function initFormWithMockValues() {
    service.idControl.setValue('P001');
    service.nameControl.setValue('testName');
    service.descriptionControl.setValue('testDescription');
    service.logoControl.setValue('testLogo');
    service.dateReleaseControl.setValue('2022-12-31');
    service.dateRevisionControl.setValue('2023-01-01');
  }
});
