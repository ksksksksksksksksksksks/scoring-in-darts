import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectGameComponent } from './select-game/select-game.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { GameComponent } from './game/game.component';

import { ReactiveFormsModule } from '@angular/forms';

import { PlayerService } from './player.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './search.pipe';

const routes = [
  { path:'', component: SelectGameComponent},
  { path: 'add-player', component: AddPlayerComponent},
  { path: 'game', component: GameComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SelectGameComponent,
    AddPlayerComponent,
    GameComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
