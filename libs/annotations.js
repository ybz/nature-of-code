(function() {
    var ns = window.annotations = {};

    ns.drawGrid = function drawGrid(processing_instance, params) {
        var p = processing_instance;
        params = params || {};
        var e = 0.00001;
        var MAJOR_STEP = 100;
        var SUBDIV = 2;
        var x = 0;
        var y = 0;
        var major_step = params.major_step || MAJOR_STEP;
        var subdiv = params.subdiv || SUBDIV;
        var minor_step = major_step / subdiv;
        var alpha = 150;
        while (x < p.width) {
            x += minor_step;
            if (x % major_step < e) { p.stroke(140, 140, 160, alpha); } else { p.stroke(180, 180, 200, alpha);}
            p.line(x, 0, x, p.height);
        };
        while (y < p.height) {
            y += minor_step;
            if (y % major_step < e) { p.stroke(140, 140, 160, alpha); } else { p.stroke(180, 180, 200, alpha);}
            p.line(0, y, p.width, y);
        };
    };

    ns.markCoord = function markCoord(processing_instance, x, y, params) {
        var p = processing_instance;
        params = params || {};
        var text_size = params.text_size || 12;
        var text_color = params.text_color || [0, 0, 0];
        var coord_color = params.coord_color || [60, 130, 185];
        var coord_text = "(" + x + ", " + y + ")";
        var text_width, text_x, text_y;
        var text_on_left, text_on_top;
        p.fill.apply(p, text_color);
        p.textSize(text_size);
        text_width = p.textWidth(coord_text);
        text_on_left = (x > p.width - text_width - 7) || params.text_on_left
        text_x = (text_on_left) ? x - text_width - 7 : x + 7;
        text_on_bottom = (y < text_size + 1) || params.text_on_bottom;
        text_y = (text_on_bottom) ? y + text_size + 5 : y - 5;
        p.text(coord_text, text_x, text_y);
        p.fill.apply(p, coord_color);
        p.noStroke();
        p.ellipse(x, y, 6, 6);
    };

    ns.markWidth = function markWidth(processing_instance, x, y, width, params) {
        var p = processing_instance;
        params = params || {};
        var text_padding = 5;
        var text_size = params.text_size || 12;
        var text_color = params.text_color || [0, 0, 0];
        var mark_color = params.mark_color || [0, 0, 0];
        var dot_size = params.dot_size || 4;
        var mark_text = "" + width;
        var text_width, text_x, text_y;
        p.textSize(text_size);
        text_width = p.textWidth(mark_text);
        text_x = x + width/2 - text_width/2;
        p.stroke.apply(p, mark_color);
        if ((text_width + text_padding * 2 < width) && !params.text_under) {
            text_y = y + text_size/2 - 2;
            p.line(x, y, x + width/2 - text_width/2 - text_padding, y);
            p.line(x + width/2 + text_width/2 + text_padding, y, x + width, y);
        } else {
            text_y = y + text_size + 3;
            text_padding = 0;
            p.line(x, y, x + width, y);
        }
        p.fill.apply(p, text_color);
        p.text(mark_text, text_x, text_y);
        p.fill.apply(p, mark_color);
        p.ellipse(x, y, dot_size, dot_size);
        p.ellipse(x + width, y, dot_size, dot_size);
        p.line(x, y, x + width/2 - text_width/2 - text_padding, y);
        p.line(x + width/2 + text_width/2 + text_padding, y, x + width, y);
    };

    ns.markHeight = function markHeight(processing_instance, x, y, height, params) {
        var p = processing_instance;
        params = params || {};
        var text_padding = 5;
        var text_size = params.text_size || 12;
        var text_color = params.text_color || [0, 0, 0];
        var mark_color = params.mark_color || [0, 0, 0];
        var dot_size = params.dot_size || 4;
        var mark_text = "" + height;
        var text_width, text_x, text_y;
        p.textSize(text_size);
        text_width = p.textWidth(mark_text);
        text_x = y + height/2 - text_width/2;
        text_y = (x - text_size/2 + 3) * -1;
        p.stroke.apply(p, mark_color);
        if ((text_width + text_padding * 2 < height) && !params.text_under) {
            p.line(x, y, x, y + height/2 - text_width/2 - text_padding);
            p.line(x, y + height/2 + text_width/2 + text_padding, x, y + height);
        } else {
            text_y = (x - text_size - 3) * -1;
            text_padding = 0;
            p.line(x, y, x, y + height);
        }
        p.rotate(p.radians(90));
        p.fill.apply(p, text_color);
        p.text(mark_text, text_x, text_y);
        p.rotate(p.radians(-90));
        p.fill.apply(p, mark_color);
        p.ellipse(x, y, dot_size, dot_size);
        p.ellipse(x, y + height, dot_size, dot_size);
    };

})();
