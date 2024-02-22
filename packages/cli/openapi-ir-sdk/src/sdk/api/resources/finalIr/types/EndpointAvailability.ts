/**
 * This file was auto-generated by Fern from our API Definition.
 */

export type EndpointAvailability = "GenerallyAvailable" | "Beta" | "Deprecated";

export const EndpointAvailability = {
    GenerallyAvailable: "GenerallyAvailable",
    Beta: "Beta",
    Deprecated: "Deprecated",
    _visit: <R>(value: EndpointAvailability, visitor: EndpointAvailability.Visitor<R>) => {
        switch (value) {
            case EndpointAvailability.GenerallyAvailable:
                return visitor.generallyAvailable();
            case EndpointAvailability.Beta:
                return visitor.beta();
            case EndpointAvailability.Deprecated:
                return visitor.deprecated();
            default:
                return visitor._other();
        }
    },
} as const;

export declare namespace EndpointAvailability {
    interface Visitor<R> {
        generallyAvailable: () => R;
        beta: () => R;
        deprecated: () => R;
        _other: () => R;
    }
}
