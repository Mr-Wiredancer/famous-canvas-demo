/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var CanvasSurface = require('famous/surfaces/CanvasSurface');
    var Surface = require('famous/core/Surface');
    var Draggable = require('famous/modifiers/Draggable');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    mainContext.setPerspective(1000);

    var canvas = new CanvasSurface({
        size: [400, 400],
        properties: {
            backgroundColor: 'red',
        }
    });

    var c;
    function draw(prev, cur) {
        c = c || canvas.getContext('2d');
        c.beginPath();
        c.moveTo(prev[0], prev[1]);
        c.lineTo(cur[0], cur[1]);
        c.lineWidth = 1;
        c.strokeStyle = 'blue';
        c.stroke();
        c.closePath();
    }

    mainContext.add(canvas);

    var d = new Draggable();
    var p = new Surface({
        size: [20, 20],
        properties: {
            borderRadius: '50%',
            backgroundColor: 'green'
        }
    });
    d.subscribe(p); 

    var pos;

    d.on('update', function(d) {
        var x = d.position[0]+10;
        var y = d.position[1]+410;
        if ( x>=0 && x<=400 && y>=0 && y<=400) {
            if (!pos) pos = [x, y];
            draw(pos, [x, y]);
            pos = [x, y];
        } else {
            pos = undefined;
        }
    });

    mainContext.add(new Modifier({
        transform: Transform.translate(0, 400, 0)
    })).add(d).add(p);

});
