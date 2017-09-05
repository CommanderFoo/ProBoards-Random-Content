(class {

	static init(){
		this.PLUGIN_ID = "pd_random_content";
		this.selector = null;
		this.content = [];
		this.count = 1;
		this.wrap_div = true;
		this.used = [];

		this.setup();

		$(this.ready.bind(this));
	}

	static ready(){
		if(this.selector){
			let $container = $(this.selector);
			let picked = [];

			if($container.length){
				while(this.count > 0){
					let item = this.pick_random();

					if(item){
						picked.push(item);
					}

					this.count --;
				}
			}

			if(picked.length){
				let html = "";

				for(let c = 0; c < picked.length; ++ c){
					html += (this.wrap_div)? "<div>" : "";
					html += picked[c];
					html += (this.wrap_div)? "</div>" : "";
				}

				$container.html(html);
			}
		}
	}

	static pick_random(){
		if(this.content.length == 1){
			return [this.content[0].content];
		}

		if(this.used.length == this.content.length){
			return;
		}

		let index = Math.floor(Math.random() * this.content.length);

		if(this.used.indexOf(index) === -1){
			this.used.push(index);

			return this.content[index].content;
		} else {
			return this.pick_random();
		}
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			let settings = plugin.settings;

			this.selector = (settings.insert_into.length)? settings.insert_into : null;
			this.content = settings.content;
			this.count = parseInt(settings.count, 10) || 1;
			this.wrap_div = (settings.wrap_div == 1)? true : false;
		}
	}

}).init();

