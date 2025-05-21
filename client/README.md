## Section Component Naming

- The section component name should follow camelCase with the initials of the templateName
  `PFHeroSection`

## Section names should be lowercase

- navbar, hero, footer, about, etc
- export the sections from the `<templateName>/sections/index.ts`

## Directory Structure

- All template components should be under the `src/templates` directory
- `src/templates` follows a set structure with `<templateName>` directories
- each `<template>` directory must have the
  - schema
  - sections ( components )
  - types ( optional )
  - index.tsx ( main template page file )

## Schema

- It must contain the template's `TemplateSchema` object that follows the
  `GenericTemplateSchema` interface
- Also must contain the `TemplateEditorSchema` object that follows the `GenericEditorFieldSchema` interface

## Types

- It must contain the section type. i.e the props interface that the section data follows
  e.g `PF_HERO_SECTION`
- It must follow the CAPS_SNAKE_CASE for both the interface and the type alias
- These types must be registered as in the `GenericTemplateSchema` interface in
  `<templateName>/schema/templateSchema.ts` under the `<template>_SECTION_BLOCK`



