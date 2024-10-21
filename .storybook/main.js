/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	staticDirs: ["../public"],
	core: {
		builder: "@storybook/builder-vite", // 👈 The builder enabled here.
	},
};
export default config;
