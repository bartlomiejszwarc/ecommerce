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
    try {
      const file: File = event.target.files[0];
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        if (file.size / 1000000 < 8) {
          this.fileSelected.emit(file);
        } else {
          throw new Error('Image cannot be larger than 8 megabytes.');
        }
      } else {
        throw new Error('Invalid image type.');
      }
    } catch (e) {}
  }
}
