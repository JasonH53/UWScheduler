import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent {

  constructor(private taskService: TaskService, private router : Router) {}

  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.router.navigate([ '/lists/', response._id ]); 
  })}
}
