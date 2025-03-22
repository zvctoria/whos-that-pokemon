import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { PokeBall } from "../../components/PokeBall";
import { ReplayButton } from "../../components/ReplayButton/ReplayButton.jsx";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Pokemon } from "../../lib/schema/index";

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
  const [id, setId] = useState(Math.floor(Math.random() * 1026));

  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemon(id),
  });

  return (
    <>
      <img
        className="h-auto w-1/2 mx-auto"
        src={logo}
        alt="Who's That Pokémon header"
      />
      <SelectPanel></SelectPanel>
      <h2>Please click at least one generation! (Toggle)</h2>
      <ReplayButton
        isLoading={isLoading}
        data={pokemon}
        error={error}
      ></ReplayButton>
      <input type="text" className="block bg-white" />
      <HintPanel></HintPanel>
      <button>(when done) Try Again</button>
      <SettingsButton></SettingsButton>
      <PokeBall></PokeBall>
      <div>{id}</div>
    </>
  );
};

export default Landing;
