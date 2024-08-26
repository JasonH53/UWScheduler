import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Add this import

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService // Add this
  ) {}

  listId!: string;

  ngOnInit() {
    // Check if user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.listId = params['listId'];
          console.log(this.listId);
        }
      }
    );    
  }

  navigateReturn() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  createTask(title: string) {
    this.taskService.createTasks(title, this.listId).subscribe(
      (newTask: any) => {
        console.log(title);
        this.navigateReturn();
      },
      (error) => {
        console.error('Error creating task:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}