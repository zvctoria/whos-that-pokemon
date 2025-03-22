import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { PokeBall } from "../../components/PokeBall";
import { ReplayButton } from "../../components/ReplayButton/ReplayButton.jsx";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const NamedAPIResource = z.object({
  name: z.string(),
  url: z.string().url(),
});

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
  // note: while ability URL also provides the name, keep 'name' field to avoid
  // unnecessary API calls if further hints are not needed
  // is_hidden: Whether or not this is a hidden ability.
  // slot: The slot this ability occupies in this Pokémon species.
  const PokemonAbility = z.object({
    is_hidden: z.boolean(),
    slot: z.number(),
    ability: NamedAPIResource,
  });

  // slot: The order the Pokémon's types are listed in.
  const PokemonType = z.object({
    slot: z.number(),
    type: NamedAPIResource,
  });

  // also note: these stats are based upon the latest game/data
  // e.g. "type" would be the current type, and does not consider cases
  // such as the retconned fairy type.
  const schema = z.object({
    id: z.number(),
    name: z.string(),
    weight: z.number(),
    abilities: z.array(PokemonAbility),
    sprites: z.object({ front_default: z.string().url() }),
    cries: z.object({ latest: z.string().url() }),
    types: z.array(PokemonType),
  });

  return fetchAndValidate(`https://pokeapi.co/api/v2/pokemon/${id}`, schema);
}

async function fetchGeneration(id: number) {
  // potentially cool fields to incorporate later: is_baby, is_legendary
  // is_mythical, is_default, for extra guessing categories
  const schema = z.object({
    generation: NamedAPIResource,
    varieties: z.array(
      z.object({
        is_default: z.boolean(),
        pokemon: NamedAPIResource,
      })
    ),
  });

  return fetchAndValidate(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    schema
  );
}

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
