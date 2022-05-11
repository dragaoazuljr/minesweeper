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

  @Output() cellClick= new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
