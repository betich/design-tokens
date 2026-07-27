import { z } from 'zod'

export const registryItemFileSchema = z
  .object({
    path: z
      .string()
      .describe('The path to the file relative to the registry root.'),
    content: z.string().optional().describe('The content of the file.'),
    type: z
      .enum([
        'registry:lib',
        'registry:block',
        'registry:component',
        'registry:ui',
        'registry:hook',
        'registry:theme',
        'registry:page',
        'registry:file',
        'registry:style',
      ])
      .describe('The type of the file when resolved for a project.'),
    target: z
      .string()
      .optional()
      .describe('The target path of the file in the project.'),
  })
  .refine(
    (data) => {
      if (['registry:file', 'registry:page'].includes(data.type)) {
        return data.path != null && data.type != null && data.target != null
      }
      return data.path != null && data.type != null
    },
    {
      message:
        "Files of type 'registry:file' or 'registry:page' must have path, type, and target",
    },
  )

export type RegistryItemFile = z.infer<typeof registryItemFileSchema>

const registryItemTailwindSchema = z
  .object({
    config: z.object({
      content: z.array(z.string()).optional(),
      theme: z.record(z.any()).optional(),
      plugins: z.array(z.string()).optional(),
    }),
  })
  .describe('The tailwind configuration for the registry item.')

const cssVarsThemeSchema = z.record(z.string())

const registryItemCssVarsSchema = z
  .object({
    theme: cssVarsThemeSchema
      .describe(
        'CSS variables for the @theme directive. For Tailwind v4 projects only.',
      )
      .optional(),
    light: cssVarsThemeSchema
      .describe('CSS variables for the light theme.')
      .optional(),
    dark: cssVarsThemeSchema
      .describe('CSS variables for the dark theme.')
      .optional(),
  })
  .describe('The css variables for the registry item.')

const cssPropertySchema = z.union([
  z.string().describe('Direct CSS string'),
  z
    .record(
      z.union([
        z.string().describe('CSS property value'),
        z.record(z.string().describe('CSS property value for nested rule')),
      ]),
    )
    .describe('CSS properties or nested selectors'),
])

export const registryItemSchema = z
  .object({
    name: z
      .string()
      .describe(
        'The name of the item. Used to identify the item in the registry.',
      ),
    type: z
      .enum([
        'registry:lib',
        'registry:block',
        'registry:component',
        'registry:ui',
        'registry:hook',
        'registry:theme',
        'registry:page',
        'registry:file',
        'registry:style',
      ])
      .describe('The type of the item.'),
    description: z
      .string()
      .optional()
      .describe('A brief overview of the item.'),
    title: z
      .string()
      .optional()
      .describe('The human-readable title for your registry item.'),
    author: z
      .string()
      .optional()
      .describe('The author of the item. Format: username <url>'),
    dependencies: z
      .array(z.string())
      .optional()
      .describe('NPM dependencies required by the registry item.'),
    devDependencies: z
      .array(z.string())
      .optional()
      .describe('NPM dev dependencies required by the registry item.'),
    registryDependencies: z
      .array(z.string())
      .optional()
      .describe('Registry items that this item depends on.'),
    files: z
      .array(registryItemFileSchema)
      .optional()
      .describe('The main payload of the registry item.'),
    tailwind: registryItemTailwindSchema.optional(),
    cssVars: registryItemCssVarsSchema.optional(),
    css: z
      .record(cssPropertySchema)
      .optional()
      .describe("CSS definitions to be added to the project's CSS file."),
    meta: z
      .record(z.any())
      .optional()
      .describe('Additional metadata for the registry item.'),
    docs: z
      .string()
      .optional()
      .describe('The documentation for the registry item in markdown.'),
    categories: z
      .array(z.string())
      .optional()
      .describe('The categories of the registry item.'),
    extends: z
      .string()
      .optional()
      .describe(
        'The name of the registry item to extend. Available for registry:style items only.',
      ),
  })
  .strict()

export type RegistryItem = z.infer<typeof registryItemSchema>

export const registrySchema = z
  .object({
    name: z.string(),
    homepage: z.string(),
    items: z.array(registryItemSchema),
  })
  .strict()
  .describe('A shadcn registry of components, hooks, pages, etc.')
  .refine((data) => data.items.length >= 1, {
    message: 'Items array must have at least one item',
  })
  .refine(
    (data) => {
      const uniqueItems = new Set(data.items)
      return uniqueItems.size === data.items.length
    },
    {
      message: 'Items must be unique',
    },
  )

export type Registry = z.infer<typeof registrySchema>
