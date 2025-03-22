import { z } from "zod";

const NamedAPIResource = z.object({
  name: z.string(),
  url: z.string().url(),
});

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
export const Pokemon = z.object({
  id: z.number(),
  name: z.string(),
  weight: z.number(),
  abilities: z.array(PokemonAbility),
  sprites: z.object({ front_default: z.string().url() }),
  cries: z.object({ latest: z.string().url() }),
  types: z.array(PokemonType),
});

export const PokemonSpecies = z.object({
  generation: NamedAPIResource,
  varieties: z.array(
    z.object({
      is_default: z.boolean(),
      pokemon: NamedAPIResource,
    })
  ),
});
