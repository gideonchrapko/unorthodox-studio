import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import blockContent from './blockContent';
import landingPage from './landingPage';
import visualProject from './visualProject';
import FashionProject from './FashionProject';
import uxProject from './UXProject';
import soundProject from './SoundProject';
import about from './about'

import VisualClients from './VisualClients';
import FashionClients from './FashionClients';
import SoundClients from './SoundClients';
import UXClients from './UXClients';

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    landingPage,
    blockContent,
    visualProject,
    FashionProject,
    uxProject,
    soundProject,
    VisualClients,
    FashionClients,
    UXClients,
    SoundClients,
    about,
  ]),
})
