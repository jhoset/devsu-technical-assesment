import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActionsComponent} from "../../../../src/app/views/products/components/actions/actions.component";

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should have isMenuOpen with false value by default', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  test('should toggle isMenuOpen value (F <-> T)', () => {
    component.onToggleMenu(new Event('click'));
    expect(component.isMenuOpen).toBe(true);
    component.onToggleMenu(new Event('click'));
    expect(component.isMenuOpen).toBe(false);
  });

  test('should set isMenuOpen to false', () => {
    component.isMenuOpen = true;
    component.onClose();
    expect(component.isMenuOpen).toBe(false);
  });

  test('should emit onEdit event', () => {
    const spy = jest.spyOn(component.onEdit, 'emit');
    component.onClickEdit(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  test('should emit onDelete event', () => {
    const spy = jest.spyOn(component.onDelete, 'emit');
    component.onClickDelete(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  test('should display menu actions when isMenuOpen is true', () => {
    component.isMenuOpen = true;
    fixture.detectChanges();
    const menuElement = compiled.querySelector('[role="menu"]');
    expect(menuElement).toBeTruthy();
  })

  test('should not display menu actions when isMenuOpen is false', () => {
    fixture.detectChanges();
    const menuElement = compiled.querySelector('[role="menu"]');
    expect(menuElement).toBeNull();
  })
});
