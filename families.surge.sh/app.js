+ function() {
    var form = document.querySelector('form');
    var input = document.querySelector('.keyword');
    var url = 'http://66.112.216.217/families?q=';
    var table = document.querySelector('#list');
    var store = [],
        offset,
        throttle,
        poll;

    var _inView = function(el) {
        var coords = el.getBoundingClientRect();
        return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
    };

    var _pollImages = function() {
        for (var i = store.length; i--;) {
            var self = store[i];
            if (_inView(self)) {
                self.src = self.getAttribute('data-src');
                store.splice(i, 1);
            }
        }
    };

    var _throttle = function() {
        clearTimeout(poll);
        poll = setTimeout(_pollImages, throttle);
    };

    var init = function(obj) {
        var nodes = document.querySelectorAll('[data-src]');
        var opts = obj || {};
        offset = opts.offset || 0;
        throttle = opts.throttle || 250;

        for (var i = 0; i < nodes.length; i++) {
            store.push(nodes[i]);
        }

        _throttle();

        if (document.addEventListener) {
            window.addEventListener('scroll', _throttle, false);
        } else {
            window.attachEvent('onscroll', _throttle);
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        var loading = document.querySelector('.loading');
        form.addEventListener('submit', function(e) {
            loading.classList.remove('hidden');
            e.preventDefault();
            axios.get(url + encodeURIComponent(input.value)).then(function(res) {
                console.log(res);
                loading.classList.add('hidden');
                render(table, res.data);
                init({
                    offset: 50
                });
            });
        });
    });


    function render(table, data) {
        var mobileTpl = document.querySelector('#tpl').innerHTML;
        table.innerHTML = '';
        var header = document.createElement('tr');
        header.classList.add('collapse');
        header.innerHTML = '<th>商品主图</th> <th class="title-col">名称</th> <th>价格（元）</th> <th>优惠券</th> <th>优惠券结束时间</th> <th>领券购买</th>';
        table.appendChild(header);
        var frag = document.createDocumentFragment();
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var tr = document.createElement('tr');
            var mobileCol = mobileTpl.replace(/\{title\}/g, item.title)
                .replace(/\{price\}/g, item.price)
                .replace(/\{discount\}/g, item.discount)
                .replace(/\{expires\}/g, item.expires)
                .replace(/\{url\}/g, item.url);
            var tpl = '<td class="pic"><a target="_blank" href="{url}"><img data-src="{pic}" /></a></td>' + mobileCol + '<td class="collapse">{title}</td> <td class="collapse">{price}</td> <td class="collapse">{discount}</td> <td class="collapse">{expires}</td> <td class="collapse"><a target="_blank" href="{url}">领券购买</a></td>';
            tr.innerHTML = tpl.replace('{pic}', item.pic)
                .replace(/\{title\}/g, item.title)
                .replace(/\{price\}/g, item.price)
                .replace(/\{discount\}/g, item.discount)
                .replace(/\{expires\}/g, item.expires)
                .replace(/\{url\}/g, item.url);
            frag.appendChild(tr);
        }
        table.appendChild(frag);
    }
}();