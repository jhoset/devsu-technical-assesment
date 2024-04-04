import {TestBed} from "@angular/core/testing";
import {ToastData, ToastService} from "../../../src/app/shared/services/toast.service";

describe('ToastService', () => {
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    toastService = TestBed.inject(ToastService);
  });

  test('should be created', () => {
    expect(toastService).toBeTruthy();
  });

  test('should display toast message and emit state$', () => {
    const stateSpy = jest.spyOn(toastService.state$, 'next');
    const testData: ToastData = {
      title: 'Test Title',
      message: 'Test Message',
      type: 'success'
    };

    toastService.display(testData);

    expect(toastService.data).toEqual({...testData, show: true, progressWidth: '100%'});
    expect(stateSpy).toHaveBeenCalledWith({...testData, show: true, progressWidth: '100%'})
  });

  test('should hide toast message and emit state$', () => {
    const stateSpy = jest.spyOn(toastService.state$, 'next');
    const testData: ToastData = {
      title: 'Test Title',
      message: 'Test Message',
      type: 'success'
    };
    toastService.display(testData);
    toastService.hide();

    expect(toastService.data).toEqual({...testData, progressWidth: '0%', show: false});
    expect(stateSpy).toHaveBeenCalledWith({...testData, progressWidth: '0%', show: false})
  });
});
