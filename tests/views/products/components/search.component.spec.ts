import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SearchComponent} from "../../../../src/app/views/products/components/search/search.component";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create the component', () => {
    expect(component).toBeTruthy();
  });

  test('should emit onSearch event when input value changes', () => {
    const searchValue = 'Search Term';
    const onSearchSpy = jest.spyOn(component.onSearch, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');

    // Simulate input value change
    inputElement.value = searchValue
    inputElement.dispatchEvent(new Event('input'));

    // Verify that onSearch event is emitted with correct search value
    expect(onSearchSpy).toHaveBeenCalledWith(searchValue);
  });
});
