import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  difficulty: "easy" | "medium" | "hard" | "custom" = "easy";
  customDifficultyLines!: number;
  customDifficultyColumns!: number;
  customDifficultyBombs!: number;

  @Output() difficultyChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  setDifficulty(difficulty: "easy" | "medium" | "hard" | "custom") {
    this.difficulty = difficulty;
    this.difficultyChange.emit({difficulty});
  }

  setDifficultyCustom() {
    if((this.customDifficultyLines * this.customDifficultyColumns) / 2 <= this.customDifficultyBombs) {
      alert("The number of bombs must be less than the number of (lines * columns) / 2");
      return;
    }

    this.difficulty = "custom";
    this.difficultyChange.emit({difficulty: "custom", lines: this.customDifficultyLines, columns: this.customDifficultyColumns, bombs: this.customDifficultyBombs});
  }
}
