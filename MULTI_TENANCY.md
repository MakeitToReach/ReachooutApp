# Multi-Tenancy System

This document describes the multi-tenancy system implemented for user portfolios.

## Overview

The multi-tenancy system allows users to access their portfolios via subdomains. Each user's project gets a unique subdomain that can be accessed directly.

## Architecture

### Frontend (Next.js)

1. **Middleware** (`client/src/middleware.ts`)

   - Intercepts all requests
   - Detects subdomain requests
   - Rewrites URLs to `/portfolio/[subdomain]` route

2. **Portfolio Route** (`client/src/app/portfolio/[subdomain]/page.tsx`)

   - Handles subdomain-based portfolio requests
   - Fetches project data by subdomain
   - Renders portfolio using PortfolioView component

3. **PortfolioView Component** (`client/src/components/portfolio/PortfolioView.tsx`)
   - Renders portfolio templates
   - Applies theme styles
   - Handles multiple templates in order

### Backend (Express.js)

1. **Project Controller** (`server/src/controllers/project.controller.ts`)

   - `getProjectBySubdomain`: Fetches project by subdomain
   - `checkSubdomainAvailability`: Validates subdomain availability
   - Updated `createProject`: Generates unique subdomains

2. **Project Routes** (`server/src/routes/project.routes.ts`)
   - `/v1/project/subdomain/:subdomain`: Public route for portfolio access
   - `/v1/project/check-subdomain/:subdomain`: Check subdomain availability

## Database Schema

The `Project` model includes:

- `subDomain`: Unique subdomain for the project
- `customDomain`: Optional custom domain
- `templates`: Associated templates with order

## URL Structure

### Development

```
http://[subdomain].localhost:3000
```

### Production

```
https://[subdomain].reachoout.com
```

## Features

### Subdomain Generation

- Automatically generates unique subdomains for new projects
- Format: `username-timestamp-random`
- Validates subdomain availability

### Portfolio Display

- Renders multiple templates in order
- Applies theme styles from templates
- Handles missing portfolios gracefully

### URL Management

- Copy portfolio URLs to clipboard
- Open portfolios in new tabs
- Support for custom domains

## Testing

Visit `/test-multi-tenancy` to test the system:

1. Enter a subdomain
2. Generate the portfolio URL
3. Open the portfolio

## Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NODE_ENV`: Environment (development/production)

### Domain Configuration

For production, update the domain in:

- `client/src/middleware.ts`
- `client/src/components/editor-components/projectCard.tsx`
- `client/src/app/test-multi-tenancy/page.tsx`

## Security Considerations

1. **Public Access**: Portfolio routes are public (no authentication required)
2. **Subdomain Validation**: Validates subdomain format and availability
3. **Error Handling**: Graceful handling of missing portfolios

## Future Enhancements

1. **Custom Domains**: Full support for custom domain configuration
2. **Analytics**: Track portfolio views and engagement
3. **SEO**: Meta tags and structured data for portfolios
4. **Caching**: Implement caching for better performance
5. **CDN**: Content delivery network for static assets
