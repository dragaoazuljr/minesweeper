import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BombOrFlag } from 'src/app/enums/BombOrFlag';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell!: BombOrFlag;
  @Input() show: boolean = false;

  @Output() cellClick= new EventEmitter<'Flag' | 'Click'>();

  constructor() { }

  ngOnInit(): void {
  }

  emitFlag(event: Event) {
    event.preventDefault();
    this.cellClick.emit('Flag');
  }

  getCellValue(bombOfFlag: BombOrFlag) {
    switch (bombOfFlag) {
      case BombOrFlag.Flag:
        return '🚩';
      case BombOrFlag.Bomb:
        return '💣';
      case BombOrFlag.BombWithFlag:
        return '🚩';
      default:
        return bombOfFlag;
      }
    }
}
