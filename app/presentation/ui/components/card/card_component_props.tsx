import { DimensionValue } from "react-native";

export default interface CardComponentProps {
    title: string;
    description?: string;
    image: string;
    width?: DimensionValue;
    height?: DimensionValue;
}