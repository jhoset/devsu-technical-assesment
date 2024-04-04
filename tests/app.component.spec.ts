import {AppComponent} from "../src/app/app.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DialogService} from "../src/app/shared/services/dialog.service";
import {Component} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";


@Component({selector: 'app-navbar', template: 'App Dialog'})
class MockAppNav {
}

@Component({selector: 'app-dialog', template: 'App Dialog'})
class MockDialogComponent {
}

@Component({selector: 'app-toast', template: 'App Toast'})
class MockToastComponent {
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialogService: DialogService;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockDialogComponent, MockToastComponent, MockAppNav],
      providers: [DialogService],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dialogService = TestBed.inject(DialogService)
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should match snapshot', () => {
    fixture.detectChanges();
    expect(compiled).toMatchSnapshot();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should render app-dialog if showDialog is true', () => {
    dialogService.showDialog = true;
    fixture.detectChanges();
    expect(compiled.querySelector('app-dialog')).toBeTruthy();
  });

  test('should not render app-dialog if showDialog is false', () => {
    dialogService.showDialog = false;
    fixture.detectChanges();
    expect(compiled.querySelector('app-dialog')).toBeNull();
  });

  test('should render app-toast', () => {
    expect(compiled.querySelector('app-toast')).toBeTruthy();
  });

  test('should render app-navbar', () => {
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });
});
