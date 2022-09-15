import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent {
  winner: string = '';

  constructor(
    public dialogRef: MatDialogRef<GameResultComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    
      this.winner = this.data;
  }

  close() {
    this.dialogRef.close('restart');
  } 

}
