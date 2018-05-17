import * as React from 'react';
import {configure, addDecorator} from '@storybook/react';
// import {setOptions} from '@storybook/addon-options';

// setOptions({
//     name: `Loom UI (${process.env.VERSION})`,
//     url: 'https://github.comcast.com/console/loom-ui',
//     goFullScreen: false,
//     showStoriesPanel: true,
//     showAddonPanel: true,
//     showSearchBox: false,
//     addonPanelInRight: true,
//     sortStoriesByKind: false
// });

function loadStories() {
    require('../stories/index.tsx');
    // You can require as many stories as you need.
}

configure(loadStories, module);
