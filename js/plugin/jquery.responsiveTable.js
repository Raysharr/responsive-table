// Object.create shim
(function ($) {
    if (typeof Object.create !== 'function') {
        Object.create = function (obj) {
            function F(){}
            F.prototype = obj;
            return new F();
        };
    }
})(jQuery);

(function ($, d, w) {

    var ResponsiveTable = {
        init: function (options, el) {
            // Cached pointer to ResponsiveTable object
            var base = this;

            base.$el = $(el); // jQuery object cached
            base.el = el; // Pure js object cached
            console.log(base.$el);

            // Merge scrollbar internal and external options
            base.options = $.extend({}, $.fn.responsiveTable.options, options);

            // Prepare instance variables
            base.cache();

            // Register events
            base.bindEvents();

            // Set visible rows to tableVisibleRowsCnt variable value
            if ( base.options.tableVisibleRowsCnt !== 'auto' && typeof base.options.tableVisibleRowsCnt === 'number' ) {
                base.setVisibleRows();                
            }

            // Check columns visibility state
            base.resizeHandler(base);

            // Debug mode check
            if (base.options.debug === true) console.log('init function loaded assets');
        },

        bindEvents: function () {
            // Cached pointer to ResponsiveTable object
            var base = this;

            // Register window resize event
            $(w).on('resize', function (e) {
                base.resizeHandler(base);
            });

            // Register click event to expand responsive table row
            base.$el.on('click', 'tr', function (e) {
                base.clickHandler(e);

                e.preventDefault();
            });

            // Debug mode check
            if (base.options.debug === true) console.log('responsiveTable bindEvents method fired');

        },

        cache: function () {
            // Cached pointer to ResponsiveTable object
            var base = this;

            base.$tableThead = base.$el.find('thead');
            base.$tableTbody = base.$el.find('tbody');
            base.$tableTheadThs = base.$tableThead.find('tr').first().children('th') || base.$tableThead.find('tr').first().children('td');
            base.$tableTbodyTrs = base.$tableTbody.find('tr');

            base.tableColsCount = base.$tableTbody.find('tr:first').children('td').length;
            base.tableRowsCount = base.$tableTbody.find('tr').length;
            base.addResContentSemaphore = true;
            base.notFoldingCells = base.$tableThead.find('th.not-fold');

            // Debug mode check
            if (base.options.debug === true) console.log('responsiveTable cache method fired');
        },

        clickHandler: function (e) {
            $(e.currentTarget).next('.row-detail-wrapper').toggleClass('hide-responsive-row');
            $.publish('paneHeightIncreased/customScrollbar');
        },

        resizeHandler: function (base) {
            var windowW = $(w).width();

            if (windowW <= base.options.tableBreakPoint) {
                if (!base.$el.hasClass('responsive-table-cols-fold')) {
                    base.foldTableColumns(base);
                }
            } else {
                if (!base.$el.hasClass('responsive-table-cols-expand')) {
                    base.expandTableColumns(base);
                }
            }
        },

        foldTableColumns: function (base) {
            base.$el.addClass('responsive-table-cols-fold');
            base.$el.removeClass('responsive-table-cols-expand');

            base.$el.find('.row-detail-wrapper').addClass('hide-responsive-row');

            // Get html to play with
            var html = base.buildRowDetailsHtml(base);

            // Fold columns that are not at .not-fold elements index
            base.foldColumns(base);

            // Check if responsive html is ready. If not add it to DOM
            if (base.addResContentSemaphore === true) {
                base.addResponsiveContent(base, html);
            }
        },

        expandTableColumns: function (base) {
            base.$el.addClass('responsive-table-cols-expand');
            base.$el.removeClass('responsive-table-cols-fold');

            base.$tableThead.find('th:not(.not-fold)').removeClass('hide-cell');
            base.$tableThead.find('th').removeClass('first-column last-column');
            base.$tableTbody.find('td').removeClass('hide-cell first-column last-column');
            base.$el.find('.row-detail-wrapper').addClass('hide-responsive-row');
        },

        getNotFoldingColumnsIndex: function (base) {
            var arr = [];

            $.each(base.notFoldingCells, function (index, elem) {
                arr.push($(elem).index());
            });

            return arr;
        },

        addClassToColumns: function (base, columnsArray) {
            var columnsArrayLen = columnsArray.length;

            $.each(columnsArray, function (index, elem) {
                if (index === 0) {
                    $(elem).addClass('first-column');
                } else if (index === columnsArrayLen - 1) {
                    $(elem).addClass('last-column');
                }
            });
        },

        foldColumns: function (base) {
            var arr = base.getNotFoldingColumnsIndex(base),
                trs = base.$tableTbodyTrs,
                tableCells,
                visCell,
                visCells = [];
                ths = [];
            
            base.$tableThead.find('th:not(.not-fold)').addClass('hide-cell');

            $.each(trs, function (index, elements) {
                tableCells = $.makeArray($(this).find('td'));
                visCells = [];

                // Prepare not folding th's
                for (var i = arr.length - 1; i >= 0; i--) {
                    visCell = tableCells.splice(arr[i], 1);
                    visCells.push(visCell);
                };

                // Keep columns in right order
                visCells.reverse();
                // Map over visCells array to get siple Array of DOM nodes
                visCells = $.map(visCells, function (elem, index) {
                    return visCells[index][0]
                });
                // Add class to first tbody column and last tbody column from all columns that stay visible 
                base.addClassToColumns(base, visCells);

                $.each(tableCells, function () {
                    $(this).addClass('hide-cell');
                });
            });

            // Add class to first thead column and last thead column from all columns that stay visible 
            ths = $.makeArray(base.$tableThead.find('.not-fold'));
            base.addClassToColumns(base, ths);
        },

        buildRowDetailsHtml: function (base) {
            var tr = $('<tr></tr>', { 'class' : 'row-detail-wrapper' }),
                td = $('<td></td>', { 'colspan' : base.tableColsCount }),
                ul = $('<ul></ul>', { 'class' : 'row-detail-content' }),
                li = $('<li></li>', { 'class' : 'row-detail-content-el' }),
                strong = $('<strong></strong>', { 'class' : 'cell-header' }),
                span = $('<span></span>', { 'class' : 'cell-content' });

            // Element to have table data after will be appended
            li.append(strong, span);

            // Build all row wrapper
            td.append(ul);
            tr.append(td);

            return [tr, li];
        },

        addResponsiveContent: function (base, html) {
            var arr = base.getNotFoldingColumnsIndex(base),
                lis = [],
                ths = $.makeArray(base.$tableTheadThs),
                li = html[1],
                tr = html[0];

            // Prepare not folding th's
            for (var i = arr.length - 1; i >= 0; i--) {
                ths.splice(arr[i], 1);
            };

            // Iterate over all tr's in tbody tag and add html
            $.each(base.$tableTbodyTrs, function (index, elem) {
                var tds = $.makeArray($(this).find('td')),
                    tableRow = tr.clone();

                // Remove items from array which has .not-fold class
                for (var i = arr.length - 1; i >= 0; i--) {
                    tds.splice(arr[i], 1);
                };

                // Build html
                $.each(tds, function (index, elem) {
                    li = li.clone();

                    li.find('.cell-header').html($(ths[index]).html());
                    li.find('.cell-content').html($(tds[index]).html());

                    tableRow.addClass('hide-responsive-row').find('ul').append(li);
                });

                $(elem).after(tableRow);
            });

            base.addResContentSemaphore = false;
        },

        setVisibleRows: function () {
            var base = this,
                thH = base.$tableThead.children().first().outerHeight(),
                tdH = base.$tableTbody.children().first().outerHeight(),
                height = 0,
                padtb = 0;

            if (base.getRowsCnt(base.$tableThead, base.$tableTbody) > base.options.tableVisibleRowsCnt) {
                var trs = base.$el.find('tr'),
                    i = 0,
                    height = 0;

                for (i = base.options.tableVisibleRowsCnt; i > 0; i--) {
                    height += $(trs[i]).outerHeight();
                };

                // Prevent show border-bottom in last tr in set (better look);
                height = height - 1;
                padtb = base.$el.parents(base.options.viewportClass).outerHeight() - base.$el.parents(base.options.viewportClass).height();

                base.$el.parents(base.options.viewportClass).css({ 'height' : height + padtb - 1 });
            }
        },

        isMobile: function () {
            return !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
        },

        getClassName: function (classString) {
            return classString.split('.').join('');
        },

        setElHeight: function (el, height) {
            el.css({ 'height' : height });
        },

        getRowsCnt: function () {
            var len = arguments.length,
                allTrLen = 0;

            for (var i = len - 1; i >= 0; i--) {
                allTrLen += arguments[i].find('tr').length;
            };

            return allTrLen;
        }

    };

    $.fn.responsiveTable = function (options) {
        this.each(function () {
            var responsiveTable = Object.create(ResponsiveTable);
            responsiveTable.init(options, this);
        });
    };

    $.fn.responsiveTable.options = {
        viewportClass: '.content',
        tableVisibleRowsCnt: 'auto',
        tableBreakPoint: 768
    };

})(jQuery, document, window);