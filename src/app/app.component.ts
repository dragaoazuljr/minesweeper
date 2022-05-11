import { Component } from '@angular/core';
import { GridService } from './grid/grid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minesweeper';
  difficulty!: { difficulty: "easy" | "medium" | "hard" | "custom"; lines: number; columns: number; bombs: number; };

  constructor(
    private readonly gridService: GridService
  ) {}

  changeDifficultyAndRestartGame(difficulty: {difficulty: "easy" | "medium" | "hard" | "custom", lines: number, columns: number, bombs: number}) {
    this.difficulty = difficulty;
    this.restartGame();
  }

  restartGame() {
    this.gridService.setDifficulty(this.difficulty);
  };
}
