/**
 * mapboxgl latitude 40 meters/pixel
 * https://docs.mapbox.com/help/glossary/zoom-level/
 */
let zoomIn0LatMap = [
    {
        "zoom": 0,
        "meters": 78271.484
    },
    {
        "zoom": 1,
        "meters": 39135.742
    },
    {
        "zoom": 2,
        "meters": 19567.871
    },
    {
        "zoom": 3,
        "meters": 9783.9355
    },
    {
        "zoom": 4,
        "meters": 4891.96775
    },
    {
        "zoom": 5,
        "meters": 2445.983875
    },
    {
        "zoom": 6,
        "meters": 1222.9919375
    },
    {
        "zoom": 7,
        "meters": 611.49596875
    },
    {
        "zoom": 8,
        "meters": 305.747984375
    },
    {
        "zoom": 9,
        "meters": 152.8739921875
    },
    {
        "zoom": 10,
        "meters": 76.43699609375
    },
    {
        "zoom": 11,
        "meters": 38.218498046875
    },
    {
        "zoom": 12,
        "meters": 19.1092490234375
    },
    {
        "zoom": 13,
        "meters": 9.55462451171875
    },
    {
        "zoom": 14,
        "meters": 4.777312255859375
    },
    {
        "zoom": 15,
        "meters": 2.3886561279296874
    },
    {
        "zoom": 16,
        "meters": 1.1943280639648437
    },
    {
        "zoom": 17,
        "meters": 0.5971640319824219
    },
    {
        "zoom": 18,
        "meters": 0.2985820159912109
    },
    {
        "zoom": 19,
        "meters": 0.14929100799560546
    },
    {
        "zoom": 20,
        "meters": 0.07464550399780273
    },
    {
        "zoom": 21,
        "meters": 0.037322751998901366
    },
    {
        "zoom": 22,
        "meters": 0.018661375999450683
    }
];

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
        "meters": 4096
    },
    {
        "zoom": 3,
        "meters": 2048
    },
    {
        "zoom": 4,
        "meters": 1024
    },
    {
        "zoom": 5,
        "meters": 512
    },
    {
        "zoom": 6,
        "meters": 256
    },
    {
        "zoom": 7,
        "meters": 128
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
    const maxMeter = zoomIn40LatMap[0].meters;
    breaks.forEach(({index, meters, zoom}, i) => {
        const cur = index;
        const prev = Math.max(cur - 1, 0);
        if (prev !== cur) {
            const min = zoomIn40LatMap[prev].meters;
            const max = zoomIn40LatMap[cur].meters;

            const _zoom = toNumberFixed(Math.log2(maxMeter /meters), 2);

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
