import app from "./app.js";
import {env} from "./config/env.js";
import {connectDB} from "./config/db.js";
import { Restaurant } from "./models/restaurant/restaurant.model.js";
import { Table } from "./models/table/table.model.js";

console.log("Models loaded:", Restaurant.modelName, Table.modelName);

const server=async()=>{
    await connectDB();
    app.listen(env.PORT,()=>{
        console.log(`Server running on port ${env.PORT}`)
    })
};

server();
