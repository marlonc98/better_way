import ProviderProps from "./provider_props";

export default interface Provider<T> {
    context: React.Context<T>;
    Provider: React.FC<ProviderProps>
    Actions: T;
}