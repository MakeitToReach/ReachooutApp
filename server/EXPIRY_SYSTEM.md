# ProjectTemplate Expiry System

This document describes the expiry system implemented for ProjectTemplate entities.

## Overview

The expiry system allows setting an expiration date for project templates. When a template is expired, it will return null with a "project expired" message instead of the template data.

## Database Changes

### New Field

- Added `expiresAt` field to the `ProjectTemplate` model in Prisma schema
- Type: `DateTime?` (nullable)
- Default: `null` (no expiry)

### Migration

- Migration file: `20250101000000_added_expires_at_to_project_template/migration.sql`
- Adds the `expiresAt` column to the `ProjectTemplate` table

## API Changes

### New Endpoint

- **PUT** `/v1/template/expiry`
- Requires authentication
- Body parameters:
  - `projectId` (required): The project ID
  - `templateId` (required): The template ID
  - `order` (optional): The template order (defaults to 0)
  - `expiresAt` (optional): ISO date string for expiry (null to remove expiry)

### Updated Endpoints

The following endpoints now filter out expired templates or return expiry errors:

1. **GET** `/v1/template/user/:templateId` - Returns 410 with "project expired" message if template is expired
2. **GET** `/v1/project/:id` - Filters out expired templates from project response
3. **GET** `/v1/project/templates/:id` - Filters out expired templates
4. **GET** `/v1/project/subdomain/:subdomain` - Filters out expired templates
5. **GET** `/v1/project/custom-domain/:customDomain` - Filters out expired templates
6. **GET** `/v1/project/subdomain/:subdomain/slug/:slug` - Returns 410 if template is expired

## Response Format

### Expired Template Response

```json
{
  "error": "Project expired",
  "message": "project expired",
  "template": null
}
```

### HTTP Status Codes

- `410 Gone`: Template is expired
- `200 OK`: Template is active
- `404 Not Found`: Template not found

## Utility Function

The expiry check is implemented using a utility function:

```typescript
const isProjectTemplateExpired = (expiresAt: Date | null): boolean => {
  if (!expiresAt) return false; // No expiry set
  return new Date() > expiresAt;
};
```

## Usage Examples

### Setting Expiry

```bash
curl -X PUT http://localhost:3000/v1/template/expiry \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "project_id",
    "templateId": "template_id",
    "expiresAt": "2024-12-31T23:59:59.000Z"
  }'
```

### Removing Expiry

```bash
curl -X PUT http://localhost:3000/v1/template/expiry \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "project_id",
    "templateId": "template_id",
    "expiresAt": null
  }'
```

## Testing

Run the test script to verify the expiry system:

```bash
cd server
node test-expiry.js
```

## Migration Steps

1. Run the migration to add the `expiresAt` field:

   ```bash
   cd server
   npx prisma migrate dev --name added_expires_at_to_project_template
   ```

2. Regenerate the Prisma client:

   ```bash
   npx prisma generate
   ```

3. Restart the server to pick up the new schema

## Notes

- Templates without an `expiresAt` value (null) are considered non-expired
- Expired templates are filtered out from list responses
- Individual template requests return a 410 status when expired
- The expiry system is backward compatible - existing templates without expiry dates continue to work normally
