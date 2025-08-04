import { F_FEED_SECTION } from "../types/feed.types";

export const FFeedSection = ({ feedUrl }: F_FEED_SECTION) => {
  return (
    <section className="max-w-6xl h-screen mx-auto py-10">
      <div className="w-full h-full">
        <iframe
          src={feedUrl}
          className="w-full h-full"
          style={{ border: "none", width: "100%", height: "100%" }}
          title="Embedded Demo"
          loading="eager"
        ></iframe>
      </div>
    </section>
  );
}; 