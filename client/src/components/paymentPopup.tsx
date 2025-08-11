import { useId, useState } from "react";
import { CheckIcon } from "lucide-react";

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
import { createOrder } from "@/api/payment";

interface PaymentPopupProps {
  children: React.ReactNode;
  handlePublish: (expiryDays: number) => void;
}
export function PaymentPopup({ children, handlePublish }: PaymentPopupProps) {
  const id = useId();
  const [value, setValue] = useState("2");
  const [isRzpOpen, setIsRzpOpen] = useState(false);

  const monthlyPrice = 349;
  const yearlyPrice = 249 * 12;

  const planAmounts: Record<string, number> = {
    "1": 0,
    "2": monthlyPrice,
    "3": yearlyPrice,
  };

  const handlePayment = async () => {
    const amount = planAmounts[value];
    if (amount === 0) {
      handlePublish(7);
      return;
    }

    const order = await createOrder(amount);

    const opts = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Reachoout",
      description: "Payment for Reachoout Webpage",
      order_id: order.id,
      image: "https://app.reachoout.com/apple-touch-icon.png",
      //eslint-disable-next-line
      handler: function (response: any) {
        console.log("Payment Successful", response);
        console.log(order.amount);
        switch (order.amount) {
          case monthlyPrice * 100:
            handlePublish(31);
          case yearlyPrice * 100:
            handlePublish(365);
        }
      },
      theme: {
        color: "#FF9933",
      },
      modal: {
        ondismiss: () => setIsRzpOpen(false),
      },
    };

    //eslint-disable-next-line
    const rzp = new (window as any).Razorpay(opts);
    rzp.open();
    //eslint-disable-next-line
    rzp.on("payment.failed", function (response: any) {
      setIsRzpOpen(false);
    });

    opts.modal = {
      ondismiss: () => {
        setIsRzpOpen(false);
      },
    };
    setIsRzpOpen(true);
  };
  return (
    <Dialog modal={!isRzpOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle className="text-left">Choose your plan</DialogTitle>
            <DialogDescription className="text-left">
              Pick one of the following plans.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <RadioGroup
            className="gap-2"
            value={value}
            onValueChange={(val) => setValue(val)}
          >
            {/* Radio card #1 */}
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
            {/* Radio card #2 */}
            <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
              <RadioGroupItem
                value="2"
                id={`${id}-2`}
                aria-describedby={`${id}-2-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-2`}>One Month</Label>
                <p
                  id={`${id}-2-description`}
                  className="text-muted-foreground text-xs"
                >
                  ₹{monthlyPrice} for one month
                </p>
              </div>
            </div>
            {/* Radio card #3 */}
            <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
              <RadioGroupItem
                value="3"
                id={`${id}-3`}
                aria-describedby={`${id}-3-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-3`}>One year</Label>
                <p
                  id={`${id}-3-description`}
                  className="text-muted-foreground text-xs"
                >
                  ₹{yearlyPrice} for one year
                </p>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-3">
            <p>
              <strong className="text-sm font-medium">Features include:</strong>
            </p>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Create unlimited projects.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Remove watermarks.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Add unlimited users and free viewers.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Upload unlimited files.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                7-day money back guarantee.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Advanced permissions.
              </li>
            </ul>
          </div>

          <div className="grid gap-2">
            <Button type="button" onClick={handlePayment} className="w-full">
              Proceed to checkout
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
