using ChatWithMe.Exceptions;

namespace ChatWithMe.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (NotFoundException nfe)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(nfe.Message);
            }
            catch (InvalidLoginDataException ilde)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(ilde.Message);
            }
            catch (NotUniqueElementException nue)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(nue.Message);
            }
            catch (EmailAlreadyUsedException eau)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(eau.Message);
            }
            catch (InvalidOperationException ioe)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(ioe.Message);
            }
            catch (IllegalOperationException e)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(e.Message);
            }

            catch (Exception e)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("Coś poszło nie tak");
            }
        }
    }
}
