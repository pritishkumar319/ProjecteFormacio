
using Project1.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Project1.Models;
using Microsoft.AspNetCore.SpaServices.AngularCli;

namespace Project1
{
    public class Startup
    {
        public Startup(IConfiguration configuration) { Configuration = configuration; }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("ANGULAR");
            services.AddDbContext<AngularGPI_Context>(options => options.UseSqlServer(connectionString));

            var clientDomain = Configuration.GetValue<string>("ClientDomain");
            services.AddCors(options =>
            {
                options.AddPolicy("ClientDomain",
                builder =>
                {
                    builder.WithOrigins(clientDomain)
                                        .AllowAnyMethod()
                                        .AllowCredentials()
                                        .SetIsOriginAllowed((host) => true)
                                        .AllowAnyHeader();
                });
            });

            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseFileServer();
            app.UseCors("ClientDomain");




            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });



            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";



                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
