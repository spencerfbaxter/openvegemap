if (typeof window !== 'object') {
    throw new Error('qunit must be used in a browser.');
}

import 'qunit/qunit/qunit.css';

/** @var {Function} qunit.start*/
/** @var {Function} qunit.test*/
/** @var {Function} qunit.module*/
import qunit from 'qunit';
import layers from '../js/layers.js';
import openingHours from '../js/openingHours.js';
import Popup from '../js/popup.js';
import POI from '../js/poi.js';

qunit.start();

qunit.test('layers', function (assert) {
    'use strict';
    assert.ok(Array.isArray(layers.getCurFilter()), 'getCurFilter');
    assert.equal(undefined, layers.createLayers(null), 'createLayers');
    assert.equal(undefined, layers.applyFilters(), 'applyFilters');
});

qunit.test('openingHours', function (assert) {
    'use strict';
    assert.equal('<tr><th>Sunday</th><td>Closed</td></tr><tr><th>Monday</th><td>08:30-20:00</td></tr><tr><th>Tuesday</th><td>08:30-20:00</td></tr><tr><th>Wednesday</th><td>08:30-20:00</td></tr><tr><th>Thursday</th><td>08:30-20:00</td></tr><tr><th>Friday</th><td>08:30-20:00</td></tr><tr><th>Saturday</th><td>Closed</td></tr>', openingHours.getOpeningHoursTable('Mo-Fr 08:30-20:00'), 'getOpeningHoursTable');
});

qunit.module('POI', function () {
    qunit.test('POI vegan cafe', function (assert) {
        'use strict';
        const poi = new POI({'diet:vegan': 'yes', amenity: 'cafe'});

        assert.equal('green', poi.getColor(), 'getColor');
        assert.equal('circle', poi.getMarkerIcon(), 'getMarkerIcon');
        assert.equal('vegan', poi.getLayer(), 'getLayer');
        assert.equal('🍵', poi.getIcon(), 'getIcon');
        assert.notOk(poi.isShop(), 'isShop');
    });

    qunit.test('POI foo shop', function (assert) {
        'use strict';
        const poi = new POI({'diet:vegan': 'foo', shop: 'bar'});

        assert.equal('gray', poi.getColor(), 'getColor');
        assert.equal('question', poi.getMarkerIcon(), 'getMarkerIcon');
        assert.equal('other', poi.getLayer(), 'getLayer');
        assert.equal('🛒', poi.getIcon(), 'getIcon');
        assert.ok(poi.isShop(), 'isShop');
    });
});

qunit.module('Popup', function () {
    qunit.test('Popup', function (assert) {
        'use strict';
        const popup = new Popup({'diet:vegan': 'foo'});

        assert.equal('<ons-list-item modifier="nodivider"><div class="left list-item__title"><a target="_blank" href="https://wiki.openstreetmap.org/wiki/Key%3Adiet:vegan">Vegan</a></div> <div class="right list-item__subtitle">foo</div></ons-list-item>', popup.getPopupRows(), 'getPopupRows');
    });

    qunit.test('Popup website', function (assert) {
        'use strict';
        const popup = new Popup({
            'diet:vegan': 'foo',
            'website': 'https://www.example.com/bar',
            'contact:website': 'http://foo.com/'
        });

        assert.equal('<ons-list-item modifier="nodivider"><div class="left list-item__title"><a target="_blank" href="https://wiki.openstreetmap.org/wiki/Key%3Adiet:vegan">Vegan</a></div> <div class="right list-item__subtitle">foo</div></ons-list-item><ons-list-item modifier="nodivider"><div class="left list-item__title">Website</div> <div class="right list-item__subtitle"><a target=" blank" rel="noopener" href="https://www.example.com/bar">example.com</a></div></ons-list-item>', popup.getPopupRows(), 'getPopupRows');
    });

    qunit.test('Popup UK website', function (assert) {
        'use strict';
        const popup = new Popup({'diet:vegan': 'foo', 'contact:website': 'http://www.example.co.uk/baz'});

        assert.equal('<ons-list-item modifier="nodivider"><div class="left list-item__title"><a target="_blank" href="https://wiki.openstreetmap.org/wiki/Key%3Adiet:vegan">Vegan</a></div> <div class="right list-item__subtitle">foo</div></ons-list-item><ons-list-item modifier="nodivider"><div class="left list-item__title">Website</div> <div class="right list-item__subtitle"><a target=" blank" rel="noopener" href="http://www.example.co.uk/baz">example.co.uk</a></div></ons-list-item>', popup.getPopupRows(), 'getPopupRows');
    });
});
