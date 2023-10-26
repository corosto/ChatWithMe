using System;

namespace ChatWithMe.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException()
        {

        }
        
        public NotFoundException(string msg) : base(msg)
        {

        }
    }
}
