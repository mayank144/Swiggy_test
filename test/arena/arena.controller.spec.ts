import { Test, TestingModule } from '@nestjs/testing';
import { ArenaController } from '../../src/arena/arena.controller';
import { ArenaService } from '../../src/arena/arena.service';
import { PlayersService } from '../../src/players/players.service';
import { Player } from '../../src/players/players.entity';

describe('ArenaController', () => {
  let arenaController: ArenaController;
  let arenaService: ArenaService;
  let playersService: PlayersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ArenaController],
      providers: [
        ArenaService,
        {
          provide: PlayersService,
          useValue: {
            findAll: jest
              .fn()
              .mockReturnValue([
                new Player('PlayerA', 50, 5, 10),
                new Player('PlayerB', 100, 10, 5),
              ]),
            createPlayer: jest.fn((name) => {
              if (name === 'PlayerA') return new Player('PlayerA', 50, 5, 10);
              if (name === 'PlayerB') return new Player('PlayerB', 100, 10, 5);
              return null;
            }),
          },
        },
      ],
    }).compile();

    arenaController = moduleRef.get<ArenaController>(ArenaController);
    arenaService = moduleRef.get<ArenaService>(ArenaService);
    playersService = moduleRef.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(arenaController).toBeDefined();
  });

  it('should return the winner of the fight', () => {
    const playerA = playersService
      .findAll()
      .find((playerDetails) => playerDetails.name == 'PlayerA');
    const playerB = playersService
      .findAll()
      .find((playerDetails) => playerDetails.name == 'PlayerB');

    jest.spyOn(arenaService, 'fight').mockReturnValue(playerA);

    const fightResult = arenaController.fight({
      playerAName: 'PlayerA',
      playerBName: 'PlayerB',
    });

    expect(fightResult).toBe(playerA);
    expect(arenaService.fight).toHaveBeenCalledWith(playerA, playerB);
  });
});
