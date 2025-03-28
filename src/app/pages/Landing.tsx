import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
// import { SettingsButton } from "../../components/SettingsButton";
// import { PokeBall } from "../../components/PokeBall";
import { ReplayButton } from "../../components/ReplayButton/ReplayButton.tsx";
import { AnswerPanel } from "../../components/AnswerPanel/AnswerPanel.tsx";
import { ReplacementSprite } from "../../components/ReplacementSprite.tsx";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Pokemon, PokemonList } from "../../lib/schema/index";
import { isIE, isSafari } from "react-device-detect";

const TOTAL_POKEMON = 1025;

async function fetchAndValidate<T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch data from ${url}`);
  }

  const data = await response.json();
  const parsedData = schema.parse(data);
  console.log("Validated data:", parsedData);

  return parsedData;
}

async function fetchPokemon(id: number) {
  return fetchAndValidate(`https://pokeapi.co/api/v2/pokemon/${id}`, Pokemon);
}

async function fetchList() {
  return fetchAndValidate(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`,
    PokemonList
  );
}

// async function fetchGeneration(id: number) {
//   // potentially cool fields to incorporate later: is_baby, is_legendary
//   // is_mythical, is_default, for extra guessing categories

//   return fetchAndValidate(
//     `https://pokeapi.co/api/v2/pokemon-species/${id}`,
//     PokemonSpecies
//   );
// }

const getRandomId = () => Math.floor(Math.random() * TOTAL_POKEMON) + 1;

const Landing = () => {
  // Assumes there are 1025 unique Pokémon. True as of now.
  const [id, setId] = useState(getRandomId);
  const [isIncorrect, setIncorrect] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleReset = () => {
    // reset pokemon
    setId(getRandomId);
    // reset incorrect count, to reset hints
    setIncorrectCount(0);
  };

  const handleIncorrect = () => {
    setIncorrect(true);
  };

  const handleReverse = () => {
    setIncorrect(false);
  };

  const handleCount = () => {
    setIncorrectCount(incorrectCount + 1);
  };

  // on first load-in, fetch all Pokémon names for use in search bar suggestions
  // Also ensures data is not stale.
  const { data: pokemonList } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchList(),
  });

  // for our purposes, using only the id's 1025 are suitable for now
  // as we assume default Pokémon (no special forms)
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id),
  });

  const cryUrl = pokemon?.cries?.latest || "";
  const answer = pokemon?.name || "";

  return (
    <>
      <img
        className="h-auto w-[55%] mx-auto sm:w-[55%] md:w-[45%] lg:w-[35%] xl:w-[25%] mt-5.5 mb-2"
        src={logo}
        alt="Who's That Pokémon header"
      />
      <div
        id="content-container"
        className="xl:mx-[20%] mx-[5%] bg-[#fafafa] rounded-xl pt-4"
      >
        <div className="w-[95%] mx-auto mb-6">
          <SelectPanel></SelectPanel>
          {isIE || isSafari ? (
            <div>
              <h1 className="text-[1.75rem] mx-auto w-[70%] text-center leading-9">
                Use the Pokémon’s sprite, rather than its cry, and type your
                guess on the dotted line.
              </h1>
              <h2 className="text-[1.1rem] mx-auto w-[90%] text-center leading-9">
                It seems that you are using{" "}
                <b className="text-[#fd6b70]">Safari or Internet Explorer</b>.
                For the original experience with audio, try playing on another
                browser as your current browser version may not support the .ogg
                files provided by PokéAPI.
              </h2>
              <ReplacementSprite
                data={pokemon}
                isLoading={isLoading}
                isIncorrect={isIncorrect}
              ></ReplacementSprite>
            </div>
          ) : (
            <div>
              <h1 className="text-[1.75rem] mx-auto w-[70%] text-center leading-9">
                Listen to the Pokémon's cry and type your guess on the dotted
                line.
              </h1>
              <ReplayButton
                isLoading={isLoading}
                url={cryUrl}
                error={error}
                isIncorrect={isIncorrect}
              ></ReplayButton>
            </div>
          )}
          <AnswerPanel
            pokemonList={pokemonList}
            answer={answer}
            handleReset={handleReset}
            handleIncorrect={handleIncorrect}
            handleReverse={handleReverse}
            handleIncreaseCount={handleCount}
          ></AnswerPanel>
        </div>
        <div className="mx-auto text-center w-[80%]">
          <HintPanel data={pokemon} count={incorrectCount}></HintPanel>
          {/* <SettingsButton></SettingsButton>
          <PokeBall></PokeBall> */}
        </div>
      </div>
    </>
  );
};

export default Landing;
