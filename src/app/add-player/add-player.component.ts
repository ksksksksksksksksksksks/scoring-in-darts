import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/player.service';
import { Player } from '../domain/player';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss'],
})
export class AddPlayerComponent implements OnInit {

  form: FormGroup;
    
  constructor(private router: Router,
    private playerService: PlayerService) {
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(20)
        ]),
        email: new FormControl('', Validators.email)  
      });
  }

  addPlayer(){     
    this.playerService.addPlayer(this.form.value);
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
  }

}
