import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService: TaskService, private router : Router, private route : ActivatedRoute) {}

  listId!: string;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.listId = params['listId'];
          console.log(this.listId);
        }
      }
    )    
  }

  navigateReturn() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  createTask(title: string) {
    this.taskService.createTasks(title, this.listId).subscribe((newTask : any) => {
      console.log(title);
      this.navigateReturn();
    })
  }
}

