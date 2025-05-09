Certainly! Below are two implementations for fetching data and rendering a user portfolio with **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)** using Next.js.

### 1. **Server-Side Rendering (SSR)**

With SSR, the data is fetched on every request, ensuring that the latest data is always served. This is ideal if the user's portfolio data changes frequently or needs to be up-to-date each time the page is accessed.

#### `/app/[slug]/page.tsx` (SSR Implementation)

```tsx
import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { GetServerSideProps } from "next";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { toast } from "sonner";
import Head from "next/head";

interface UserPortfolioProps {
  portfolioData: GenericTemplateSchema | null;
  templateKey: string | null;
}

const UserPortfolioPage = ({
  portfolioData,
  templateKey,
}: UserPortfolioProps) => {
  if (!portfolioData) {
    return <p>Portfolio not found</p>;
  }

  const template = templateKey
    ? TEMPLATE_REGISTRY[templateKey as keyof typeof TEMPLATE_REGISTRY]
    : null;

  if (!template) {
    return <p>Template not found</p>;
  }

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Apply the theme styles
  React.useEffect(() => {
    if (!portfolioData?.theme || !wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const toCSSVars = (theme: Record<string, string>) =>
      Object.entries(theme).reduce(
        (acc, [key, value]) => {
          const cssKey = key.startsWith("--")
            ? key
            : `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;
          acc[cssKey] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

    const cssVars = toCSSVars(portfolioData.theme);

    Object.entries(cssVars).forEach(([key, value]) => {
      wrapper.style.setProperty(key, value);
    });
  }, [portfolioData?.theme]);

  return (
    <>
      <Head>
        <title>{portfolioData.name}'s Portfolio</title>
        <meta
          name="description"
          content={`Visit ${portfolioData.name}'s portfolio to see their work and projects.`}
        />
        {/* Add other meta tags, OpenGraph tags, etc. */}
      </Head>

      <div ref={wrapperRef} className="theme-wrapper w-full">
        <template.component data={portfolioData} />
      </div>
    </>
  );
};

// SSR: Fetch user data on the server side
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params; // dynamic slug as username or unique identifier

  try {
    // Fetch portfolio data by username
    const portfolioData = await getUserTemplateData(slug as string);
    if (!portfolioData) {
      return {
        notFound: true, // Portfolio not found
      };
    }

    const templateKey = portfolioData.userTemplateData?.templateKey || null;

    return {
      props: {
        portfolioData: portfolioData.userTemplateData || null,
        templateKey,
      },
    };
  } catch (err) {
    console.error("Error fetching user portfolio:", err);
    return {
      notFound: true,
    };
  }
};

export default UserPortfolioPage;
```

### Key Points for SSR:

- The data is fetched **server-side** on each request with `getServerSideProps`.
- SEO is improved by adding dynamic `<title>` and `<meta>` tags in the `<Head>` component for each user’s portfolio.
- Since the page is generated on the server with up-to-date data, this implementation works well if the portfolio data changes frequently.

---

### 2. **Static Site Generation (SSG)**

With SSG, the page is pre-rendered at build time. This approach is best if the user’s portfolio data doesn’t change often or if it's acceptable to serve cached content.

#### `/app/[slug]/page.tsx` (SSG Implementation)

```tsx
import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { GetStaticProps, GetStaticPaths } from "next";
import { PageLoader } from "@/components/editor-components/pageLoader";
import { toast } from "sonner";
import Head from "next/head";

interface UserPortfolioProps {
  portfolioData: GenericTemplateSchema | null;
  templateKey: string | null;
}

const UserPortfolioPage = ({
  portfolioData,
  templateKey,
}: UserPortfolioProps) => {
  if (!portfolioData) {
    return <p>Portfolio not found</p>;
  }

  const template = templateKey
    ? TEMPLATE_REGISTRY[templateKey as keyof typeof TEMPLATE_REGISTRY]
    : null;

  if (!template) {
    return <p>Template not found</p>;
  }

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Apply the theme styles
  React.useEffect(() => {
    if (!portfolioData?.theme || !wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const toCSSVars = (theme: Record<string, string>) =>
      Object.entries(theme).reduce(
        (acc, [key, value]) => {
          const cssKey = key.startsWith("--")
            ? key
            : `--${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}`;
          acc[cssKey] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

    const cssVars = toCSSVars(portfolioData.theme);

    Object.entries(cssVars).forEach(([key, value]) => {
      wrapper.style.setProperty(key, value);
    });
  }, [portfolioData?.theme]);

  return (
    <>
      <Head>
        <title>{portfolioData.name}'s Portfolio</title>
        <meta
          name="description"
          content={`Visit ${portfolioData.name}'s portfolio to see their work and projects.`}
        />
        {/* Add other meta tags, OpenGraph tags, etc. */}
      </Head>

      <div ref={wrapperRef} className="theme-wrapper w-full">
        <template.component data={portfolioData} />
      </div>
    </>
  );
};

// SSG: Fetch user data at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all usernames/slugs (This could be a list of all usernames in your DB)
  const slugs = await getAllUsernames(); // Replace with actual logic
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking", // block rendering until data is ready
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  try {
    // Fetch portfolio data by username
    const portfolioData = await getUserTemplateData(slug as string);
    if (!portfolioData) {
      return {
        notFound: true, // Portfolio not found
      };
    }

    const templateKey = portfolioData.userTemplateData?.templateKey || null;

    return {
      props: {
        portfolioData: portfolioData.userTemplateData || null,
        templateKey,
      },
      revalidate: 60, // Optional: revalidate data after 60 seconds (ISR)
    };
  } catch (err) {
    console.error("Error fetching user portfolio:", err);
    return {
      notFound: true,
    };
  }
};

export default UserPortfolioPage;
```

### Key Points for SSG:

1. **Pre-render pages at build time** using `getStaticProps`. This ensures faster page loads.
2. **Dynamic slugs**: `getStaticPaths` is used to specify the slugs that need to be pre-rendered (in this case, each user’s portfolio).
3. **Revalidate**: If you want to periodically regenerate the pages, you can use the `revalidate` option to trigger Incremental Static Regeneration (ISR) after a certain period (e.g., every 60 seconds).
4. **SEO**: Similar to SSR, you can dynamically update the `<title>` and `<meta>` tags using the `Head` component.

### Summary of Differences:

- **SSR**: Data is fetched on each request, ensuring that the data is always up-to-date. This is ideal for frequently changing content but may introduce some delay in rendering.
- **SSG**: Pages are pre-rendered at build time, making them very fast to load. This is ideal if the data doesn't change often, but you can use **ISR** to periodically regenerate the pages.

Both methods can help you ensure that your pages are SEO-friendly and can be indexed by search engines.
