import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-zinc-950">
      <LoaderCircle className="w-10 h-10 animate-spin text-white" />
    </div>
  );
};
