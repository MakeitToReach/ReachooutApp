// Analytics tracking utility functions

declare global {
  interface Window {
    trackPortfolioEvent?: (eventName: string, eventData?: Record<string, any>) => void;
  }
}

/**
 * Track a portfolio event
 * @param eventName - Name of the event to track
 * @param eventData - Additional data to include with the event
 */
export const trackPortfolioEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.trackPortfolioEvent) {
    window.trackPortfolioEvent(eventName, eventData);
  }
};

/**
 * Track when a user clicks on a portfolio link
 * @param linkType - Type of link (e.g., "social", "project", "contact")
 * @param linkUrl - URL of the link
 * @param linkText - Text of the link
 */
export const trackLinkClick = (linkType: string, linkUrl: string, linkText?: string) => {
  trackPortfolioEvent("link_click", {
    link_type: linkType,
    link_url: linkUrl,
    link_text: linkText,
  });
};

/**
 * Track when a user views a specific section
 * @param sectionName - Name of the section
 * @param sectionType - Type of section (e.g., "about", "projects", "contact")
 */
export const trackSectionView = (sectionName: string, sectionType: string) => {
  trackPortfolioEvent("section_view", {
    section_name: sectionName,
    section_type: sectionType,
  });
};

/**
 * Track when a user interacts with a portfolio element
 * @param elementType - Type of element (e.g., "button", "image", "video")
 * @param elementAction - Action performed (e.g., "click", "hover", "play")
 * @param elementId - ID or identifier of the element
 */
export const trackElementInteraction = (
  elementType: string,
  elementAction: string,
  elementId?: string
) => {
  trackPortfolioEvent("element_interaction", {
    element_type: elementType,
    element_action: elementAction,
    element_id: elementId,
  });
};

/**
 * Track when a user downloads or views a file
 * @param fileType - Type of file (e.g., "resume", "portfolio", "certificate")
 * @param fileName - Name of the file
 * @param fileUrl - URL of the file
 */
export const trackFileDownload = (fileType: string, fileName: string, fileUrl: string) => {
  trackPortfolioEvent("file_download", {
    file_type: fileType,
    file_name: fileName,
    file_url: fileUrl,
  });
};

/**
 * Track when a user submits a contact form
 * @param formType - Type of form (e.g., "contact", "newsletter", "inquiry")
 * @param formData - Form data (be careful with sensitive information)
 */
export const trackFormSubmission = (formType: string, formData?: Record<string, any>) => {
  trackPortfolioEvent("form_submission", {
    form_type: formType,
    ...formData,
  });
};

/**
 * Track when a user plays a video
 * @param videoType - Type of video (e.g., "intro", "project", "testimonial")
 * @param videoUrl - URL of the video
 * @param videoTitle - Title of the video
 */
export const trackVideoPlay = (videoType: string, videoUrl: string, videoTitle?: string) => {
  trackPortfolioEvent("video_play", {
    video_type: videoType,
    video_url: videoUrl,
    video_title: videoTitle,
  });
};

/**
 * Track when a user views an image
 * @param imageType - Type of image (e.g., "project", "logo", "gallery")
 * @param imageUrl - URL of the image
 * @param imageAlt - Alt text of the image
 */
export const trackImageView = (imageType: string, imageUrl: string, imageAlt?: string) => {
  trackPortfolioEvent("image_view", {
    image_type: imageType,
    image_url: imageUrl,
    image_alt: imageAlt,
  });
}; 