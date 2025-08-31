import { useId, useState, useEffect } from "react";
import { CheckIcon, InfoIcon } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";

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
import { createOrder, verifyPayment } from "@/api/payment";
import { ReqInput } from "./editor-components/inputs/reqInput";

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
    //eslint-disable-next-line
    const [discountCoupon, setDiscountCoupon] = useState("");
    const [isCfOpen, setIsCfOpen] = useState(false);
    //eslint-disable-next-line
    const [cashfree, setCashfree] = useState<any>(null);

    const monthlyPrice = 349;
    const yearlyPrice = 249 * 12;

    const planAmounts: Record<string, string> = {
        "1": "rcfpp",
        "2": "rcmpp",
        "3": "rcypp"
    };

    // Initialize Cashfree SDK
    useEffect(() => {
        const initializeSDK = async () => {
            try {
                const cf = await load({
                    mode: process.env.NODE_ENV === "production" ? "production" : "sandbox"
                });
                setCashfree(cf);
            } catch (error) {
                console.error("Failed to initialize Cashfree SDK:", error);
            }
        };
        initializeSDK();
    }, []);

    const handlePayment = async () => {
        const amount_id = planAmounts[value];
        if (amount_id === "rcfpp") {
            handlePublish(7);
            return;
        }

        if (!cashfree) {
            // alert("Cashfree SDK not initialized")
            console.error("Cashfree SDK not initialized");
            return;
        }

        try {
            const order = await createOrder(amount_id);

            const checkoutOptions = {
                paymentSessionId: order.paymentSessionId,
                redirectTarget: "_modal",
            };

            const result = await cashfree.checkout(checkoutOptions);

            if (order) {
                console.log("order", order)

            }

            if (result.error) {
                // User closed popup or payment error
                console.log("User has closed the popup or there is some payment error");
                console.log(result.error);
                setIsCfOpen(false);
            } else if (result.redirect) {
                // Payment will be redirected (exceptional case)
                console.log("Payment will be redirected");
            } else if (result.paymentDetails) {
                // Payment completed, verify it
                console.log("Payment has been completed, checking status");
                console.log(result.paymentDetails.paymentMessage);

                try {
                    const verification = await verifyPayment(order.id, order.paymentSessionId);
                    if (verification.success) {
                        switch (order.amount) {
                            case monthlyPrice * 100:
                                handlePublish(31);
                                break;
                            case yearlyPrice * 100:
                                handlePublish(365);
                                break;
                        }
                    }
                } catch (error) {
                    console.error("Payment verification failed:", error);
                }
                setIsCfOpen(false);
            }
        } catch (error) {
            console.error("Payment failed:", error);
            setIsCfOpen(false);
        }
    };

    return (
        <Dialog modal={!isCfOpen} open={open} onOpenChange={onOpenChange}>
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
                                        <Label htmlFor={`${id}-2`}>One Month</Label>
                                        <p
                                            id={`${id}-2-description`}
                                            className="text-muted-foreground text-xs"
                                        >
                                            ₹{monthlyPrice} for one month
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
                                        <Label htmlFor={`${id}-3`}>One year</Label>
                                        <p
                                            id={`${id}-3-description`}
                                            className="text-muted-foreground text-xs"
                                        >
                                            ₹{yearlyPrice} for one year
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </RadioGroup>
                    {value === "3" && (
                        <div className="space-y-2">
                            <label>Discount Code</label>
                            <ReqInput
                                type="text"
                                placeholder="Reachoout discount code"
                                onChange={(e) => setDiscountCoupon(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="space-y-3">
                        <p>
                            <strong className="text-sm font-medium">Note:</strong>
                        </p>
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
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Button
                            type="button"
                            onClick={handlePayment}
                            className="w-full"
                            disabled={!cashfree}
                        >
                            {!cashfree ? "Loading..." : "Confirm"}
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
