// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000'; // Update with your API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getLists() {
    return this.http.get(`${this.apiUrl}/lists`, { headers: this.getHeaders() });
  }

  createList(title: string) {
    return this.http.post(`${this.apiUrl}/lists`, { title }, { headers: this.getHeaders() });
  }

  getTasks(listId: string) {
    return this.http.get(`${this.apiUrl}/lists/${listId}/tasks`, { headers: this.getHeaders() });
  }

  createTasks(title: string, listId: string) {
    return this.http.post(`${this.apiUrl}/lists/${listId}/tasks`, { title }, { headers: this.getHeaders() });
  }

  completeTask(task: any) {
    return this.http.patch(`${this.apiUrl}/lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    }, { headers: this.getHeaders() });
  }
}