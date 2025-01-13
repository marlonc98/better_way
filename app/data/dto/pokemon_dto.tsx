import PokemonEntity from "@/app/domain/entities/pokemon_entity";

const fromJSON = (json: any): PokemonEntity => {
    return {
        name: json?.species?.name ?? "Unknown name",
        description: json?.flavor_text_entries?.find((entry: { language: { name: string; }; }) => entry.language.name === "en")?.flavor_text ,
        id: json?.id ?? 0,
        imageUrl: json?.sprites?.front_default ?? "Unknown image",
    }
}

const PokemonDto = {
    fromJSON
}

export default PokemonDto;