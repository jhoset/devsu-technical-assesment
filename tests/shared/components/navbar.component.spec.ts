import { ComponentFixture, TestBed } from '@angular/core/testing';
import {NavbarComponent} from "../../../src/app/shared/components/navbar/navbar.component";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create component', () => {
    expect(component).toBeTruthy();
  });

  test('should contain link with correct aria-label', () => {
    const linkElement: HTMLAnchorElement = fixture.nativeElement.querySelector('header a');
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('aria-label')).toBe('Banco - Logo');
  });

  test('should contain SVG element with class h-8', () => {
    const svgElement: SVGElement = fixture.nativeElement.querySelector('header svg');
    expect(svgElement).toBeTruthy();
    expect(svgElement.classList.contains('h-8')).toBe(true);
  });
});
