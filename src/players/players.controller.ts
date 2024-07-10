import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './players.entity';
import { logD } from '../utils/logger';

const TAG: string = 'PlayersController';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(
    @Body()
    body: {
      name: string;
      health: number;
      strength: number;
      attack: number;
    },
  ): Player {
    logD(
      TAG,
      '-------------------------Create Player-------------------------',
    );
    return this.playersService.createPlayer(
      body.name,
      body.health,
      body.strength,
      body.attack,
    );
  }

  @Get()
  findAll(): Player[] {
    logD(
      TAG,
      '-------------------------findAll Player-------------------------',
    );
    return this.playersService.findAll();
  }
}
