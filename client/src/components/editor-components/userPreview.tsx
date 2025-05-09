import { getUserTemplateData } from "@/api/user-template";
import { TEMPLATE_REGISTRY } from "@/lib/templateRegistry";
import { GenericTemplateSchema } from "@/schemas/templates.schema";
import { GetServerSideProps } from "next";
// import { PageLoader } from "@/components/editor-components/pageLoader";
// import { toast } from "sonner";
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
