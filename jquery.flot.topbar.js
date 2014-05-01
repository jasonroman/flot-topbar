/**
 * Flot plugin for specifying bar chart series that should only display the
 * top line of the bar and not fill in the area below; disabled by default
 * 
 * Note: This likely does not make sense to use in combination with stacking bar data
 * 
 * The plugin supports setting all bars or no bars to a topbar (default false):
 * 
 *  series: {
 *      bars: {
 *          topbar: boolean
 *      }
 *  }
 * 
 * The topbar can also be turned on or off for a specific series:
 * 
 *  $.plot($("#placeholder"), [{
 *      data: [ ... ],
 *      bars: { topbar: boolean }
 *  }])
 * 
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * (c) Jason Roman <j@jayroman.com>
 */
(function($)
{
    "use strict";

    // default each series to have the top bar feature turned off
    var options = {
        series: {
            bars: {
                topbar: false
            }
        }
    };

    /**
     * Converts a bar to just display the top line if the option is enabled
     * 
     * @param {function} plot - the Flot plot function
     * @param {Object} series
     * @param {Object} datapoints 
     */
    function topbarSeries(plot, series, datapoints)
    {
        var i, offset;

        // make sure this is a bar chart with the topbar option enabled
        if (!(series.bars.show && series.bars.topbar)) {
            return;
        }

        // determine whether to match the bottom of the bar to the x or y value
        offset = (series.bars.horizontal) ? 2 : 1;

        // datapoints format is (x, y, b), and b must be equal to x or y depending on chart orientation
        // so that the bar appears as a single line at the top (b is typically 0, or the axis beginning)
        for (i = 2; i < datapoints.points.length; i += 3) {
            datapoints.points[i] = datapoints.points[i - offset];
        }
    }

    /**
     * Initialize the hook on processing the data points
     * 
     * @param {function} plot - the Flot plot function
     */
    function init(plot)
    {
        plot.hooks.processDatapoints.push(topbarSeries);
    }

    // push as an available plugin to Flot
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'topbar',
        version: '1.0'
    });

})(jQuery);
