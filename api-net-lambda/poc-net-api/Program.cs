using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using POC.NET.API.Services;

public static class Program
{
	public static WebApplication CreateApplication()
	{
		var builder = WebApplication.CreateBuilder();

		// Add services to the container.
		builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
		builder.Services.AddControllersWithViews()
		.AddJsonOptions(options =>
		{
			options.JsonSerializerOptions.PropertyNamingPolicy = null;
			options.JsonSerializerOptions.DictionaryKeyPolicy = null;
		});

		builder.Services.AddCors(options =>
		{
			options.AddPolicy("AllowAllHeadersPolicy",
				policy => policy.WithOrigins("*")
						   .AllowAnyHeader());
		});

        builder.Services.AddSingleton<ITodoService, TodoService>();

        return builder.Build();
	}

	private static async Task Main()
	{
		await using (var app = Program.CreateApplication())
		{
			app.UseCors("AllowAllHeadersPolicy");
			app.UseRouting();
			app.UseEndpoints(endpoints => endpoints.MapControllers());

			await app.RunAsync();
		}
	}


}