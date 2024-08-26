import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should send a POST request to /login', () => {
      const mockResponse = { user: { id: 1, username: 'testuser' }, token: 'fake-jwt-token' };
      const username = 'testuser';
      const password = 'testpass';

      service.login(username, password).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });
      req.flush(mockResponse);
    });
  });

  describe('register', () => {
    it('should send a POST request to /register', () => {
      const mockResponse = { user: { id: 1, username: 'newuser' }, token: 'fake-jwt-token' };
      const username = 'newuser';
      const password = 'newpass';

      service.register(username, password).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });
      req.flush(mockResponse);
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('token', 'fake-token');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if token does not exist', () => {
      localStorage.removeItem('token');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('logout', () => {
    it('should remove token and user from localStorage', () => {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser' }));
      
      service.logout();
      
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
});