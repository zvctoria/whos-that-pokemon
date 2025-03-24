import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
// import { SettingsButton } from "../../components/SettingsButton";
// import { PokeBall } from "../../components/PokeBall";
import { ReplayButton } from "../../components/ReplayButton/ReplayButton.tsx";
import { AnswerPanel } from "../../components/AnswerPanel/AnswerPanel.tsx";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Pokemon, PokemonList } from "../../lib/schema/index";

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

const Landing = () => {
  // Assumes there are 1025 unique Pokémon. True as of now.
  const [id, setId] = useState(Math.floor(Math.random() * TOTAL_POKEMON) + 1);

  // on first load-in, fetch all Pokémon names for use in search bar suggestions
  // Also ensures data is not stale.
  const {
    data: pokemonList,
    isLoading: listLoading,
    error: listError,
  } = useQuery({
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

  return (
    <>
      <img
        className="h-auto w-[60%] mx-auto sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] mt-5.5 mb-2"
        src={logo}
        alt="Who's That Pokémon header"
      />
      <div
        id="content-container"
        className="xl:mx-[20%] mx-[5%] bg-[#fafafa] rounded-xl pt-4"
      >
        <div className="w-[95%] mx-auto mb-6">
          <SelectPanel></SelectPanel>
          <h1 className="text-[1.75rem] mx-auto w-[70%] text-center leading-9">
            Listen to the Pokémon's cry and type your guess on the dotted line.
          </h1>
          <h2 className="hidden">
            Please click at least one generation! (Toggle)
          </h2>
          <ReplayButton
            isLoading={isLoading}
            url={cryUrl}
            error={error}
          ></ReplayButton>
          <AnswerPanel pokemonList={pokemonList}></AnswerPanel>
        </div>
        <div className="mx-auto text-center w-[80%] pb-3">
          <HintPanel data={pokemon}></HintPanel>
          <button className="hidden">(when done) Try Again</button>
          {/* <SettingsButton></SettingsButton>
          <PokeBall></PokeBall> */}
        </div>
      </div>
    </>
  );
};

export default Landing;
