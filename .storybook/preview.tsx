import type { Preview } from '@storybook/react-webpack5';
import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-addons.css';
import '@redhat-cloud-services/hcc-storybook-hub/css/storybook.css';
import { HccStorybookProvider } from '@redhat-cloud-services/hcc-storybook-hub';
import { initialize, mswLoader } from 'msw-storybook-addon';

const preview: Preview = {
  beforeAll: async () => {
    initialize({ onUnhandledRequest: 'warn' });
  },
  loaders: [mswLoader],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story, { parameters }) => (
      <HccStorybookProvider
        bundle="landing"
        app="landing"
        featureFlags={parameters.featureFlags ?? {}}
      >
        <Story />
      </HccStorybookProvider>
    ),
  ],
};

export default preview;
