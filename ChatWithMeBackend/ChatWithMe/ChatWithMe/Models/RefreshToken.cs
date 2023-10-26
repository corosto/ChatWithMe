using System.Security.Cryptography;

namespace ChatWithMe.Models;

public class RefreshToken
{
    public string Token { get; }
    public DateTime Created { get; }
    public DateTime Expires { get; }

    public RefreshToken()
    {
        Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        Created = DateTime.Now;
        Expires = Created.AddDays(1);
    }
}