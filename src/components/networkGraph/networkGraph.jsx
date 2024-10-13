import { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function NetworkGraph({
	nodes,
	edges,
	dragstarted,
	dragged,
	dragended,
	onBackgroundClick,
	onLinkClick,
	onNodeClick,
}) {
	const ref = useRef();

	useEffect(() => {
		const currentElement = ref.current;
		const handler = (e) => {
			const rect = currentElement.getBoundingClientRect();
			if (onBackgroundClick) onBackgroundClick(e);
		};
		currentElement.addEventListener("click", handler);
		return () => {
			currentElement.removeEventListener("click", handler);
		};
	}, [onBackgroundClick]);

	useEffect(() => {
		const currentElement = ref.current;
		const svg = d3
			.select(currentElement)
			.call((g) => g.select("svg").remove())
			.append("svg")
			.attr("id", "svg_element")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("style", "background-color: #F6F8FB; border-radius: 10px");
		const links = [];
		for (let edge of edges) {
			links.push({
				source: nodes.filter((e) => e.id === edge.source)[0],
				target: nodes.filter((e) => e.id === edge.target)[0],
			});
		}

		const linkPadding = svg
			.selectAll(".clickable-link")
			.data(links)
			.enter()
			.append("line")
			.attr("class", "clickable-link")
			.style("cursor", onLinkClick ? "pointer" : "")
			.attr("fill", "none")
			.attr("stroke", "transparent") // Make it transparent
			.attr("stroke-width", 20) // Thicker line for click area
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y)
			.on("click", (e) => {
				e.stopPropagation();
				const edges = e.target.__data__;
				if (onLinkClick)
					onLinkClick({ source: edges.source.id, target: edges.target.id });
			});

		const link = svg
			.selectAll(".normal-link")
			.data(links)
			.enter()
			.append("line")
			.attr("class", "normal-link")
			.style("stroke", "#aaa")
			.attr("stroke-width", 2)
			.attr("x1", (d) => d.source.x)
			.attr("y1", (d) => d.source.y)
			.attr("x2", (d) => d.target.x)
			.attr("y2", (d) => d.target.y);

		const node = svg
			.selectAll("g")
			.data(nodes)
			.enter()
			.append("g")
			.attr("id", (d) => d.id)
			.attr("transform", (d) => `translate(${d.x}, ${d.y})`)
			.style("cursor", onNodeClick ? "pointer" : "")
			.on("click", (e) => {
				e.preventDefault();
				const node = e.target.__data__;
				if (onNodeClick) onNodeClick(node.id);
			})
			.call(
				d3
					.drag()
					.on("start", function (event, d) {
						if (dragstarted) dragstarted(d3.select(this), event, d);
					})
					.on("drag", function (event, d) {
						if (!dragged) return;
						dragged(d3.select(this), event, d);
						updateNodes();
						updateLinks();
					})
					.on("end", function (event, d) {
						if (!dragended) return;
						dragended(d3.select(this), event, d);
					})
			);

		node
			.append("ellipse")
			.attr("rx", (n) => (n.invisible ? 0 : 50))
			.attr("ry", (n) => (n.invisible ? 0 : 30))
			.attr("stroke", "black")
			.attr("fill", "white");

		node
			.append("text")
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "middle")
			.text(function (d) {
				return d.name;
			});

		function updateNodes() {
			node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
		}

		function updateLinks() {
			link
				.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y);
			linkPadding
				.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y);
		}
	});

	return <span ref={ref} />;
}
