import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion as m } from "motion/react"; // <-- FIXED: correct import
import { useRouter } from "next/navigation";

export const OnboardingPopup = ({
  children,
  typeIndieEditorUrl,
  typeOrgEditorUrl,
}: {
  children: React.ReactNode;
  typeIndieEditorUrl: string;
  typeOrgEditorUrl: string;
}) => {
  const router = useRouter();

  const handleSelect = (type: "individual" | "organization") => {
    router.push(type === "individual" ? typeIndieEditorUrl : typeOrgEditorUrl);
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <DialogContent className="z-[100] max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-center text-2xl font-bold mb-6">
            Choose your role
          </DialogTitle>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Individual Option */}
            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect("individual")}
              className="w-full max-w-xs p-6 rounded-lg border border-border shadow-md cursor-pointer bg-white hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold mb-2 text-center">Individual</h2>
              <p className="text-sm text-gray-500 text-center">
                Ideal for freelancers, personal portfolios, or resumes.
              </p>
            </m.div>

            <span className="text-sm text-muted-foreground font-medium">OR</span>

            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect("organization")}
              className="w-full max-w-xs p-6 rounded-lg border border-border shadow-md cursor-pointer bg-white hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold mb-2 text-center">Organization</h2>
              <p className="text-sm text-gray-500 text-center">
                Perfect for companies, teams, and group showcases.
              </p>
            </m.div>
          </div>
        </DialogContent>
      </m.div>
    </Dialog>
  );
};
