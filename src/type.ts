export enum POKE_SUIT {
  SPADE = "spade",
  HEART = "heart",
  DIAMOND = "diamond",
  CLUB = "club",
}

export interface PokeCardProps {
  key: string;
  group: POKE_SUIT;
  number: number;
}
