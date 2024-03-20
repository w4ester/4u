using System.Text.Json.Serialization

namespace SeedTraceClient

public class Playlist
{
    [JsonPropertyName("playlist_id")]
    public string PlaylistId { get; init; }

    [JsonPropertyName("owner-id")]
    public string OwnerId { get; init; }

    [JsonPropertyName("name")]
    public string Name { get; init; }

    [JsonPropertyName("problems")]
    public List<string> Problems { get; init; }
}
