/**
 * Registry items published by this repository.
 *
 * `defineRegistryItem` uses this list to tell our own components apart from
 * upstream shadcn ones: names found here get rewritten to a full
 * `${REGISTRY_URL}/r/<name>.json` URL, anything else is left alone so the
 * shadcn CLI resolves it from its own registry.
 */
export const REGISTRY_COMPONENTS = ['badge', 'button', 'card', 'input']
