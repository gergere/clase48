import { Application, Router, Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();
const router = new Router();


const colors = [];


router.get("/", (ctx: Context) => {
    const string = colors.join(', ')

    ctx.response.body = `<!DOCTYPE html>
      <html>
        <head><title>Colors</title><head>
        <body>
            <h1>Los colores en memoria:</h1>
            <p>${string}
        </body>
      </html>
    `;
});

router.post("/", async (ctx: Context) => {
    // const { nombre, edad } = ctx.request.body();

    const body = ctx.request.body({ type: 'json' });
    const color = await body.value;

    colors.push(Object.values(color)[0]);

    ctx.response.status = 200;
    ctx.response.body = {
        code: 200,
        data: {
            colors
        }
    };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
console.log('Listening on http://localhost:8080/')