import { Injectable } from '@nestjs/common';
import { Player } from './players.entity';
import { logD } from '../utils/logger';

const TAG: string = 'PlayersService';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  createPlayer(
    name: string,
    health: number,
    strength: number,
    attack: number,
  ): Player {
    const player = new Player(name, health, strength, attack);
    // check is player already exists
    const index = this.players.findIndex(
      (playerDetails) => playerDetails.name == player.name,
    );
    if (index == -1) {
      // If player not exists then index will be -1
      logD(TAG, `${player.name} has been created`);
      this.players.push(player);
    } else {
      logD(TAG, `${player.name} already exist then It's updated`);
      // update the existing player details
      this.players[index] = player;
    }
    return player;
  }

  findAll(): Player[] {
    logD(
      TAG,
      `find All Players called: All Players:${!this.players ? 'no player exist' : JSON.stringify(this.players)}`,
    );
    return this.players;
  }
}
