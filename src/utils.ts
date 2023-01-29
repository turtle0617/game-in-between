import { POKE_SUIT } from "./type";
import type { PokeCardProps } from "./type";

type Card = Omit<PokeCardProps, "key">;

export const generatePokeDeck: () => Card[] = () => {
  const amount = 52;
  const group = Object.values(POKE_SUIT);

  return [...Array(amount)].map((_, index) => {
    const belongGroup = group[index % group.length];

    const number = (index % (amount / group.length)) + 1;
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

  localList.forEach((item, i) => {
    let j = Math.floor(Math.random() * (i + 1));
    [item, localList[j]] = [localList[j], item];
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
