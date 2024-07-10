import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  template: `<h1>Welcome to Angular Model Input Demo App</h1>
    <a routerLink="./people">Santa's List</a>
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'Angular Model Input';
}
