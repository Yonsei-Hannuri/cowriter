import NetworkGraph from './networkGraph';

const meta = {
  title: 'Network Graph',
  component: NetworkGraph,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

export const Basic = {
  args: {
    nodes: [
      {
        id: 1,
        name: 'A',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 2,
        name: 'B',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 3,
        name: 'C',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 4,
        name: 'D',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 5,
        name: '역지사지',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 6,
        name: 'F',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 7,
        name: 'G',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 8,
        name: 'H',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 9,
        name: 'I',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 10,
        name: '전문가교육',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
    ],
    edges: [
      {
        source: 1,
        target: 2,
      },
      {
        source: 1,
        target: 5,
      },
      {
        source: 1,
        target: 6,
      },

      {
        source: 2,
        target: 3,
      },
      {
        source: 2,
        target: 7,
      },
      {
        source: 3,
        target: 4,
      },
      {
        source: 8,
        target: 3,
      },
      {
        source: 4,
        target: 5,
      },
      {
        source: 4,
        target: 9,
      },
      {
        source: 5,
        target: 10,
      },
    ],
    width: 500,
    height: 500,
    margin: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
    dragstarted: (elem, event, d) => {
      elem.raise().attr('stroke', 'black');
    },
    dragged: (elem, event, d) => {
      d.x = event.x;
      d.y = event.y;
    },
    dragended: (elem, event, d) => {
      elem.attr('stroke', null);
    },
  },
};

export const ADD_MODE = {
  args: {
    nodes: [
      {
        id: 1,
        name: 'A',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 2,
        name: 'B',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 3,
        name: 'C',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 4,
        name: 'D',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 5,
        name: '역지사지',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 6,
        name: 'F',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 7,
        name: 'G',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 8,
        name: 'H',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 9,
        name: 'I',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
      {
        id: 10,
        name: '전문가교육',
        x: Math.random() * 600,
        y: Math.random() * 600,
      },
    ],
    edges: [
      {
        source: 1,
        target: 2,
      },
      {
        source: 1,
        target: 5,
      },
      {
        source: 1,
        target: 6,
      },

      {
        source: 2,
        target: 3,
      },
      {
        source: 2,
        target: 7,
      },
      {
        source: 3,
        target: 4,
      },
      {
        source: 8,
        target: 3,
      },
      {
        source: 4,
        target: 5,
      },
      {
        source: 4,
        target: 9,
      },
      {
        source: 5,
        target: 10,
      },
    ],
    width: 500,
    height: 500,
    margin: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
    dragstarted: (elem, event, d) => {
      elem.raise().attr('stroke', 'black');
    },
    dragged: (elem, event, d) => {
      d.x = event.x;
      d.y = event.y;
    },
    dragended: (elem, event, d) => {
      elem.attr('stroke', null);
    },
    onNodeClick: (nodeId) => {
      console.log(nodeId);
    },
  },
};
