import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from '../../src/players/players.controller';
import { PlayersService } from '../../src/players/players.service';
import { Player } from '../../src/players/players.entity';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
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

    playersController = module.get<PlayersController>(PlayersController);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersController).toBeDefined();
  });

  it('testCreatePlayer', () => {
    const player = playersController.createPlayer({
      name: 'PlayerA',
      health: 50,
      strength: 5,
      attack: 10,
    });
    expect(player.name).toEqual('PlayerA');
    expect(player.health).toEqual(50);
    expect(player.strength).toEqual(5);
    expect(player.attack).toEqual(10);

    const players: Player[] = playersController.findAll();
    expect(players.length).toEqual(2);
  });
});
