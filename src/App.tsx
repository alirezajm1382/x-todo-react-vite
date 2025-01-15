import { createContext, useState } from "react";

//MUI components and Icons
import { Box } from "@mui/joy";

//components
import InsertionCard from "./components/InsertionCard";
import ListCard from "./components/ListCard";
import DoneListCard from "./components/DoneListCard";

//Interfaces
export interface TodoItemProps {
  id: string;
  context: string;
  isDone: boolean;
}

export type TaskListProps = TodoItemProps[];

//Todo Context
export const TodoListContext = createContext<
  [TaskListProps, React.Dispatch<React.SetStateAction<TaskListProps>>]
>([[], () => {}]);

function App() {
  const [todoList, setTodoList] = useState<TaskListProps>([]);

  const [colorSchemeMode, setColorSchemeMode] = useState<"light" | "dark">(
    "light"
  );

  const handleSchemeChange = () =>
    setColorSchemeMode(colorSchemeMode === "light" ? "dark" : "light");

  return (
    <TodoListContext.Provider value={[todoList, setTodoList]}>
      <Box
        marginY={5}
        marginX={"auto"}
        display="flex"
        flexDirection="column"
        maxWidth={1080}
        gap={2}
      >
        <InsertionCard colorScheme={[colorSchemeMode, handleSchemeChange]} />
        <ListCard />
        <DoneListCard />
      </Box>
    </TodoListContext.Provider>
  );
}

export default App;
