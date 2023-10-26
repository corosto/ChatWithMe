using System;

namespace ChatWithMe.Exceptions
{
    public class NotUniqueElementException : Exception
    {
        public NotUniqueElementException(string msg) : base(msg)
        {

        }
    }
}