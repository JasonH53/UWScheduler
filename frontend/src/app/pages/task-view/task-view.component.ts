import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit{

    constructor (private taskService: TaskService, private router : Router, private route : ActivatedRoute) {}

    lists: any;
    tasks: any;
    selectedListId: string | undefined;

    navigateNewList() {
      this.router.navigateByUrl('/new-list');
    }

    ngOnInit() {
      this.route.params.subscribe(
        (params: Params) => {
          if (params['listId']) {
            this.selectedListId = params['listId'];
            this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
              this.tasks = tasks;
            })
          } else {
            this.tasks = undefined;
          }
        }
      )
  
      this.taskService.getLists().subscribe((lists: any) => {
        this.lists = lists;
      })
      
    }

    onTaskClick(task: any) {
      this.taskService.completeTask(task).subscribe(() => {
        console.log("Updated successfully");
        task.completed = !task.completed;
      })
    }

}
