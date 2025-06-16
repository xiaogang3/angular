import { Component } from '@angular/core';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
  ];
  draggedItemIndex: number | null = null;
 
  onDragStart(index: number, event: DragEvent) {
    this.draggedItemIndex = index;
    const element = event.target as HTMLElement;
    element.classList.add('dragging');
    event.dataTransfer!.setData('text/plain', index.toString());
    event.dataTransfer!.effectAllowed = 'move';
  }
 
  onDragOver(index: number, event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
  }
 
  onDragEnter(index: number, event: DragEvent) {
    event.preventDefault();
  }
 
  onDrop(index: number, event: DragEvent) {
    event.preventDefault();
    if (this.draggedItemIndex !== null && this.draggedItemIndex !== index) {
      const draggedItem = this.items[this.draggedItemIndex];
      this.items.splice(this.draggedItemIndex, 1);
      this.items.splice(index, 0, draggedItem);
    }
  }
 
  onDragEnd(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('dragging');
    this.draggedItemIndex = null;
  }
  


}
