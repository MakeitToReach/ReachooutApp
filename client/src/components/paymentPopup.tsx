import { useId, useState } from "react";
import { ArrowUpRight, InfoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

interface PaymentPopupProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  handlePublish: (expiryDays: number) => void;
  showFreePlan?: boolean;
  showPaymentOpts?: boolean;
}
export function PaymentPopup({
  children,
  handlePublish,
  open,
  onOpenChange,
  showFreePlan = true,
  showPaymentOpts = false,
}: PaymentPopupProps) {
  const id = useId();
  const [value, setValue] = useState("1");

  const monthlyPrice = 399;
  const yearlyPrice = 249;

  const planAmounts: Record<string, number> = {
    "1": 0,
    "2": monthlyPrice,
    "3": yearlyPrice,
  };

  const handlePayment = async () => {
    const amount = planAmounts[value];
    if (amount === 0) {
      handlePublish(7);
      onOpenChange?.(false);
      return;
    }
    if (value === "2") {
      window.open("https://reachoout.com/checkout/?add-to-cart=6315", "_blank");
      return;
    }
    if (value === "3") {
      window.open("https://reachoout.com/checkout/?add-to-cart=8360", "_blank");
      return;
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle className="text-left md:text-2xl font-Poppins font-medium">
              Choose your plan
            </DialogTitle>
            <DialogDescription className="text-left">
              Upgrade options for your Reachpage
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <RadioGroup
            className="gap-2"
            value={value}
            onValueChange={(val) => setValue(val)}
          >
            {showFreePlan && (
              <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
                <RadioGroupItem
                  value="1"
                  id={`${id}-1`}
                  aria-describedby={`${id}-1-description`}
                  className="order-1 after:absolute after:inset-0"
                />
                <div className="grid grow gap-1">
                  <Label htmlFor={`${id}-1`}>One week trial</Label>
                  <p
                    id={`${id}-1-description`}
                    className="text-muted-foreground text-xs"
                  >
                    Free
                  </p>
                </div>
              </div>
            )}
            {showPaymentOpts && (
              <>
                <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
                  <RadioGroupItem
                    value="2"
                    id={`${id}-2`}
                    aria-describedby={`${id}-2-description`}
                    className="order-1 after:absolute after:inset-0"
                  />
                  <div className="grid grow gap-1">
                    <Label htmlFor={`${id}-2`}>Monthly Plan</Label>
                    <p
                      id={`${id}-2-description`}
                      className="text-muted-foreground text-xs"
                    >
                      ₹{monthlyPrice}/month
                    </p>
                  </div>
                </div>
                <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
                  <RadioGroupItem
                    value="3"
                    id={`${id}-3`}
                    aria-describedby={`${id}-3-description`}
                    className="order-1 after:absolute after:inset-0"
                  />
                  <div className="grid grow gap-1">
                    <Label htmlFor={`${id}-3`}>Yearly Plan</Label>
                    <p
                      id={`${id}-3-description`}
                      className="text-muted-foreground text-xs"
                    >
                      ₹{yearlyPrice}/month (billed annually, save 38%)
                    </p>
                  </div>
                </div>
              </>
            )}
          </RadioGroup>
          <div className="space-y-3">
            {!showPaymentOpts && (
              <div className="text-muted-foreground flex items-center gap-2">
                <InfoIcon size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">
                  Our payment gateway is currently being set up. To upgrade to
                  the quick plan or purchase multiple Reachpages, please contact
                  us at
                  <a
                    href="mailto:payment@reachoout.com"
                    className="text-blue-600 underline ml-1"
                  >
                    payment@reachoout.com
                  </a>
                </span>
              </div>
            )}
            {showPaymentOpts && (
              <ul className="text-muted-foreground space-y-2 text-sm">
                <Link href="https://reachoout.com/pricing" target="_blank">
                  <li className="flex gap-1 underline">
                    Check out all features here
                    <span>
                      <ArrowUpRight size={16} />
                    </span>
                  </li>
                </Link>
              </ul>
            )}
          </div>

          <div className="grid gap-2">
            <Button
              type="button"
              onClick={handlePayment}
              className="w-full bg-[#ff9933]"
            >
              Confirm
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
