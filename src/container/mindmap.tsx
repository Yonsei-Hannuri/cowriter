import { useEffect, useRef, useState } from "react";
import NetworkGraph from "../components/networkGraph/networkGraph";
import ButtonSelection from "../components/selection/buttonSelection";
import { useMindmap } from "./store/mindmap";

type UIModeType = {
	name: string;
	dragstarted?: (...a: any) => void;
	dragged?: (...a: any) => void;
	dragended?: (...a: any) => void;
	onBackgroundClick?: (...a: any) => void;
	onEdgeClick?: (...a: any) => void;
	onNodeClick?: (...a: any) => void;
};

const useMindMap = () => {
	const {
		nodes,
		addNode,
		removeNode,
		updateNode,
		edges,
		addEdge,
		removeEdge,
		removeEdgeByTarget,
		init,
	} = useMindmap();

	const DUMMY = "DUMMY";
	const ModeType: { [key: string]: UIModeType } = {
		MOVE: {
			name: "이동(M)",
			dragstarted: (elem: any, _: any, __: any) => {
				elem.raise().attr("stroke", "black");
			},
			dragged: (_: any, event: any, d: any) => {
				d.x = event.x;
				d.y = event.y;
			},
			dragended: (elem: any, _: any, d: any) => {
				elem.attr("stroke", null);
				updateNode(d);
			},
		},
		CONNECT: {
			name: "연결(C)",
			dragstarted: (_: any, event: any, d: any) => {
				const se = event.sourceEvent;
				addNode({
					id: DUMMY,
					name: "",
					x: se.offsetX,
					y: se.offsetY,
					invisible: true,
				});
				addEdge({ source: d.id, target: DUMMY });
			},
			dragged: (_: any, event: any, __: any) => {
				const se = event.sourceEvent;
				updateNode({
					id: DUMMY,
					name: "",
					x: se.offsetX,
					y: se.offsetY,
					invisible: true,
				});
			},
			dragended: (_: any, __: any, d: any) => {
				removeEdgeByTarget(DUMMY);
				let closestNode;
				let closestDist = Infinity;
				const curNodes = useMindmap.getState().nodes;
				const dummyNode = curNodes.find((n) => n.id === DUMMY)!;
				if (!dummyNode) return;
				const nodes = curNodes.filter((n) => n.id !== DUMMY);
				for (const node of nodes) {
					const dist =
						Math.abs(node.x - dummyNode.x) + Math.abs(node.y - dummyNode.y);
					if (dist < closestDist) {
						closestDist = dist;
						closestNode = node;
					}
				}
				if (closestNode && closestDist < 50) {
					addEdge({
						source: d.id,
						target: closestNode.id,
					});
				}
				removeNode(DUMMY);
			},
		},
		ADD: {
			name: "추가(A)",
			onBackgroundClick: (e: any) => {
				const word: string = prompt("단어 추가") as string;
				if (!word) return;
				addNode({
					id: word.trim(),
					name: word.trim(),
					x: e.offsetX as number,
					y: e.offsetY as number,
					invisible: false,
				});
			},
		},
		DELETE: {
			name: "삭제(D)",
			onEdgeClick: (edge: any) => {
				if (!window.confirm("이 연결을 지우겠습니까?")) return;
				removeEdge(edge);
			},
			onNodeClick: (nodeId: string) => {
				if (!window.confirm(`'${nodeId}' 단어를 지우겠습니까?`)) return;
				removeNode(nodeId);
			},
		},
	};
	const [mode, setMode] = useState(ModeType.MOVE);
	return {
		nodes,
		edges,
		ModeType,
		mode,
		setMode,
		init,
	};
};

export default function MindMap({}) {
	const { nodes, edges, ModeType, mode, setMode, init } = useMindMap();
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const $elem = ref.current!;
		const { width, height } = $elem.getBoundingClientRect();
		init(width, height);
		const onKeyDownModeChange = (e: any) => {
			const { code } = e;
			switch (code) {
				case "KeyA":
					setMode(ModeType.ADD);
					break;
				case "KeyM":
					setMode(ModeType.MOVE);
					break;
				case "KeyC":
					setMode(ModeType.CONNECT);
					break;
				case "KeyD":
					setMode(ModeType.DELETE);
					break;
				default:
					break;
			}
		};
		window.addEventListener("keydown", onKeyDownModeChange);
		return () => {
			window.removeEventListener("keydown", onKeyDownModeChange);
		};
	}, []);
	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<ButtonSelection
				options={[
					ModeType.ADD.name,
					ModeType.MOVE.name,
					ModeType.CONNECT.name,
					ModeType.DELETE.name,
				]}
				selected={[mode.name]}
				onClickOption={(option: any) => {
					const mode: any = Object.values(ModeType).find(
						(e) => e.name === option
					);
					setMode(mode);
				}}
			/>
			<div ref={ref} style={{ flexGrow: 1 }}>
				<NetworkGraph
					nodes={nodes}
					edges={edges}
					onBackgroundClick={mode.onBackgroundClick}
					dragstarted={mode.dragstarted}
					dragged={mode.dragged}
					dragended={mode.dragended}
					onLinkClick={mode.onEdgeClick}
					onNodeClick={mode.onNodeClick}
				/>
			</div>
		</div>
	);
}
