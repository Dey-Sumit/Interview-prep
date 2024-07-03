/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
const INITIAL_DATA: FileSystemEntry = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            {
              name: "Header.js",
              type: "file",
            },
            {
              name: "Footer.js",
              type: "file",
            },
          ],
        },
        {
          name: "App.js",
          type: "file",
        },
        {
          name: "index.js",
          type: "file",
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        {
          name: "index.html",
          type: "file",
        },
      ],
    },
    {
      name: ".gitignore",
      type: "file",
    },
    {
      name: "package.json",
      type: "file",
    },
    {
      name: "README.md",
      type: "file",
    },
  ],
};

const FileExplorer = () => {
  const [fileExplorer, setFileExplorer] = useState(INITIAL_DATA);
  const [inputValue, setInputValue] = useState("");
  const [createPosition, setCreatePosition] = useState<
    | {
        name: string;
      }
    | undefined
  >(undefined);

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    console.log({ inputValue, createPosition });


  };

  return (
    <div className="flex gap-4">
      <div className=" w-1/6">
        {fileExplorer.type === "folder" ? (
          <Folder
            children={fileExplorer.children}
            name={fileExplorer.name}
            onClickOfFolder={setCreatePosition}
          />
        ) : (
          <File name={fileExplorer.name} />
        )}
      </div>
      <div className="border flex flex-col ">
        <p>createPosition: {createPosition?.name}</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="text-red-600"
        />
        <button onClick={onSubmit} disabled={inputValue.length === 0}>
          submit
        </button>
      </div>
    </div>
  );
};

type FileSystemEntry = {
  name: string;
  type: "folder" | "file";
  children?: FileSystemEntry[];
};
type FolderProps = {
  name: string;
  children: FileSystemEntry[] | undefined;
  onClickOfFolder: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
        }
      | undefined
    >
  >;
};
export default FileExplorer;

const Folder = ({ children, name, onClickOfFolder }: FolderProps) => {
  return (
    <div className=" text-sm">
      <button
        className="bg-blue-600 px-2  py-1"
        onClick={() =>
          onClickOfFolder({
            name: name,
          })
        }
      >
        {name}
      </button>
      <div className="pl-2">
        {children?.map((entry, index) => {
          return entry.type === "folder" ? (
            <Folder
              children={entry.children}
              name={entry.name}
              key={index}
              onClickOfFolder={onClickOfFolder}
            />
          ) : (
            <File name={entry.name} key={index} />
          );
        })}
      </div>
    </div>
  );
};

const File = ({ name }: { name: string }) => {
  return <p className="bg-gray-500 text-sm px-2  py-1">{name}</p>;
};
