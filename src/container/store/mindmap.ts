import { create } from "zustand";
import { Fetch } from "./common";
import { GET_ESSAY_MINDMAP, UPDATE_ESSAY_MINDMAP } from "../../api/mindmap";
import { debounce } from "../../utils/debounce";

type node = {
	id: string;
	name: string;
	x: number;
	y: number;
	invisible: boolean;
};

type NodeState = {
	nodes: node[];
};

type edge = {
	id: string;
	source: string;
	target: string;
};

type EdgeState = {
	edges: edge[];
};

type EdgeActions = {
	addEdge: (edge: { source: string; target: string }) => void;
	removeEdge: (edge: { source: string; target: string }) => void;
	removeEdgeByTarget: (target: string) => void;
};

type NodeActions = {
	addNode: (newNode: node) => void;
	removeNode: (id: string) => void;
	updateNode: (targetNode: node) => void;
};

type Mindmap = {
	essayId: number;
	init: (width: number, height: number) => void;
	resData: any;
	hasInit: boolean;
	width: number;
	height: number;
	fetched: boolean;
};

const debounceDelay = 3000;
const debounceUpdateMindmap = debounce(UPDATE_ESSAY_MINDMAP, debounceDelay);

export const useMindmap = create<
	NodeState & NodeActions & EdgeState & EdgeActions & Mindmap & Fetch
>((set) => ({
	loading: true,
	hasInit: false,
	essayId: 0,
	resData: null,
	width: 0,
	height: 0,
	fetched: false,
	fetch: async (essayId: number) => {
		const res = await GET_ESSAY_MINDMAP(essayId);
		const resEdges = res.data;
		const edges: edge[] = [];
		const nodes: node[] = [];
		const padding = 100;
		const width = useMindmap.getState().width;
		const height = useMindmap.getState().height;
		for (let e of resEdges) {
			const posX = Math.max(padding, Math.random() * width - padding);
			const posY = Math.max(padding, Math.random() * height - padding);
			if (e.keyword1nm === e.keyword2nm) {
				nodes.push({
					id: e.keyword1nm,
					name: e.keyword1nm,
					x: posX,
					y: posY,
					invisible: false,
				});
			} else {
				edges.push({
					id: `${e.keyword1nm}-${e.keyword2nm}`,
					source: e.keyword1nm,
					target: e.keyword2nm,
				});
			}
		}
		set(() => {
			return { nodes, edges, essayId, fetched: true };
		});
	},
	init: (width: number, height: number) => {
		const needInit = !useMindmap.getState().hasInit;
		if (!needInit) return;
		useMindmap.setState({ hasInit: true });
		set(() => {
			return { width, height };
		});
	},
	nodes: [],
	addNode: (newNode: node) =>
		set((state) => {
			if (newNode.name.trim() === "") return state;
			if (state.nodes.some((n) => n.id === newNode.id)) return state;
			return { nodes: [...state.nodes, newNode] };
		}),
	removeNode: (nodeId: string) =>
		set((state) => {
			return {
				edges: state.edges.filter(
					(edg) => edg.target !== nodeId && edg.source !== nodeId
				),
				nodes: state.nodes.filter((n) => n.id !== nodeId),
			};
		}),
	updateNode: (node) =>
		set((state) => {
			return {
				nodes: [...state.nodes.filter((n) => n.id !== node.id), node],
			};
		}),
	edges: [],
	addEdge: (edge: { source: string; target: string }) =>
		set((state) => {
			if (edge.source === edge.target) return state;
			const id =
				edge.source < edge.target
					? `${edge.source}-${edge.target}`
					: `${edge.target}-${edge.source}`;
			if (state.edges.some((e) => e.id === id)) return state;
			return {
				edges: [...state.edges, { ...edge, id }],
			};
		}),
	removeEdge: (edge: { source: string; target: string }) =>
		set((state) => {
			const id =
				edge.source < edge.target
					? `${edge.source}-${edge.target}`
					: `${edge.target}-${edge.source}`;
			return {
				edges: state.edges.filter((e) => e.id !== id),
			};
		}),
	removeEdgeByTarget: (target: string) =>
		set((state) => ({
			edges: state.edges.filter((edg) => edg.target !== target),
		})),
}));

const updateMindmap = function () {
	let cacheNodes = "";
	let cacheEdges = "";
	const IGNORE_NODE = "DUMMY";

	return function (newState: any, oldState: any) {
		const newNodes = newState.nodes
			.map((el: node) => el.id)
			.filter((id: string) => id !== IGNORE_NODE)
			.sort()
			.join(";");
		const newEdges = newState.edges
			.filter(
				(el: edge) => el.source !== IGNORE_NODE && el.target !== IGNORE_NODE
			)
			.map((el: edge) => el.id)
			.sort()
			.join(";");

		if (!oldState.fetched) {
			cacheNodes = newNodes;
			cacheEdges = newEdges;
		}
		if (cacheNodes === newNodes && cacheEdges === newEdges) return;
		cacheNodes = newNodes;
		cacheEdges = newEdges;
		const { nodes, edges, essayId } = newState;
		const mindmaps: { keyword1: string; keyword2: string }[] = [];
		for (let node of nodes) {
			mindmaps.push({
				keyword1: node.name,
				keyword2: node.name,
			});
		}
		for (let edge of edges) {
			mindmaps.push({
				keyword1: edge.source,
				keyword2: edge.target,
			});
		}
		debounceUpdateMindmap(essayId, mindmaps);
	};
};

useMindmap.subscribe(updateMindmap());
