import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BombOrEmpty, BombOrFlag } from 'src/app/enums/BombOrFlag';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  @Input() cell!: BombOrFlag;
  @Input() show: boolean = false;
  @Input() start: boolean = false;

  @Output() cellClick= new EventEmitter<'Flag' | 'Click'>();

  constructor() { }

  ngOnInit(): void {
  }

  emitFlag(event: Event) {
    if(this.start){
      event.preventDefault();
    }

    this.cellClick.emit('Flag');
  }

  getCellValue(bombOfFlag: BombOrFlag) {
    const cellValue = bombOfFlag.bombOrEmpty;

    if(!this.start) {
      if(bombOfFlag.flagged && cellValue === BombOrEmpty.Bomb) {
        return '🚩💣';
      }
    }

    if(bombOfFlag.flagged) {
      return '🚩';
    }

    if (cellValue === BombOrEmpty.Bomb) {
      return '💣';
    }
      
    return bombOfFlag.bombOrEmpty;
  }
}
