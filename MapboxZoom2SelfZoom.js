/**
 * mapboxgl latitude 40 meters/pixel
 */
const zoomIn40LatMap = [
    {
        "zoom": 0,
        "meters": 59959.436
    },
    {
        "zoom": 1,
        "meters": 29979.718
    },
    {
        "zoom": 2,
        "meters": 14989.859
    },
    {
        "zoom": 3,
        "meters": 7494.9295
    },
    {
        "zoom": 4,
        "meters": 3747.46475
    },
    {
        "zoom": 5,
        "meters": 1873.732375
    },
    {
        "zoom": 6,
        "meters": 936.8661875
    },
    {
        "zoom": 7,
        "meters": 468.43309375
    },
    {
        "zoom": 8,
        "meters": 234.216546875
    },
    {
        "zoom": 9,
        "meters": 117.1082734375
    },
    {
        "zoom": 10,
        "meters": 58.55413671875
    },
    {
        "zoom": 11,
        "meters": 29.277068359375
    },
    {
        "zoom": 12,
        "meters": 14.6385341796875
    },
    {
        "zoom": 13,
        "meters": 7.31926708984375
    },
    {
        "zoom": 14,
        "meters": 3.659633544921875
    },
    {
        "zoom": 15,
        "meters": 1.8298167724609375
    },
    {
        "zoom": 16,
        "meters": 0.9149083862304688
    },
    {
        "zoom": 17,
        "meters": 0.4574541931152344
    },
    {
        "zoom": 18,
        "meters": 0.2287270965576172
    },
    {
        "zoom": 19,
        "meters": 0.1143635482788086
    },
    {
        "zoom": 20,
        "meters": 0.0571817741394043
    },
    {
        "zoom": 21,
        "meters": 0.02859088706970215
    },
    {
        "zoom": 22,
        "meters": 0.014295443534851075
    }
]
/**
 * self tile map
 *  max meter 1024 * 1024 * 8
 *  png pixel 512
 *  level x   y
 *  1     1   1
 *  2     2   2
 *  3     4   4
 *  4     8   8
 *  5     16  16
 *  6     32  32
 *  7     64  64
 */
const tileMap = [
    {
        "zoom": 2,
        "meters": 4096 * 2
    },
    {
        "zoom": 3,
        "meters": 2048 * 2
    },
    {
        "zoom": 4,
        "meters": 1024 * 2
    },
    {
        "zoom": 5,
        "meters": 512 * 2
    },
    {
        "zoom": 6,
        "meters": 256 * 2
    },
    {
        "zoom": 7,
        "meters": 128 * 2
    }
]
function toNumberFixed(number, fractionNumber) {
    return Number(number.toFixed(fractionNumber))
}

function tileRange (zoomIn40LatMap, tileMap) {

    const breaks = [];
    const range = [];

    const lerp = (val, min, max) => (val - min) / (max - min);

    tileMap.forEach(tile => {
        const index = zoomIn40LatMap.findIndex(o => o.meters < tile.meters);
        breaks.push({index, meters: tile.meters, zoom: tile.zoom });
    });

    let _preZoom = 0;

    const maxZoom = zoomIn40LatMap[zoomIn40LatMap.length - 1].zoom;
    breaks.forEach(({index, meters, zoom}, i) => {
        const cur = index;
        const prev = Math.max(cur - 1, 0);
        if (prev !== cur) {
            const prevZoom = zoomIn40LatMap[prev].zoom;

            const min = zoomIn40LatMap[prev].meters;
            const max = zoomIn40LatMap[cur].meters;

            const _zoom = toNumberFixed(lerp(meters, min, max) + prevZoom, 2);

            range.push({
                minZoom: _preZoom,
                maxZoom: i === breaks.length - 1 ? maxZoom : _zoom,
                level: zoom
            })

            _preZoom = _zoom;
        }
    })

    return range;
}
