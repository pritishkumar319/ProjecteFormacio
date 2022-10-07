import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  public listNumbers1: number[] = [];
  public listNumbers2: number[] = [];

  constructor() { }

  ngOnInit() {
    this.listNumbers1 = [];
    this.listNumbers2 = [];

    for (let i = 0; i < 10; i++) {
      this.listNumbers1.push(i);
    }

    for (let i = 10; i < 20; i++) {
      this.listNumbers2.push(i);
    }
  }

  drop(event: CdkDragDrop<number[]>) {
    // Si se mueve dentro de la misma bloque, lo muevo dentro del contenedor
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Sino lo paso al otro contenedor
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
