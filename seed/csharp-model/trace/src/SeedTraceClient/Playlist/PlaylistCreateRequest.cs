using System.Text.Json.Serialization

namespace SeedTraceClient

public class PlaylistCreateRequest
{
    [JsonPropertyName("name")]
    public string Name { get; init; }
    [JsonPropertyName("problems")]
    public List<string> Problems { get; init; }
}
