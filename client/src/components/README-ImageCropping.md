# Image Cropping Implementation

This implementation adds pre-upload image cropping functionality to your image upload components using `react-image-crop`.

## Components Created

### 1. `CropModal` (`/components/ui/CropModal.tsx`)

A reusable modal component that handles image cropping with:

- Aspect ratio constraints
- Rotate and zoom controls
- Canvas-based cropping
- Quality preservation

### 2. `ImageInputWithCrop` (`/components/ImageInputWithCrop.tsx`)

Enhanced version of your existing `ImageInput` with cropping:

- Pre-upload cropping workflow
- Configurable crop options
- Maintains all existing functionality

### 3. `MultipleImageInputWithCrop` (`/components/MultipleImageInputWithCrop.tsx`)

Enhanced version for multiple image uploads:

- Individual cropping for each image
- Batch upload with cropping
- Maintains existing multi-file functionality

### 4. `MultiImageVideoInputWithCrop` (`/components/editor-components/inputs/MultiImageVideoInputWithCrop.tsx`)

Enhanced version that combines image cropping with video URL input.

### 5. `ImageInputPresets` (`/components/ui/ImageInputPresets.tsx`)

Predefined crop presets for different use cases:

- `SQUARE` - 1:1 aspect ratio
- `LOGO` - Square with smaller max size
- `PROFILE` - Square with higher min size
- `HERO` - 16:9 aspect ratio
- `BANNER` - 3:1 aspect ratio
- `CARD` - 4:3 aspect ratio
- `BLOG_THUMBNAIL` - 16:9 for blog posts
- `FREE` - No aspect ratio constraints

## Usage Examples

### Basic Single Image Upload with Cropping

```tsx
import { ImageInputWithCrop } from "@/components/ImageInputWithCrop";
import { getCropOptions } from "@/components/ui/ImageInputPresets";

function LogoUpload() {
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <ImageInputWithCrop
      onImageUpload={setLogoUrl}
      onImageRemove={() => setLogoUrl("")}
      initialImgUrl={logoUrl}
      cropOptions={getCropOptions("LOGO")}
      maxSizeMB={2}
    />
  );
}
```

### Multiple Images with Cropping

```tsx
import { MultipleImageInputWithCrop } from "@/components/MultipleImageInputWithCrop";

function GalleryUpload() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageAdd = (imgUrl: string) => {
    setImages((prev) => [...prev, imgUrl]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <MultipleImageInputWithCrop
      initialImages={images}
      onImageAdd={handleImageAdd}
      onImageRemove={handleImageRemove}
      cropOptions={getCropOptions("SQUARE")}
      maxFiles={6}
      maxSizeMB={2}
    />
  );
}
```

### Mixed Content (Images + Video)

```tsx
import { MultiImageVideoInputWithCrop } from "@/components/editor-components/inputs/MultiImageVideoInputWithCrop";

function ContentUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <MultiImageVideoInputWithCrop
      initialImages={images}
      onImageAdd={(url) => setImages((prev) => [...prev, url])}
      onImageRemove={(index) =>
        setImages((prev) => prev.filter((_, i) => i !== index))
      }
      onVideoUrlChange={setVideoUrl}
      cropPreset="HERO"
      maxFiles={4}
      maxSizeMB={3}
    />
  );
}
```

### Custom Crop Options

```tsx
import { CropOptions } from "@/components/ui/CropModal";

const customCropOptions: CropOptions = {
  aspectRatio: 2.39, // Cinematic aspect ratio
  minWidth: 800,
  minHeight: 335,
  maxWidth: 2400,
  maxHeight: 1004,
};

<ImageInputWithCrop
  cropOptions={customCropOptions}
  onImageUpload={handleUpload}
/>;
```

## Integration with Existing Components

### Replace Existing ImageInput Usage

**Before:**

```tsx
import { ImageInput } from "@/components/imgInput";

<ImageInput
  onImageUpload={handleUpload}
  onImageRemove={handleRemove}
  initialImgUrl={currentImage}
/>;
```

**After:**

```tsx
import { ImageInputWithCrop } from "@/components/ImageInputWithCrop";
import { getCropOptions } from "@/components/ui/ImageInputPresets";

<ImageInputWithCrop
  onImageUpload={handleUpload}
  onImageRemove={handleRemove}
  initialImgUrl={currentImage}
  cropOptions={getCropOptions("SQUARE")} // or appropriate preset
/>;
```

### Template-Specific Cropping

You can use different crop presets based on the template or section:

```tsx
// For logo uploads
<ImageInputWithCrop cropOptions={getCropOptions("LOGO")} />

// For hero images
<ImageInputWithCrop cropOptions={getCropOptions("HERO")} />

// For profile pictures
<ImageInputWithCrop cropOptions={getCropOptions("PROFILE")} />

// For blog thumbnails
<ImageInputWithCrop cropOptions={getCropOptions("BLOG_THUMBNAIL")} />
```

## Features

### ✅ Implemented

- Pre-upload cropping (saves bandwidth)
- Aspect ratio constraints
- Rotate and zoom controls
- Drag and drop support
- Multiple file upload with individual cropping
- Template-specific presets
- Quality preservation
- Error handling
- Loading states

### 🎯 Benefits

- **Bandwidth Savings**: Only upload cropped portions
- **Better UX**: Users see exactly what they're uploading
- **Consistent Sizes**: Enforce aspect ratios for different use cases
- **Performance**: Smaller files upload faster
- **Flexibility**: Different presets for different contexts

## Crop Presets Reference

| Preset           | Aspect Ratio | Min Size | Max Size  | Best For              |
| ---------------- | ------------ | -------- | --------- | --------------------- |
| `SQUARE`         | 1:1          | 200x200  | 2000x2000 | General square images |
| `LOGO`           | 1:1          | 200x200  | 1000x1000 | Logos and icons       |
| `PROFILE`        | 1:1          | 300x300  | 1500x1500 | Profile pictures      |
| `HERO`           | 16:9         | 800x450  | 2400x1350 | Hero sections         |
| `BANNER`         | 3:1          | 900x300  | 2400x800  | Wide banners          |
| `CARD`           | 4:3          | 400x300  | 1600x1200 | Card layouts          |
| `BLOG_THUMBNAIL` | 16:9         | 400x225  | 1200x675  | Blog posts            |
| `FREE`           | None         | 100x100  | 2000x2000 | Free form cropping    |

## Migration Guide

1. **Install Dependencies**: `pnpm add react-image-crop`
2. **Replace Components**: Use `ImageInputWithCrop` instead of `ImageInput`
3. **Add Crop Options**: Choose appropriate presets for your use cases
4. **Test Functionality**: Verify cropping works as expected
5. **Update Templates**: Use template-specific presets where appropriate

## Troubleshooting

### Common Issues

1. **Crop modal not showing**: Check that `react-image-crop` is installed
2. **Cropped image quality poor**: Adjust `minWidth` and `minHeight` in crop options
3. **Aspect ratio not enforced**: Ensure `aspectRatio` is set in crop options
4. **Upload fails after crop**: Check file size limits and network connectivity

### Performance Tips

1. **Use appropriate presets**: Don't use high-res presets for small images
2. **Set reasonable max sizes**: Prevents unnecessarily large uploads
3. **Consider file formats**: JPEG for photos, PNG for graphics with transparency
4. **Monitor upload sizes**: Adjust `maxSizeMB` based on your needs

## Future Enhancements

- [ ] AI-powered auto-crop suggestions
- [ ] Batch crop operations
- [ ] Advanced filters and effects
- [ ] Cloudinary integration for server-side processing
- [ ] Progressive image loading
- [ ] WebP format support
- [ ] Mobile-optimized cropping interface
