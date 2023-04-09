interface Player {
  score: number;
  name: string;
}

class Hockeer implements Player {
  score: number;
  name: string;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}

export default Hockeer;
