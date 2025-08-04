import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageInputWithCrop } from "@/components/ImageInputWithCrop";
import { MultipleImageInputWithCrop } from "@/components/MultipleImageInputWithCrop";
import { MultiImageVideoInputWithCrop } from "@/components/editor-components/inputs/MultiImageVideoInputWithCrop";
import { getCropOptions, CROP_PRESETS } from "@/components/ui/ImageInputPresets";

export const ImageCroppingExamples = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [heroUrl, setHeroUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [blogImages, setBlogImages] = useState<string[]>([]);

  const handleGalleryImageAdd = (imgUrl: string) => {
    setGalleryImages(prev => [...prev, imgUrl]);
  };

  const handleGalleryImageRemove = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleBlogImageAdd = (imgUrl: string) => {
    setBlogImages(prev => [...prev, imgUrl]);
  };

  const handleBlogImageRemove = (index: number) => {
    setBlogImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Image Cropping Examples</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Upload - Square */}
        <Card>
          <CardHeader>
            <CardTitle>Logo Upload</CardTitle>
            <CardDescription>
              Square aspect ratio (1:1) perfect for logos and profile pictures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageInputWithCrop
              onImageUpload={setLogoUrl}
              onImageRemove={() => setLogoUrl("")}
              initialImgUrl={logoUrl}
              cropOptions={getCropOptions("LOGO")}
              maxSizeMB={2}
            />
            {logoUrl && (
              <div className="mt-4">
                <img src={logoUrl} alt="Logo" className="w-20 h-20 object-cover rounded" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hero Image - 16:9 */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Image</CardTitle>
            <CardDescription>
              Wide aspect ratio (16:9) perfect for hero sections and banners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageInputWithCrop
              onImageUpload={setHeroUrl}
              onImageRemove={() => setHeroUrl("")}
              initialImgUrl={heroUrl}
              cropOptions={getCropOptions("HERO")}
              maxSizeMB={5}
            />
            {heroUrl && (
              <div className="mt-4">
                <img src={heroUrl} alt="Hero" className="w-full h-32 object-cover rounded" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Picture - Square */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Square aspect ratio with higher minimum size for better quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageInputWithCrop
              onImageUpload={setProfileUrl}
              onImageRemove={() => setProfileUrl("")}
              initialImgUrl={profileUrl}
              cropOptions={getCropOptions("PROFILE")}
              maxSizeMB={3}
            />
            {profileUrl && (
              <div className="mt-4">
                <img src={profileUrl} alt="Profile" className="w-24 h-24 object-cover rounded-full" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gallery Images - Multiple with Square */}
        <Card>
          <CardHeader>
            <CardTitle>Gallery Images</CardTitle>
            <CardDescription>
              Multiple images with square cropping for consistent gallery layout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultipleImageInputWithCrop
              initialImages={galleryImages}
              onImageAdd={handleGalleryImageAdd}
              onImageRemove={handleGalleryImageRemove}
              cropOptions={getCropOptions("SQUARE")}
              maxFiles={6}
              maxSizeMB={2}
            />
            {galleryImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {galleryImages.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-20 object-cover rounded" 
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blog Images - Multiple with 16:9 */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Images</CardTitle>
            <CardDescription>
              Multiple images with 16:9 aspect ratio for blog thumbnails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultipleImageInputWithCrop
              initialImages={blogImages}
              onImageAdd={handleBlogImageAdd}
              onImageRemove={handleBlogImageRemove}
              cropOptions={getCropOptions("BLOG_THUMBNAIL")}
              maxFiles={4}
              maxSizeMB={3}
            />
            {blogImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {blogImages.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`Blog ${index + 1}`} 
                    className="w-full h-24 object-cover rounded" 
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mixed Content - Images + Video */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Mixed Content (Images + Video)</CardTitle>
            <CardDescription>
              Upload multiple images with cropping OR a video URL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultiImageVideoInputWithCrop
              initialImages={galleryImages}
              onImageAdd={handleGalleryImageAdd}
              onImageRemove={handleGalleryImageRemove}
              onVideoUrlChange={(url) => console.log("Video URL:", url)}
              cropPreset="CARD"
              maxFiles={4}
              maxSizeMB={2}
            />
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Available Crop Presets:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>SQUARE:</strong> 1:1 aspect ratio - perfect for logos, profile pictures</li>
              <li><strong>HERO:</strong> 16:9 aspect ratio - perfect for hero sections</li>
              <li><strong>BANNER:</strong> 3:1 aspect ratio - perfect for wide banners</li>
              <li><strong>CARD:</strong> 4:3 aspect ratio - perfect for card layouts</li>
              <li><strong>BLOG_THUMBNAIL:</strong> 16:9 aspect ratio - perfect for blog posts</li>
              <li><strong>FREE:</strong> No aspect ratio constraint - free form cropping</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Pre-upload cropping to save bandwidth</li>
              <li>Rotate and zoom controls</li>
              <li>Drag and drop support</li>
              <li>Multiple file upload with individual cropping</li>
              <li>Template-specific aspect ratios</li>
              <li>Quality and size controls</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 