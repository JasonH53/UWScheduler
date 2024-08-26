import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'TaskMaster Pro';
  
  features = [
    {
      icon: 'fas fa-list-ul',
      title: 'Task Lists',
      description: 'Create multiple lists to organize your tasks by project or category.'
    },
    {
      icon: 'fas fa-check-circle',
      title: 'Easy Task Management',
      description: 'Add, edit, and complete tasks with just a few clicks.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Friendly',
      description: 'Access your tasks on-the-go with our responsive design.'
    },
    {
      icon: 'fas fa-lock',
      title: 'Secure',
      description: 'Your data is protected with state-of-the-art security measures.'
    }
  ];

  currentYear = new Date().getFullYear();
}