import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { Path, Step } from "../api";

type StepContextType = {
  steps: Step[];
  selectedStep: string;
  addStep: (item: Step) => void;
  updateStep: (item: Step, index: number) => void;
  selectStep: (id: string) => void;
  remove: (index: number) => void;
};

export const StepContext = createContext<StepContextType>({
  steps: [{
    id: '1',
    conditionPaths: [] as Path[],
    defaultAction: 'continue'
  }],
  selectedStep: '1',
  addStep: (item: Step) => {},
  updateStep: (item: Step, index: number) => {},
  remove: (index: number) => {},
  selectStep: (id: string) => {},
})

function StepProvider(props: any) {
  const [steps, setItems] = useState([{
    id: '1',
    conditionPaths: [] as Path[],
    defaultAction: 'continue'
  }]);
  const [selectedStep, setSelected] = useState('1');

  function addStep(item: Step) {
    setItems([{ ...item, id: `${steps.length + 1}`}, ...steps]);
  }

  function updateStep(item: Step, index: number) {
    const copy = [...steps];
    copy[index] = item;
    setItems(copy);
  }

  function selectStep(id: string) {
    setSelected(id);
  }

  function remove(index: number) {
    const copy = [...steps];
    copy.splice(index, 1);
    setItems(copy);
  }

  const stepData = { steps, selectedStep, addStep, updateStep, selectStep, remove };

  return <StepContext.Provider value={stepData} {...props} />;
}

function useStepContext() {
  return useContext(StepContext);
}

export { StepProvider, useStepContext };
