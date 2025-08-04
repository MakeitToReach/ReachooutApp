# Portfolio Analytics Integration

This directory contains the analytics integration for portfolio tracking. The system now supports only **Google Analytics** with basic page view tracking.

## 🚀 Quick Start

### 1. Automatic Integration

The analytics are automatically integrated into `PortfolioView.tsx`. No additional setup required for basic tracking.

### 2. Project-Specific Tracking

To enable project-specific analytics, add a `trackingId` field to your Project model:

```prisma
model Project {
  id           String            @id @default(cuid())
  name         String
  subDomain    String            @unique
  customDomain String?           @unique
  trackingId   String?           // Google Analytics tracking ID
  // ... other fields
}
```

## 📊 Analytics Options

### Google Analytics (Default)

- **Pros**: Feature-rich, familiar interface, powerful insights
- **Setup**: Add `trackingId` to project data
- **Tracking**: Basic page views only (no scroll tracking, click tracking, etc.)

## 🎯 Tracking Events

### Automatic Events

- Page views with project data
- Basic Google Analytics integration

### Manual Events

Use the utility function in `lib/analytics.ts`:

```typescript
import { trackPageView } from "@/lib/analytics";

// Track custom page view events
trackPageView("custom_event", {
  event_category: "engagement",
  event_label: "portfolio_view",
});
```

## 🔧 Configuration

### PortfolioView Integration

The `PortfolioView` component automatically includes analytics:

```typescript
<PortfolioAnalytics
  projectId={project.id}
  projectName={project.name}
  subdomain={project.subDomain}
  customDomain={project.customDomain}
  googleTrackingId={project.trackingId}
/>
```

## 📈 Tracked Data

### Project Information

- Project ID
- Project name
- Subdomain
- Custom domain
- Page URL
- Page title

### User Interactions

- Basic page views only
- No detailed user interaction tracking

## 🔒 Privacy Considerations

### Data Collected

- ✅ Project metadata (non-personal)
- ✅ Basic page views
- ❌ Personal information (names, emails, etc.)
- ❌ Sensitive form data
- ❌ Detailed user interactions

### GDPR Compliance

- Google Analytics requires additional setup for GDPR compliance
- All tracking respects user privacy preferences

## 🛠️ Customization

### Adding Custom Events

```typescript
// In your portfolio component
import { trackPageView } from "@/lib/analytics";

const handleCustomAction = () => {
  trackPageView("custom_action", {
    event_category: "engagement",
    event_label: "portfolio_interaction",
  });
};
```

## 📋 Example Usage

The analytics are automatically integrated into portfolio components. No additional setup required.
