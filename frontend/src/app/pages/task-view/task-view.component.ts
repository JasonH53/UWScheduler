import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  lists: any;
  tasks: any;
  selectedListId: string | undefined;

  navigateNewList() {
    this.router.navigateByUrl('/new-list');
  }

  ngOnInit() {
    // Check if user is authenticated
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe(
            (tasks: any) => {
              this.tasks = tasks;
            },
            (error) => {
              console.error('Error fetching tasks:', error);
              if (error.status === 401) {
                this.router.navigate(['/login']);
              }
            }
          );
        } else {
          this.tasks = undefined;
        }
      }
    );

    this.taskService.getLists().subscribe(
      (lists: any) => {
        this.lists = lists;
      },
      (error) => {
        console.error('Error fetching lists:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  onTaskClick(task: any) {
    this.taskService.completeTask(task).subscribe(
      () => {
        console.log("Updated successfully");
        task.completed = !task.completed;
      },
      (error) => {
        console.error('Error updating task:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}