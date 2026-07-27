import 'dotenv/config'
import {
  registryItemFileSchema,
  registryItemSchema,
  registrySchema,
  type Registry,
  type RegistryItem,
  type RegistryItemFile,
} from './types'
import { REGISTRY_COMPONENTS } from './shared/components'

/** Validate and stamp the top-level `registry.json`. */
export function defineRegistry(
  data: Omit<Registry, 'items'>,
  items: RegistryItem[],
) {
  const registry = registrySchema.parse({ ...data, items })

  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    ...registry,
  }
}

/**
 * Validate one registry item.
 *
 * Registry dependencies are written as bare names (`'button'`). Ours are
 * rewritten to absolute URLs so a consumer running `shadcn add` pulls them
 * from this registry; anything not in `REGISTRY_COMPONENTS` is assumed to be
 * an upstream shadcn item and left for the CLI to resolve.
 */
export function defineRegistryItem(data: RegistryItem) {
  const registryUrl = process.env.REGISTRY_URL?.replace(/\/$/, '')

  return registryItemSchema.parse({
    ...data,
    registryDependencies: data.registryDependencies?.map((dependency) =>
      REGISTRY_COMPONENTS.includes(dependency) && registryUrl
        ? `${registryUrl}/r/${dependency}.json`
        : dependency,
    ),
  })
}

/** Validate a shared file list, defaulting `content` so the schema is happy. */
export function defineRegistryFiles(files: RegistryItemFile[]) {
  return files.map((file) => ({
    ...registryItemFileSchema.parse(file),
    content: file.content ?? '',
  }))
}
