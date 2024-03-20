using SeedExamplesClient
using System.Text.Json.Serialization

namespace SeedExamplesClient

public class Exception
{
    public class _ExceptionInfo : ExceptionInfo
    {
        [JsonPropertyName("type")]
        public string Type { get; } = "generic";
    }
    public class _Timeout
    {
        [JsonPropertyName("type")]
        public string Type { get; } = "timeout";
    }
}
