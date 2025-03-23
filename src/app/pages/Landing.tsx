import { SelectPanel } from "../../components/SelectPanel";
import { HintPanel } from "../../components/HintPanel";
import { SettingsButton } from "../../components/SettingsButton";
import { PokeBall } from "../../components/PokeBall";
import { ReplayButton } from "../../components/ReplayButton/ReplayButton.tsx";
import { AnswerPanel } from "../../components/AnswerPanel/AnswerPanel.tsx";
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

  const cryUrl = pokemon?.cries?.latest || "";

  return (
    <>
      <img
        className="h-auto w-[35%] mx-auto sm:w-[65%] md:w-[55%] lg:w-[45%] xl:w-[35%]"
        src={logo}
        alt="Who's That Pokémon header"
      />
      <div
        id="content-container"
        className="xl:mx-[20%] mx-[5%] bg-[#fafafa] rounded-md pt-3"
      >
        <div className="w-[95%] mx-auto mb-5">
          <SelectPanel></SelectPanel>
          <h1 className="text-[1.75rem] font-[pixel-operator,sans-serif] mx-auto w-[70%] text-center">
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
          <AnswerPanel></AnswerPanel>
        </div>
        <div className="text-center">
          <HintPanel data={pokemon}></HintPanel>
          <button className="hidden">(when done) Try Again</button>
          {/* <SettingsButton></SettingsButton>
          <PokeBall></PokeBall> */}
          {id}
        </div>
      </div>
    </>
  );
};

export default Landing;
