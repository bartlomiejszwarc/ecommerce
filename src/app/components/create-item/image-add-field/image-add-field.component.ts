import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-add-field',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './image-add-field.component.html',
  styleUrl: './image-add-field.component.css',
})
export class ImageAddFieldComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Input() id!: number;
  @Input() file!: string;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileSelected.emit(file);
  }
}
