import { POKE_SUIT } from "./type";
import type { PokeCardProps } from "./type";

type Card = Omit<PokeCardProps, "key">;

export const generatePokeDeck: () => Card[] = () => {
  const amount = 52;
  const group = Object.values(POKE_SUIT);

  return [...Array(amount)].map((_, index) => {
    const belongGroup = group[index % group.length];

    return {
      group: belongGroup,
      number: (index % (amount / group.length)) + 1,
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

export const getShuffledDeck: (deck?: number) => PokeCardProps[] = (deck = 1) => {
  return [...Array(deck)]
    .map((_, index) =>
      shuffleList(generatePokeDeck()).map((card) => ({
        key: `${index}_${card.group}_${card.number}`,
        ...card,
      }))
    )
    .flat();
};
