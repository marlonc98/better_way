import BerryEntity from "@/app/domain/entities/berry_entity";

const fromJSON = (data: any): BerryEntity => {
    return {
        id: data.id,
        name: data.item.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.item.name}.png`,
    }
}

const BerryDto = {
    fromJSON,
}

export default BerryDto;