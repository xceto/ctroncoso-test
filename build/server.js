'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('reflect-metadata');
const express = require('express');
const index_1 = require('./src/routes/index');
const app = express();
const { PORT = 3000 } = process.env;
app.use(express.json());
app.use(index_1.routes);
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
