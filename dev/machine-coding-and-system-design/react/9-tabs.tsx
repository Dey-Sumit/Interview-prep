import React, { createContext, ReactNode, useContext, useState } from "react";

type TabsContextValue = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue>(undefined as unknown as TabsContextValue);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("FIX IT");
  }
  return context;
};

const Tabs = ({
  defaultValue,
  onChange,
  children,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // handle no default default

  const tabsContextValue: TabsContextValue = {
    activeTab,
    onTabChange: (value: string) => {
      setActiveTab(value);
      onChange(value);
    },
  };

  return <TabsContext.Provider value={tabsContextValue}>{children}</TabsContext.Provider>;
};

const TabsList = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={`flex gap-1 ${className}`}>{children}</div>;
};

const TabsTrigger = ({
  children,
  className,
  value,
}: {
  children: ReactNode;
  className?: string;
  value: string;
}) => {
  const { onTabChange, activeTab } = useTabsContext();

  return (
    <button
      role="button"
      onClick={() => {
        onTabChange(value);
      }}
      className={`border-2 rounded-sm    p-2 ${
        activeTab === value ? "bg-blue-600 border-blue-500" : " bg-blue-400 border-blue-300"
      }`}
    >
      {children}
    </button>
  );
};

const TabsContent = ({
  children,
  className,
  value,
}: {
  children: ReactNode;
  className?: string;
  value: string;
}) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <div className="p-2 rounded-sm mt-2 border">{children}</div>;
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

const TabsPage = () => {
  return (
    <div className="">
      <Tabs defaultValue="first" onChange={(value) => {}}>
        <Tabs.List>
          <Tabs.Trigger value="first">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="second">Tab 2</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="first">Content 1</Tabs.Content>

        <Tabs.Content value="second">Content 2</Tabs.Content>
      </Tabs>
    </div>
  );
};

export default TabsPage;
