document.addEventListener('DOMContentLoaded', function() {
	var items = YAML.load('data/items.yaml').items;
	// items.sort(function(a, b) {
	// 	return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
	// });
	sort_items(items,"name");
	var item_table_body = document.getElementById("items-table");
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
				row_class = "elite";
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
});

function sort_items(items, sort_value) {
	items.sort(function(a, b) {
		switch(sort_value) {
			case "name":
				return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
			case "level":
				return a.level < b.level ? -1 : 1;
			case "type":
				return a.type.toUpperCase() < b.type.toUpperCase() ? -1 : 1;
			case "quality":
				sort_order = ["ordinary","unique","rare","very rare","elite"];
				return sort_order.indexOf(a.quality.toLowerCase()) < sort_order.indexOf(b.quality.toLowerCase()) ? -1 : 1;
			default:
				return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
		}
	});
}
