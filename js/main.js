var items;

document.addEventListener('DOMContentLoaded', function() {
	items = YAML.load('data/items.yaml').items;

	sort_items("name");

	draw_table();
});

function sort_items(sort_value) {
	items.sort(function(a, b) {
		switch(sort_value) {
			case "name":
				if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
				if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
				return a.level < b.level ? -1 : 1;
			case "type":
				var type_sort = ["dualwield","onehander","twohander","bow","rod","cannon","ring","necklace","artifact"];
				if (type_sort.indexOf(a.type.toLowerCase()) < type_sort.indexOf(b.type.toLowerCase())) return -1;
				if (type_sort.indexOf(a.type.toLowerCase()) > type_sort.indexOf(b.type.toLowerCase())) return 1;
				return a.level < b.level ? -1 : 1;
			case "quality":
				var quality_sort = ["ordinary","unique","rare","very rare","elite"];
				if (quality_sort.indexOf(a.quality.toLowerCase()) < quality_sort.indexOf(b.quality.toLowerCase())) return -1;
				if (quality_sort.indexOf(a.quality.toLowerCase()) > quality_sort.indexOf(b.quality.toLowerCase())) return 1;
				return a.level < b.level ? -1 : 1;
			default:
				if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
				if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
				return a.level < b.level ? -1 : 1;
		}
	});
}

function draw_table() {
	var item_table_body = document.getElementById("items-table");
	item_table_body.innerHTML = "";
	items.forEach(function(item) {
		var table_row = document.createElement("tr");
		var row_class = "";
		switch(item.quality) {
			case "unique":
				row_class = "success";
				break;
			case "rare":
				row_class = "info";
				break;
			case "very rare":
				row_class = "warning";
				break;
			case "elite":
				row_class = "danger";
				break;
			default:
				row_class = "";
		}
		table_row.className = row_class;
		var name_el = document.createElement("td");
		var level_el = document.createElement("td");
		var type_el = document.createElement("td");
		var quality_el = document.createElement("td");
		var stats_el = document.createElement("td");
		var buy_el = document.createElement("td");
		var sell_el = document.createElement("td");
		var found_el = document.createElement("td");

		var name_node = document.createTextNode(item.name);
		var level_node = document.createTextNode(item.level);
		var type_node = document.createTextNode(item.type);
		var quality_node = document.createTextNode(item.quality);
		var buy_node = document.createTextNode(item.buy_price || "N/A");
		var sell_node = document.createTextNode(item.sell_price);
		var found_node = document.createTextNode(item.found || "TBC");

		var stats_node = document.createTextNode("");
		Object.keys(item.stats).map(function(stat_key, index) {
			stats_node.textContent += stat_key + ": " + item.stats[stat_key] + "; ";
		});

		name_el.appendChild(name_node);
		level_el.appendChild(level_node);
		type_el.appendChild(type_node);
		quality_el.appendChild(quality_node);
		stats_el.appendChild(stats_node);
		buy_el.appendChild(buy_node);
		sell_el.appendChild(sell_node);
		found_el.appendChild(found_node);

		table_row.appendChild(name_el);
		table_row.appendChild(level_el);
		table_row.appendChild(type_el);
		table_row.appendChild(quality_el);
		table_row.appendChild(stats_el);
		table_row.appendChild(buy_el);
		table_row.appendChild(sell_el);
		table_row.appendChild(found_el);

		item_table_body.appendChild(table_row);
	});
}
