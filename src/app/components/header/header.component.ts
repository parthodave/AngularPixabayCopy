import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() query = '';
  @Output() search = new EventEmitter<string>();

  onSubmit(e: Event) {
    e.preventDefault();
    this.search.emit(this.query.trim());
  }
}
