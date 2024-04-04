import {TestBed} from "@angular/core/testing";
import {DialogData, DialogService} from "../../../src/app/shared/services/dialog.service";

const testData: DialogData = {
  title: 'Test Title',
  body: 'Test Body'
};
describe('DialogService', () => {
  let dialogService: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dialogService = TestBed.inject(DialogService);
  });

  test('should be created', () => {
    expect(dialogService).toBeTruthy();
  });

  it('should open dialog and emit display$ with correct data', () => {
    const displayNextSpy = jest.spyOn(dialogService.display$, 'next');
    dialogService.open(testData);
    expect(displayNextSpy).toHaveBeenCalledWith(testData)
  });

  it('should close dialog and emit dialogResponse$ with "cancel"', () => {
    const dialogResponseSpy = jest.spyOn(dialogService.dialogResponse$, 'next');
    dialogService.open(testData);
    dialogService.close();
    expect(dialogResponseSpy).toHaveBeenCalledWith('cancel');
  });

  it('should close dialog and emit dialogResponse$ with "ok"', () => {
    const dialogResponseSpy = jest.spyOn(dialogService.dialogResponse$, 'next');
    dialogService.open(testData);
    dialogService.confirm();
    expect(dialogResponseSpy).toHaveBeenCalledWith('ok');
  });
});
