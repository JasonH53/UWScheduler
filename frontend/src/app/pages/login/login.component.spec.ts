import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login on form submit', () => {
    authServiceSpy.login.and.returnValue(of({ token: 'fake-token' }));

    component.username = 'testuser';
    component.password = 'testpass';
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('should set error message on login failure', () => {
    authServiceSpy.login.and.returnValue(throwError('Login failed'));

    component.username = 'testuser';
    component.password = 'testpass';
    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed. Please check your credentials.');
  });
});