// home-page.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { TokenService } from '@core/token/services/token.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TokenService', ['getRole']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HomePageComponent],
      providers: [{ provide: TokenService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    tokenServiceSpy = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener el rol desde el token en ngOnInit', () => {
    tokenServiceSpy.getRole.and.returnValue('ADMIN');
    component.ngOnInit();
    expect(component.userRole).toBe('ADMIN');
  });
});
