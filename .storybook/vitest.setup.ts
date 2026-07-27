import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { setProjectAnnotations } from '@storybook/react-vite'
import * as projectAnnotations from './preview'

// Applies the same decorators, globals and parameters the Storybook UI uses,
// so a story under test renders exactly as it does in the browser.
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])
