import {TestBed} from "@angular/core/testing";
import {DomEventsHandlerService} from "../../../src/app/shared/services/dom-events-handler.service";

describe('DomEventsHandlerService', () => {
  let domEventsHandlerService: DomEventsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    domEventsHandlerService = TestBed.inject(DomEventsHandlerService);
  });

  test('should be created', () => {
    expect(domEventsHandlerService).toBeTruthy();
  });
});
