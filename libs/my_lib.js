
(function() {
    var spare;
    var hasSpare = false;
    ns = window.ybz = {
        nrand : function nrand() {
            if (hasSpare) {
                hasSpare = false;
                return spare;
            }
            var u, v, s;
            do {
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;
            s = u * u + v * v;
            } while (s >= 1 || s == 0);
            var mul = Math.sqrt(-2 * Math.log(s) / s);
            spare = v * mul;
            hasSpare = true;
            return u * mul;
        },
        getGaussian : function getGaussian(mean, st_dev) {
            return ns.nrand() * st_dev + mean;
        },
        getRangedGaussian : function getRangedGaussian(start, end, st_dev) {
            var mean = start + end / 2;
            var ret;
            do {
                ret = ns.nrand() * st_dev + mean;
            } while (ret < start || ret > end)
            return ret;
        },
        randMonteCarlo : function randMonteCarlo() {
            while (true) {
                var r1 = Math.random();
                var probability = r1;
                var r2 = Math.random();
                if (r2 < probability) {
                    return r1;
                }
            }
        },
        randExp : function randExp() {
            while (true) {
                var r1 = Math.random();
                var probability = 1-r1*r1;
                var r2 = Math.random();
                if (r2 > probability) {
                    return r1;
                }
            }
        },
        PVRotate : function PVRotate(pvector, ang) {
            var new_ang = pvector.heading2D() + ang;
            var m = pvector.mag();
            pvector.x = p.cos(new_ang) * m;
            pvector.y = p.sin(new_ang) * m;
        },
        polarToCartesian : function polarToCartesian(r, theta, start_point) {
            start_point = start_point || {x : 0, y : 0};
            var x = start_point.x + Math.cos(theta) * r;
            var y = start_point.y + Math.sin(theta) * r;
            return {x : x, y : y}
        }
    };
}
)();
