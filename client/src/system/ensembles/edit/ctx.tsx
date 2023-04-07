import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { Path, Step } from "../api";

type StepContextType = {
  steps: Step[];
  addStep: (item: Step) => void;
  updateStep: (item: Step, index: number) => void;
  remove: (index: number) => void;
};

export const StepContext = createContext<StepContextType>({
  steps: [{
    id: '',
    conditionPaths: [] as Path[],
    defaultAction: 'continue'
  }],
  addStep: (item: Step) => {},
  updateStep: (item: Step, index: number) => {},
  remove: (index: number) => {},
})

function StepProvider(props: any) {
  const [steps, setItems] = useState([{
    id: '1',
    conditionPaths: [] as Path[],
    defaultAction: 'continue'
  }]);

  function addStep(item: Step) {
    setItems([{ ...item, id: `${steps.length + 1}`}, ...steps]);
  }

  function updateStep(item: Step, index: number) {
    const copy = [...steps];
    copy[index] = item;
    setItems(copy);
  }

  function remove(index: number) {
    const copy = [...steps];
    copy.splice(index, 1);
    setItems(copy);
  }

  const stepData = { steps, addStep, updateStep, remove };

  return <StepContext.Provider value={stepData} {...props} />;
}

function useStepContext() {
  return useContext(StepContext);
}

export { StepProvider, useStepContext };
