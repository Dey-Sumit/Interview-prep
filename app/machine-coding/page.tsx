import Link from "next/link";
import React from "react";

const MACHINE_CODING_PROBLEMS = [
  {
    slug: "accordion",
  },
  {
    slug: "file-explorer",
  },
  {
    slug: "tabs",
  },
  {
    slug: "toast",
  },
  {
    slug: "carousel",
  },
];

const Page = () => {
  return (
    <div className="text-blue-400 p-6">
      <ul className="list-decimal">
        {MACHINE_CODING_PROBLEMS.map(({ slug }) => (
          <li className="underline " key={slug}>
            <Link href={`/machine-coding/${slug}`}>
              <span className="text-blue-500 capitalize">{slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
