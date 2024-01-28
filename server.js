import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import renderApp from './dist/server/ServerApp.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
// render the shell
const html = fs
  .readFileSync(path.resolve(__dirname, './dist/client/index.html'))
  .toString();

const parts = html.split('not rendered'); 

const app = express();
app.use("/assets",
    express.static(path.resolve(__dirname, "./dist/client/assets"))
)
// serve all other files as static
app.use((req,res) =>{
    res.write(parts[0]);

    const stream = renderApp(req.url, {
        onShellReady(){
            stream.pipe(res);
        },
        onShellError(err){
            // err hanlding
        },
        onAllReady(){
            res.write(parts[1]);
            res.end();
        },
        onAllError(err){
            // err hanlding
            console.log(err);
        }
    });
})

console.log(`Listening on port http://localhost:${PORT}`);
app.listen(PORT);