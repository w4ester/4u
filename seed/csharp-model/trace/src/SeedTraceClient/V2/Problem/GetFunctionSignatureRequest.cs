using System.Text.Json.Serialization
using OneOf
using SeedTraceClient.V2

namespace SeedTraceClient.V2

public class GetFunctionSignatureRequest
{
    [JsonPropertyName("functionSignature")]
    public OneOf<VoidFunctionSignature,NonVoidFunctionSignature,VoidFunctionSignatureThatTakesActualResult> FunctionSignature { get; init; }
}
