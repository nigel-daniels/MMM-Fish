/* Magic Mirror Module: MMM-Fish
 * Version: 1.0.0
 *
 * By Nigel Daniels https://github.com/nigel-daniels/
 * MIT Licensed.
 */

Module.register('MMM-Fish', {


    defaults: {
        fish: [
            {'id': 'anchovy', 'englishName': 'Anchovy', 'germanName': 'Sardelle'},
            {'id': 'cod', 'englishName': 'Cod', 'germanName': 'Kabeljau'},
            {'id': 'dogfish', 'englishName': 'Dogfish', 'germanName': 'Hundshai'},
            {'id': 'eel', 'englishName': 'Eel', 'germanName': 'Aal'},
            {'id': 'haddock', 'englishName': 'Haddock', 'germanName': 'Schellfisch'},
            {'id': 'halibut', 'englishName': 'Halibut', 'germanName': 'Heilbutt'},
            {'id': 'herring', 'englishName': 'Herring', 'germanName': 'Hering'},
            {'id': 'mackerel', 'englishName': 'Mackerel', 'germanName': 'Makrele'},
            {'id': 'monkfish', 'englishName': 'Monkfish', 'germanName': 'Seeteufel'},
            {'id': 'mullet', 'englishName': 'Mullet', 'germanName': 'Meeräsche'},
            {'id': 'plaice', 'englishName': 'Plaice', 'germanName': 'Scholle'},
            {'id': 'red_snapper', 'englishName': 'Red Snapper', 'germanName': 'Rotbarsch'},
            {'id': 'salmon', 'englishName': 'Salmon', 'germanName': 'Lachs'},
            {'id': 'sardine', 'englishName': 'Sardine', 'germanName': 'Sardine'},
            {'id': 'sea_bass', 'englishName': 'Sea Bass', 'germanName': 'Wolfsbarsch'},
            {'id': 'sea_bream', 'englishName': 'Sea Bream', 'germanName': 'Meerbrasse'},
            {'id': 'skate', 'englishName': 'Skate', 'germanName': 'Rochen'},
            {'id': 'sole', 'englishName': 'Sole', 'germanName': 'Seezunge'},
            {'id': 'swordfish', 'englishName': 'Swordfish', 'germanName': 'Schwertfisch'},
            {'id': 'trout', 'englishName': 'Trout', 'germanName': 'Forelle'},
            {'id': 'tuna', 'englishName': 'Tuna', 'germanName': 'Thunfisch'},
            {'id': 'turbot', 'englishName': 'Turbot', 'germanName': 'Steinbutt'}
        ],
        interval:   3600000, // Every 60 mins
        language: 'english'
        },


        // Define required scripts.
    	getScripts: function() {
    		return ["moment.js"];
    	},

        getStyles: function() {
            return ['fish.css', 'font-awesome.css'];
            },

    	// Define start sequence.
    	start: function() {
    		Log.info("Starting module: " + this.name);

    		this.lastFish = -1;

            var date = new Date;
            this.day = date.getDay();

    		// Schedule update timer.
    		var that = this;
    		setInterval(function() {that.fishOfTheDay();}, this.config.interval);
    	},


    	randomFish: function() {
            var that = this;

    		var generate = function() {
    			return Math.floor(Math.random() * that.config.fish.length);
    		};

    		var fishIndex = generate();

    		while (fishIndex === this.lastFish) {
    			fishIndex = generate();
    		}

    		this.lastFish = fishIndex;

    		return this.config.fish[fishIndex];
    	},


    	fishOfTheDay: function(that) {
            var date = new Date;
            var day = date.getDay();

            console.log('day: ' + day + ', this.day:' + this.day);
            if (day !== this.day) {
                this.day = day;
                this.updateDom(4000);
            }
    	},

    	// Override dom generator.
    	getDom: function() {

    		var fish = this.randomFish();

    		var id = fish.id;
            var fishName = fish.englishName;
            if (this.config.language === 'german') {
                fishName = fish.germanName;
            }

    		var wrapper = document.createElement('div');
    		wrapper.className = "bright fishTank";

			var fishDiv = document.createElement('div');
			fishDiv.className = "fish";

            var image = document.createElement('img');
            image.className = 'fishPic';
            image.src = './modules/MMM-Fish/images/' + id + '.png';

            var name = document.createElement('span');
            name.className = 'fishName';
            name.innerHTML = fishName;

            fishDiv.appendChild(image);
    		fishDiv.appendChild(name);

			wrapper.appendChild(fishDiv);

    		return wrapper;
    	}
    });
