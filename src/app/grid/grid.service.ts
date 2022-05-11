import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private difficulty!: { difficulty: "easy" | "medium" | "hard" | "custom"; lines: number; columns: number; };
  private restartGame = new Subject<{ difficulty: "easy" | "medium" | "hard" | "custom"; lines: number; columns: number; }>()

  constructor() { }

  setDifficulty(difficulty: { difficulty: "easy" | "medium" | "hard" | "custom"; lines: number; columns: number; }) {
    this.difficulty = difficulty;
    this.restartGame.next(difficulty);
  }

  restartGame$ = () => this.restartGame.asObservable();
}
