import Image from "next/image";
import { F_GALLERY_SECTION } from "../types/gallery.types";

export const FGallerySection = ({
    title,
    subtitle,
    imgs,
}: F_GALLERY_SECTION) => {
    return (
        <section id="gallery" className="w-full rounded-lg overflow-hidden py-20 px-6">
            <div className="max-w-6xl mx-auto h-full my-10 space-y-8 overflow-x-visible text-template-text-primary">
                <h2 className="font-semibold sm:text-5xl text-3xl tracking-tight text-center">
                    {title}
                </h2>
                <p className="text-center line-clamp-4">{subtitle}</p>
                <div className="grid h-[90vh] sm:grid-cols-3 grid-cols-1 gap-6 mt-10">
                    {/* column 1 */}
                    <div className="space-y-6">
                        <div className="h-[55%] bg-red-400 relative overflow-hidden rounded-xl">
                            <Image
                                src={imgs[0] || "/placeholder.png"}
                                fill
                                className="object-cover"
                                alt="Image 1"
                            />
                        </div>
                        <div className="h-[40%] bg-red-200 rounded-xl overflow-hidden  relative">
                            <Image
                                src={imgs[1] || "/placeholder.png"}
                                fill
                                className="object-cover"
                                alt="Image 1"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-[40%] bg-blue-400 relative overflow-hidden rounded-xl">
                            <Image
                                src={imgs[2] || "/placeholder.png"}
                                fill
                                className="object-cover"
                                alt="Image 1"
                            />
                        </div>
                        <div className="h-[55%] bg-blue-200 rounded-xl overflow-hidden relative">
                            <Image
                                src={imgs[3] || "/placeholder.png"}
                                fill
                                className="object-cover"
                                alt="Image 1"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="h-[55%] bg-red-400 relative overflow-hidden rounded-xl">
                            <Image
                                src={imgs[4] || "/placeholder.png"}
                                fill
                                className="object-cover"
                                alt="Image 1"
                            />
                        </div>
                        <div className="h-[40%] bg-red-200 rounded-xl overflow-hidden  relative">
                            <Image
                                src={imgs[5] || "/placeholder.png"}
                                fill
                                className="object-cover"
                                alt="Image 1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
