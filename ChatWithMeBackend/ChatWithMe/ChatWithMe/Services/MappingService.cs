namespace ChatWithMe.Services;

public interface IMappingService
{
    public Dictionary<int, string> Users { get; }
}

public class MappingService : IMappingService
{
    public MappingService()
    {
        Users = new();
    }

    public Dictionary<int, string> Users { get; }
}