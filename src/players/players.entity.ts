export class Player {
  constructor(
    public name: string,
    public health: number,
    public strength: number,
    public attack: number,
  ) {}

  isAlive(): boolean {
    return this.health > 0;
  }
}
