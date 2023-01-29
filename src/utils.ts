import { POKE_SUIT } from "./type";
import type { PokeCardProps } from "./type";

type Card = Omit<PokeCardProps, "key">;

export const generatePokeDeck: () => Card[] = () => {
  const amount = 52;
  const group = Object.values(POKE_SUIT);
  const groupLength = amount / group.length;

  return [...Array(amount)].map((_, index) => {
    const belongGroup = group[Math.floor(index / groupLength)];

    const number = (index % groupLength) + 1;
    let symbol = number.toString();

    switch (number) {
      case 1:
        symbol = "A";
        break;
      case 11:
        symbol = "J";
        break;
      case 12:
        symbol = "Q";
        break;
      case 13:
        symbol = "K";
        break;

      default:
        break;
    }

    return {
      group: belongGroup,
      number,
      symbol,
    };
  });
};

export const shuffleList = <T = unknown>(list: T[]) => {
  const localList = [...list];

  localList.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [localList[i], localList[j]] = [localList[j], localList[i]];
  });

  return localList;
};

export const getShuffledDeck: (deck?: number) => PokeCardProps[] = (
  deck = 1
) => {
  return [...Array(deck)]
    .map((_, index) =>
      shuffleList(generatePokeDeck()).map((card) => ({
        key: `${index}_${card.group}_${card.number}`,
        ...card,
      }))
    )
    .flat();
};
