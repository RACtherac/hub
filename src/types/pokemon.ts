export type EnergyType =
  | "Fire"
  | "Water"
  | "Electric"
  | "Grass"
  | "Psychic"
  | "Fighting";

export type Pokemon = {
  hp: number;
  energy: EnergyType[];
};

export type PlayerBoard = {
  active: Pokemon | null;
  bench: (Pokemon | null)[];
};

export type GameBoard = {
  player1: PlayerBoard;
  player2: PlayerBoard;
};

export type PlayerTurn = "player1" | "player2";