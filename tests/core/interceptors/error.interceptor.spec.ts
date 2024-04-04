import {TestBed} from '@angular/core/testing';
import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {errorInterceptor} from "../../../src/app/core/interceptors/error.interceptor";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {ToastService} from "../../../src/app/shared/services/toast.service";

const mockDisplay = jest.fn();

const mockToastService = {
  display: mockDisplay
}

describe('errorInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        {provide: ToastService, useValue: mockToastService}
      ],
    });
  });

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient)
  })
  afterEach(() => {
    httpTestingController.verify();
  });
  test('should handle Unauthorized HTTP errors correctly', () => {
    const testUrl = 'https://test.com';
    httpClient.get(testUrl).subscribe();

    //? Get HTTP request & simulate response
    const req = httpTestingController.expectOne(testUrl);
    req.flush('invalid token', {status: 401, statusText: 'test error'})

    expect(mockDisplay).toHaveBeenCalledWith({
      message: "invalid token",
      show: true,
      title: "Unauthorized Error",
      type: "error"
    });
  });

  test('should handle Internal Server HTTP errors correctly', () => {
    const testUrl = 'https://test.com';
    httpClient.get(testUrl).subscribe();

    //? Get HTTP request & simulate response
    const req = httpTestingController.expectOne(testUrl);
    req.flush('internal server error', {status: 500, statusText: 'test error'})

    expect(mockDisplay).toHaveBeenCalledWith({
      message: "Something went wrong, please notify admin",
      show: true,
      title: "Internal Server Error",
      type: "error"
    });
  });

  test('should handle Other HTTP errors correctly', () => {
    const testUrl = 'https://test.com';
    httpClient.get(testUrl).subscribe();

    //? Get HTTP request & simulate response
    const req = httpTestingController.expectOne(testUrl);
    req.flush('bad request', {status: 400, statusText: 'test error'})

    expect(mockDisplay).toHaveBeenCalledWith({
      message: "bad request",
      show: true,
      title: "Http Error",
      type: "error"
    });
  });

});
