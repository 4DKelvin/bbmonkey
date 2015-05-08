/**
 * Created by Kelvin on 5/8/15.
 */
"use strict";
var express = require("express"),
    app = express();
app.use(express.static('resources')).listen(4000);
