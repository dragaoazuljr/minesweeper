import { Component, OnInit } from '@angular/core';
import { fromEvent, Subject, take } from 'rxjs';
import { BombOrFlag } from '../enums/BombOrFlag';
import { GridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  difficulty: { difficulty: "easy" | "medium" | "hard" | "custom"; lines: number; columns: number; bombs: number} = {difficulty: "easy"} as any;
  start: boolean = false;
  grid: BombOrFlag[][] = [];
  firstClick$ = new Subject<number[]>();
  firstClick = false;
  clickedCells: boolean[][] = [[]];


  constructor(
    private readonly gridService: GridService
  ) { }

  ngOnInit(): void {
    this.listenToDifficultyChange();
  }

  listenToDifficultyChange() {
    this.gridService.restartGame$().subscribe(
      (difficulty) => this.restartGame(difficulty));
  }

  restartGame(difficulty: {difficulty: "easy" | "medium" | "hard" | "custom", lines?: number, columns?: number, bombs?: number}) {
    switch (difficulty.difficulty) {
      case "easy":
        difficulty.columns = 8;
        difficulty.lines = 8;
        difficulty.bombs = 10;
        break;
      case "medium":
        difficulty.columns = 16;
        difficulty.lines = 16;
        difficulty.bombs = 40;
        break;
      case "hard":
        difficulty.columns = 30;
        difficulty.lines = 16;
        difficulty.bombs = 99;
        break;
      case "custom":
        break;
    }

    this.difficulty = difficulty as {difficulty: "easy" | "medium" | "hard" | "custom"; lines: number; columns: number; bombs: number; };
    this.createGrid();
  }

  createGrid() {
    this.grid = [];
    this.clickedCells = [];
    for (let i = 0; i < this.difficulty.lines; i++) {
      this.grid[i] = [];
      this.clickedCells[i] = [];
      for (let j = 0; j < this.difficulty.columns; j++) {
        this.grid[i][j] = BombOrFlag["00"];
        this.clickedCells[i][j] = false;
      }
    }

    this.waitForFirstClick();
  }

  waitForFirstClick() {
    this.firstClick = true;
    this.firstClick$
      .pipe(take(1))
      .subscribe(firstPosition => {
        this.fillGrid(firstPosition);
      })
  }

  fillGrid(firstPosition: number[]) {
    this.grid[firstPosition[0]][firstPosition[1]] = BombOrFlag["00"];

    this.setBombs(firstPosition);
    this.setNumberOfBombsOrEmpty();

    this.start = true;
  }

  setBombs(firstPosition: number[]) {
    let bombs = this.difficulty.bombs;

    while (bombs > 0) {
      let randomLine = Math.floor(Math.random() * this.difficulty.lines);
      let randomColumn = Math.floor(Math.random() * this.difficulty.columns);

      if (randomLine !== firstPosition[0] && randomColumn !== firstPosition[1] && this.grid[randomLine][randomColumn] !== BombOrFlag.Bomb) {
        this.grid[randomLine][randomColumn] = BombOrFlag.Bomb;
        bombs--;
      }
    }
  }

  setNumberOfBombsOrEmpty() {
    for (let i = 0; i < this.difficulty.lines; i++) {
      for (let j = 0; j < this.difficulty.columns; j++) {
        if (this.grid[i][j] !== BombOrFlag.Bomb) {
          this.grid[i][j] = this.getNumberOfBombsAround(i, j);
        }
      }
    }
  }

  getNumberOfBombsAround(line: number, column: number): BombOrFlag {
    let numberOfBombs = 0;

    for (let i = line - 1; i <= line + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        if (i >= 0 && i < this.difficulty.lines && j >= 0 && j < this.difficulty.columns) {
          if (this.grid[i][j] === BombOrFlag.Bomb) {
            numberOfBombs++;
          }
        }
      }
    }

    const flagType = "0"+numberOfBombs as keyof typeof BombOrFlag;

    return BombOrFlag[flagType];
  }

  cellClicked(line: number, column: number, event: 'Flag' | 'Click') {
    if (this.firstClick) {
      this.firstClick = false;
      this.firstClick$.next([line, column]);
    }
    
    if(event === 'Flag') {
      this.placeFlag(line, column);
      this.checkWin();
      return ;
    }

    this.clickedCells[line][column] = true;

    if (this.grid[line][column] === BombOrFlag.Bomb) {
      this.gameOver();
    }

    if (this.grid[line][column] === BombOrFlag["00"]) {
      this.clickEmptyCells(line, column);
    }

    this.checkWin();
  }

  checkWin() {
    const flaggedBombs = this.grid.reduce((acc, line) => {
      return acc + line.filter(cell => cell === BombOrFlag.Flag).length;
    }, 0);

    if (flaggedBombs === this.difficulty.bombs) {
      this.gameOver();
    }
  }

  placeFlag(line: number, column: number) {
    if (this.grid[line][column] === BombOrFlag.Bomb) {
      this.grid[line][column] = BombOrFlag.BombWithFlag;
    } else {
      this.grid[line][column] = BombOrFlag.Flag;
    }

    this.clickedCells[line][column] = true;
  }

  clickEmptyCells(line: number, column: number) {
    const emptyCellsAround = this.getEmptyCellsAround(line, column);
  }

  getEmptyCellsAround(line: number, column: number): number[][] {
    const emptyCellsAround = [];

    for (let i = line - 1; i <= line + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        if (i >= 0 && i < this.difficulty.lines && j >= 0 && j < this.difficulty.columns) {
          if (this.grid[i][j] !== BombOrFlag.Bomb && !this.clickedCells[i][j]) {
            emptyCellsAround.push([i, j]);
            this.clickedCells[i][j] = true;
            if(this.grid[i][j] === BombOrFlag["00"]) {
              this.clickEmptyCells(i, j);
            }
          }
        }
      }
    }

    return emptyCellsAround;
  }

  gameOver() {
    this.start = false;
    this.clickedCells = this.clickedCells.map(line => line.map(cell => true));
  }
}
