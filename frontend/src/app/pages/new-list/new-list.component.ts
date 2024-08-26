import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService 
  ) {
    // Check if user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/lists/', response._id]);
      },
      (error) => {
        console.error('Error creating list:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}