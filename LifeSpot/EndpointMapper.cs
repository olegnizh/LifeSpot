using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;
using System.IO;
using System.Text;

public static class EndpointMapper
{
    /// <summary>
    ///  Маппинг CSS-файлов
    /// </summary>
    public static void MapCss(this IEndpointRouteBuilder builder)
    {
        var cssFiles = new[] { "index.css" };

        foreach (var fileName in cssFiles)
        {
            builder.MapGet($"/Static/CSS/{fileName}", async context =>
            {
                var cssPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "CSS", fileName);
                var css = await File.ReadAllTextAsync(cssPath);
                await context.Response.WriteAsync(css);
            });
        }
    }

    public static void MapJs(this IEndpointRouteBuilder builder)
    {
        var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS");
        var jsFilesPath = Directory.GetFiles(jsPath);
        var jsFiles = new List<string>();
        foreach(var file in jsFilesPath)
        {
            jsFiles.Add(Path.GetFileName(file));
        }

        foreach (var fileName in jsFiles)
        {
            builder.MapGet($"/Static/JS/{fileName}", async context =>
            {
                var jsPath = Path.Combine(Directory.GetCurrentDirectory(), "Static", "JS", fileName);
                var js = await File.ReadAllTextAsync(jsPath);
                await context.Response.WriteAsync(js);
            });
        }
    }

    public static void MapHtml(this IEndpointRouteBuilder builder)
    {
        string footerHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "footer.html"));
        string sideBarHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "sidebar.html"));
        string sliderHtml = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Views", "Shared", "slider.html"));

        builder.MapGet("/", async context =>
        {
            var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "index.html");
            var viewText = await File.ReadAllTextAsync(viewPath);

            // Загружаем шаблон страницы, вставляя в него элементы
            var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                .Replace("<!--SIDEBAR-->", sideBarHtml)
                .Replace("<!--FOOTER-->", footerHtml);

            await context.Response.WriteAsync(html.ToString());
        });

        builder.MapGet("/testing", async context =>
        {
            var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "testing.html");

            // Загружаем шаблон страницы, вставляя в него элементы
            var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                .Replace("<!--SIDEBAR-->", sideBarHtml)
                .Replace("<!--FOOTER-->", footerHtml);

            await context.Response.WriteAsync(html.ToString());
        });

        builder.MapGet("/about", async context =>
        {
            var viewPath = Path.Combine(Directory.GetCurrentDirectory(), "Views", "about.html");

            // Загружаем шаблон страницы, вставляя в него элементы
            var html = new StringBuilder(await File.ReadAllTextAsync(viewPath))
                .Replace("<!--SIDEBAR-->", sideBarHtml)
                .Replace("<!--FOOTER-->", footerHtml)
                .Replace("<!--SLIDER-->", sliderHtml);

            await context.Response.WriteAsync(html.ToString());
        });
    }
}
