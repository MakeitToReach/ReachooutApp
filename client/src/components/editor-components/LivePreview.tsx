import { usePortfolioStore } from "@/store/portfolio.store";

export const LivePreview = ({
    templateComponent: TemplateComponent,
}: {
    //eslint-disable-next-line
    templateComponent: React.FC<{ data: any }>;
}) => {
    const { data } = usePortfolioStore();
    if (!data) return null;

    return (
        <div className="border border-l w-full">
            <TemplateComponent data={data} />
        </div>
    );
};
