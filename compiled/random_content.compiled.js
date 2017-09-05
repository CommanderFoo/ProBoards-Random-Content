"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "pd_random_content";
			this.selector = null;
			this.content = [];
			this.count = 1;
			this.wrap_div = true;
			this.used = [];

			this.setup();

			$(this.ready.bind(this));
		}
	}, {
		key: "ready",
		value: function ready() {
			if (this.selector) {
				var $container = $(this.selector);
				var picked = [];

				if ($container.length) {
					while (this.count > 0) {
						var item = this.pick_random();

						if (item) {
							picked.push(item);
						}

						this.count--;
					}
				}

				if (picked.length) {
					var html = "";

					for (var c = 0; c < picked.length; ++c) {
						html += this.wrap_div ? "<div>" : "";
						html += picked[c];
						html += this.wrap_div ? "</div>" : "";
					}

					$container.html(html);
				}
			}
		}
	}, {
		key: "pick_random",
		value: function pick_random() {
			if (this.content.length == 1) {
				return [this.content[0].content];
			}

			if (this.used.length == this.content.length) {
				return;
			}

			var index = Math.floor(Math.random() * this.content.length);

			if (this.used.indexOf(index) === -1) {
				this.used.push(index);

				return this.content[index].content;
			} else {
				return this.pick_random();
			}
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				var settings = plugin.settings;

				this.selector = settings.insert_into.length ? settings.insert_into : null;
				this.content = settings.content;
				this.count = parseInt(settings.count, 10) || 1;
				this.wrap_div = settings.wrap_div == 1 ? true : false;
			}
		}
	}]);

	return _class;
})().init();
