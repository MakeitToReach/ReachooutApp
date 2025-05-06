To implement **auto-scrolling** in the `LivePreview` when a section is being edited in the `EditorPanel`, you'll need to:

1. **Assign IDs or refs** to each section/component in the preview.
2. **Communicate** from `EditorPanel` which section is being edited (e.g., using a global state or context).
3. **Scroll into view** inside `LivePreview` when the section changes.

---

### ✅ Step-by-Step Implementation

---

### 1. **Modify Global Store (or Context)**

If you're using Zustand in `portfolio.store`, you can add a field for the **currently edited section**.

```ts
// portfolio.store.ts

interface PortfolioState {
    data: any;
    currentEditingSection: string | null;
    setCurrentEditingSection: (id: string | null) => void;
    // other state...
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
    data: null,
    currentEditingSection: null,
    setCurrentEditingSection: (id) => set({ currentEditingSection: id }),
    // other state...
}));
```

---

### 2. **Update `EditorPanel` to Set Editing Section**

When a user focuses or clicks on a section in `EditorPanel`, update the state:

```tsx
// EditorPanel.tsx
import { usePortfolioStore } from "@/store/portfolio.store";

// Inside your component or form input handler
const handleFocus = (sectionId: string) => {
    usePortfolioStore.getState().setCurrentEditingSection(sectionId);
};

// Example
<input onFocus={() => handleFocus("about-section")} />
```

---

### 3. **Scroll in `LivePreview` When Section Changes**

In the `LivePreview` component:

```tsx
import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/store/portfolio.store";

export const LivePreview = ({ templateComponent: TemplateComponent }) => {
    const currentEditingSection = usePortfolioStore((state) => state.currentEditingSection);

    useEffect(() => {
        if (currentEditingSection) {
            const sectionElement = document.getElementById(currentEditingSection);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [currentEditingSection]);

    return (
        <div className="preview-container overflow-y-auto h-full">
            <TemplateComponent />
        </div>
    );
};
```

---

### 4. **Set IDs in Template Sections**

Ensure each section rendered in the template has an ID that matches what `EditorPanel` is sending:

```tsx
// Inside your template
const MyTemplate = () => (
    <div>
        <section id="hero-section">...</section>
        <section id="about-section">...</section>
        <section id="projects-section">...</section>
    </div>
);
```

---

### ✅ Result

When you click or edit a field in the `EditorPanel`, the `LivePreview` will **auto-scroll smoothly** to that section.

Would you like help adding animations or highlighting the target section briefly too? That can enhance visibility.



Great! Let's add a **loader** to your `UserPreview` component that displays while:

1. The template data is being fetched
2. Fonts/styles are loading (if needed)

---

### ✅ Step-by-Step Loader Integration

#### 1. **Create a Loader Component**

Here's a simple, reusable loader:

```tsx
// components/Loader.tsx
const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black text-white">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
  </div>
);

export default Loader;
```

You can style it however you want or replace it with a skeleton, spinner, shimmer, etc.

---

#### 2. **Use it in `UserPreview.tsx`**

Update your component to use the loader while data is loading:

```tsx
"use client";

import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader"; // adjust import path as needed

const UserPreview = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<GenericTemplateSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const templateKey = searchParams.get("template") as keyof typeof TEMPLATE_REGISTRY;
  const template = TEMPLATE_REGISTRY[templateKey];

  useEffect(() => {
    if (!template) return;

    const fetchData = async () => {
      try {
        const fetchedData = await getUserTemplateData(templateKey);
        if (!fetchedData) return router.push(`/`);
        setData(fetchedData.userTemplateData);
      } catch (err) {
        console.error("Failed to load template data:", err);
        router.push(`/`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [templateKey]);

  if (!template) return <p>Template not found</p>;
  if (isLoading || !data) return <Loader />;

  return (
    <div style={data.theme as React.CSSProperties} className="theme-wrapper">
      <template.component data={data} />
    </div>
  );
};

export default UserPreview;
```

---

### ✅ Optional: Add Transition for Loader Exit

If you want a smooth transition from loader to content, we can wrap the return with `AnimatePresence` and `motion` later.

Would you like a fancier loader (skeletons, logo spinner, etc.) or keep it minimal?
