flot-topbar
======

Simple [Flot](http://www.flotcharts.org) plugin for specifying bar chart series that display just the top line of the bar and not fill in the area below.  This could be used, for example, to display two series overlayed on each other rather than stacked or side-by-side.  As such, This likely makes no sense to use in combination with other stacking plugins.

Even when including the plugin on your page, it is turned off by default.  You may either turn it on for all series at once or for specific series.

To turn on the plugin for all series:

    series: {
        bars: {
            topbar: true
        }
    }

More often you will want to turn the plugin on or off for a specific series:

    $.plot($("#placeholder"), [{
        data: [ ... ],
        bars: { topbar: true, ... }
    }])


