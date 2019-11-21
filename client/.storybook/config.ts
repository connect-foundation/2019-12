import { configure, addParameters, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { themes } from '@storybook/theming';
import { withInfo } from '@storybook/addon-info';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';

import themeDecorator from './theme-decorator';
import routerDecorator from './router-decorator';
import * as beautifyStory from './BeautifyStory';

addDecorator(withKnobs);
addDecorator(withInfo);
addDecorator(withA11y);
addDecorator(themeDecorator);
addDecorator(routerDecorator);
addDecorator(beautifyStory.prettyWrapperDecorator);
addParameters({
  options: {
    theme: themes.light,
    panelPosition: 'bottom',
    sidebarAnimations: true,
    showPanel: true,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: '|',
  },
  info: {
    styles: {
      infoBody: beautifyStory.infoBody,
      infoStory: beautifyStory.infoStory,
    },
    inline: true,
    header: true,
  },

  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'someDefault',
  },
});

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
