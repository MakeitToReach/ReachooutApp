import { usePortfolioStore } from "@/store/portfolio.store";

export const LivePreview = ({
  templateComponent: TemplateComponent,
  theme,
}: {
  //eslint-disable-next-line
  templateComponent: React.FC<{ data: any }>;
  theme?: Record<string, string>;
}) => {
  const { data } = usePortfolioStore();
  if (!data) return null;

  return (
    <div className="border border-l w-full theme-wrapper" style={theme}>
      <TemplateComponent data={data} />
    </div>
  );
};
