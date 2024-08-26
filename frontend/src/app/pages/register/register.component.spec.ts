import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: spy }]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method on form submission', () => {
    const username = 'testuser';
    const password = 'testpass';
    const mockResponse = { user: { username }, token: 'fake-token' };

    authServiceSpy.register.and.returnValue(of(mockResponse));

    component.username = username;
    component.password = password;
    component.onSubmit();

    expect(authServiceSpy.register).toHaveBeenCalledWith(username, password);
  });

  it('should set error message on registration failure', () => {
    authServiceSpy.register.and.returnValue(throwError('Registration failed'));

    component.onSubmit();

    expect(component.errorMessage).toBe('Registration failed. Please try again.');
  });
});