import React, { ReactNode, useContext, useState, ReactElement } from "react";

/* ------------------------------ Accordion Context ----------------------------- */

//  the context type for managing accordion state
type AccordionContextType = {
  activeItem: string;
  setActiveItem: (value: string) => void;
};

// Create a context with a default value of undefined
const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

// Custom hook to use the Accordion context
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordionContext must be used within AccordionContext Provider");
  }
  return context;
};

/* ------------------------------ Accordion Provider ----------------------------- */

type AccordionProps = {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
};

// Accordion component providing the context and managing state
const Accordion = ({ children, value, onChange }: AccordionProps) => {
  const [activeItem, setActiveItem] = useState(value);

  const contextValue: AccordionContextType = {
    activeItem,
    setActiveItem: (value) => {
      setActiveItem(value);
      onChange(value);
    },
  };

  return <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>;
};

/* ------------------------------ AccordionItem ----------------------------- */

type AccordionItemProps = {
  value: string;
  children: React.ReactNode;
};

// AccordionItem component passing necessary props to its children
const AccordionItem = ({ value, children }: AccordionItemProps) => {
  return (
    <div className="border my-2">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement, { value });
        }
        return child;
      })}
    </div>
  );
};

/* ------------------------------ Accordion Trigger ----------------------------- */

type AccordionTriggerProps = {
  children: React.ReactNode;
  value?: string;
};

// AccordionTrigger component handling click events
const AccordionTrigger = ({ children, value }: AccordionTriggerProps) => {
  const { setActiveItem } = useAccordionContext();
  const onTriggerClick = () => {
    //@ts-ignore : -
    setActiveItem(value);
  };

  return (
    <div className="p-2 bg-gray-400" role="button" onClick={onTriggerClick}>
      <div>{children}</div>
    </div>
  );
};

/* ------------------------------ Accordion Content ----------------------------- */
type AccordionContentProps = {
  value?: string;
  children: ReactNode;
};

// AccordionContent component displaying content based on the active item
const AccordionContent = ({ children, value }: AccordionContentProps) => {
  const { activeItem } = useAccordionContext();

  return value === activeItem ? <div className="border p-2">{children}</div> : null;
};

// Attach sub-components to Accordion
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

// Example usage of the Accordion component
const AccordionPage = () => {
  return (
    <Accordion value="first" onChange={(value) => {}}>
      <Accordion.Item value="first">
        <Accordion.Trigger>Trigger 1</Accordion.Trigger>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="second">
        <Accordion.Trigger>Trigger 2</Accordion.Trigger>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionPage;
