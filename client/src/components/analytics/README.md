# Portfolio Analytics Integration

This directory contains the analytics integration for portfolio tracking. The system supports both **Umami** and **Google Analytics** with project-specific tracking.

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

### Option 1: Umami Analytics (Default)

- **Pros**: Privacy-focused, GDPR compliant, lightweight
- **Cons**: Less features than Google Analytics
- **Setup**: Already configured in `layout.tsx`

### Option 2: Google Analytics

- **Pros**: Feature-rich, familiar interface, powerful insights
- **Cons**: Privacy concerns, heavier tracking
- **Setup**: Add `trackingId` to project data

### Option 3: Both

- **Pros**: Best of both worlds
- **Cons**: More complex setup
- **Setup**: Configure both systems

## 🎯 Tracking Events

### Automatic Events

- Page views with project data
- Scroll tracking (50% scroll threshold)
- Portfolio load events

### Manual Events

Use the utility functions in `lib/analytics.ts`:

```typescript
import {
  trackLinkClick,
  trackElementInteraction,
  trackVideoPlay,
  trackFormSubmission,
} from "@/lib/analytics";

// Track link clicks
trackLinkClick("social", "https://linkedin.com/in/user", "LinkedIn");

// Track button interactions
trackElementInteraction("button", "click", "contact-btn");

// Track video plays
trackVideoPlay(
  "project",
  "https://youtube.com/watch?v=example",
  "Project Demo"
);

// Track form submissions
trackFormSubmission("contact", { has_name: true, has_email: true });
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
  umamiWebsiteId="your-umami-id"
  analyticsType={project.trackingId ? "both" : "umami"}
/>
```

### Analytics Type Options

- `"umami"`: Use only Umami (default)
- `"google"`: Use only Google Analytics
- `"both"`: Use both systems

## 📈 Tracked Data

### Project Information

- Project ID
- Project name
- Subdomain
- Custom domain
- Page URL
- Page title

### User Interactions

- Link clicks (with link type and URL)
- Button interactions
- Form submissions
- Video plays
- Image views
- File downloads
- Section views
- Scroll behavior

## 🔒 Privacy Considerations

### Data Collected

- ✅ Project metadata (non-personal)
- ✅ User interactions (anonymized)
- ✅ Page views and navigation
- ❌ Personal information (names, emails, etc.)
- ❌ Sensitive form data

### GDPR Compliance

- Umami is GDPR compliant by default
- Google Analytics requires additional setup for GDPR compliance
- All tracking respects user privacy preferences

## 🛠️ Customization

### Adding Custom Events

```typescript
// In your portfolio component
import { trackPortfolioEvent } from "@/lib/analytics";

const handleCustomAction = () => {
  trackPortfolioEvent("custom_action", {
    action_type: "special_feature",
    user_type: "premium",
    timestamp: Date.now(),
  });
};
```

### Custom Analytics Provider

To add a new analytics provider:

1. Create a new component in `analytics/` directory
2. Follow the pattern of `UmamiAnalytics.tsx` or `GoogleAnalytics.tsx`
3. Add it to `PortfolioAnalytics.tsx`
4. Update the interface to include your new provider

## 📋 Example Usage

See `ExampleUsage.tsx` for complete examples of how to integrate analytics into portfolio components.

## 🚨 Troubleshooting

### Analytics Not Working

1. Check browser console for errors
2. Verify tracking IDs are correct
3. Ensure analytics scripts are loading
4. Check ad blockers (they may block analytics)

### Privacy Issues

1. Use Umami for privacy-focused tracking
2. Implement cookie consent if required
3. Respect user privacy preferences
4. Don't track sensitive information

## 📚 Resources

- [Umami Documentation](https://umami.is/docs)
- [Google Analytics Documentation](https://developers.google.com/analytics)
- [GDPR Compliance Guide](https://gdpr.eu/)
