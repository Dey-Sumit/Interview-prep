import { generateUUID } from "@/utils";
import { useState } from "react";

type FileType = {
  id: string;
  name: string;
  type: "file";
};

type FolderType = {
  id: string;
  name: string;
  type: "folder";
  children: FileSystemEntry[];
};
type FileSystemEntry = FileType | FolderType;

const deepClone = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

type UseFileSystemReturn = {
  fileSystem: FileSystemEntry;
  addEntry: (parentId: string, newEntry: FileSystemEntry) => void;
  // setFileSystem: React.Dispatch<React.SetStateAction<FileSystemEntry>>;
};

const useFileSystem = (initialData: FileSystemEntry): UseFileSystemReturn => {
  const [fileSystem, setFileSystem] = useState<FileSystemEntry>(initialData);

  const addEntry = (parentId: string, newEntry: FileSystemEntry) => {
    const clonedFileSystem = deepClone(fileSystem);
    // Create a stack for DFS, starting with the root entry
    const stack: FileSystemEntry[] = [clonedFileSystem];

    // Loop until there are no more entries to process
    while (stack.length > 0) {
      // Pop the last entry from the stack
      const current = stack.pop() as FileSystemEntry;

      // Check if the current entry is a folder
      if (current.type === "folder") {
        // Check if this folder is the target folder (where we want to add the new entry)
        if (current.id === parentId) {
          // Add the new entry to the children of this folder
          current.children.push(newEntry);
          // Update the state with the modified file system
          setFileSystem(clonedFileSystem);
          return;
        }

        // If not the target folder, push its children to the stack for further processing
        for (let i = current.children.length - 1; i >= 0; i--) {
          stack.push(current.children[i]);
        }
      }
    }

    return { fileSystem, addEntry, setFileSystem };
  };

  return {
    fileSystem,
    addEntry,
  };
};

const INITIAL_DATA: FileSystemEntry = {
  id: generateUUID(),
  name: "root",
  type: "folder",
  children: [
    {
      id: generateUUID(),
      name: "src",
      type: "folder",
      children: [
        {
          id: generateUUID(),
          name: "components",
          type: "folder",
          children: [
            { id: generateUUID(), name: "Header.js", type: "file" },
            { id: generateUUID(), name: "Footer.js", type: "file" },
          ],
        },
        { id: generateUUID(), name: "App.js", type: "file" },
        { id: generateUUID(), name: "index.js", type: "file" },
      ],
    },
    {
      id: generateUUID(),
      name: "public",
      type: "folder",
      children: [{ id: generateUUID(), name: "index.html", type: "file" }],
    },
    { id: generateUUID(), name: ".gitignore", type: "file" },
    { id: generateUUID(), name: "package.json", type: "file" },
    { id: generateUUID(), name: "README.md", type: "file" },
  ],
};

const FileExplorer = () => {
  const { fileSystem, addEntry } = useFileSystem(INITIAL_DATA);
  const [inputValue, setInputValue] = useState("");
  const [createPosition, setCreatePosition] = useState<string | undefined>(undefined);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputValue || !createPosition) return;

    const newEntry: FileSystemEntry = {
      id: generateUUID(),
      name: inputValue,
      type: inputValue.includes(".") ? "file" : "folder",
      children: inputValue.includes(".") ? [] : [],
    };

    addEntry(createPosition, newEntry);
    setInputValue("");
    setCreatePosition(undefined);
  };

  return (
    <div className="flex gap-4">
      <div className="w-1/6">
        {fileSystem.type === "folder" ? (
          <Folder entry={fileSystem} onClickOfFolder={setCreatePosition} />
        ) : (
          <File name={fileSystem.name} />
        )}
      </div>
      <div className="border flex flex-col">
        <p>createPosition: {createPosition}</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-red-600"
        />
        <button onClick={onSubmit} disabled={inputValue.length === 0}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FileExplorer;

type FolderProps = {
  entry: FolderType;
  onClickOfFolder: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const Folder = ({ entry, onClickOfFolder }: FolderProps) => {
  return (
    <div className="text-sm border border-gray-600">
      <button className="bg-blue-600 px-2 py-1" onClick={() => onClickOfFolder(entry.id)}>
        {entry.name}
      </button>
      <div className="pl-2">
        {entry.children.map((child) =>
          child.type === "folder" ? (
            <Folder key={child.id} entry={child} onClickOfFolder={onClickOfFolder} />
          ) : (
            <File key={child.id} name={child.name} />
          )
        )}
      </div>
    </div>
  );
};

const File = ({ name }: { name: string }) => {
  return <p className="bg-gray-500 text-sm px-2 py-1">{name}</p>;
};
