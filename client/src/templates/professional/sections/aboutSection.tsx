import React from "react";

export const PFAboutSection = () => {
  return (
    <section className="px-4 flex flex-col lg:flex-row lg:justify-between lg:px-[20%]">
      {/* grid */}
      <div className="grid grid-cols-2 gap-2 mt-4 bg-red-500 lg:w-full">
        <div className=" flex flex-col justify-center items-center rounded-sm bg-red-300 h-40">
          <h1 className="font-bold text-5xl">8+</h1>
          <h2>years experience</h2>
        </div>
        <div className=" flex flex-col justify-center items-center rounded-sm bg-red-300 h-40">
          <h1 className="font-bold text-5xl">8+</h1>
          <h2>years experience</h2>
        </div>
        <div className=" flex flex-col justify-center items-center rounded-sm bg-red-300 h-40">
          <h1 className="font-bold text-5xl">8+</h1>
          <h2>years experience</h2>
        </div>
        <div className=" flex flex-col justify-center items-center rounded-sm bg-red-300 h-40">
          <h1 className="font-bold text-5xl">8+</h1>
          <h2>years experience</h2>
        </div>
      </div>
      {/* grid end */}

      <div className="flex flex-col gap-8 bg-blue-500 mt-8 lg:mt-0">
        <h1 className="text-3xl font-semibold">About Me</h1>
        <h2 className="uppercase">
          FOUNDER OF <span className="text-green-600">REACHOUT</span>
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          ipsa tempora labore adipisci atque libero reiciendis fugiat sed,
          ducimus molestiae tempore odio maxime mollitia voluptates repellat
          odit aliquid sint in sapiente aut asperiores? Dolores iure et
          similique praesentium nemo magni dolore impedit eius, cupiditate nulla
          possimus aperiam ut quibusdam fuga accusantium officiis, nam sint
          suscipit debitis facere illo in. Obcaecati culpa ullam reprehenderit
          expedita perspiciatis nemo, doloremque quo nobis vitae! Ducimus labore
          repellat unde voluptas mollitia temporibus odit porro voluptatum dicta
          illum maxime eligendi praesentium rerum laboriosam doloribus
          recusandae, sequi quasi, ab pariatur culpa impedit aperiam accusamus
          accusantium deserunt. Sequi.
        </p>

        <ul className="list-disc px-6 font-semibold space-y-2">
          <li>Centers in 3+ cities</li>
          <li>Founded in 2017</li>
          <li>Savitribai Phule Pune University</li>
          <li>100% +ve reviews</li>
        </ul>
      </div>
    </section>
  );
};
