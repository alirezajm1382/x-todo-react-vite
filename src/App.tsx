import { createContext, useState, useEffect } from "react";

//MUI components and Icons
import { Box } from "@mui/joy";

//Confetti
import Confetti from "react-confetti";

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
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  const [colorSchemeMode, setColorSchemeMode] = useState<"light" | "dark">(
    "light"
  );

  const handleSchemeChange = () =>
    setColorSchemeMode(colorSchemeMode === "light" ? "dark" : "light");

  useEffect(() => {
    // Check if there are any undone items
    const hasUndoneTasks = todoList.some((item) => !item.isDone);

    // Show confetti when all tasks are done (and we have at least one task)
    if (!hasUndoneTasks && todoList.length > 0) {
      setShowConfetti(true);
      setConfettiOpacity(1);
      
      // Gradually reduce opacity over 8 seconds
      const fadeInterval = setInterval(() => {
        setConfettiOpacity(prev => {
          if (prev <= 0) {
            clearInterval(fadeInterval);
            return 0;
          }
          return prev - 0.1;
        });
      }, 400);

      // Hide confetti after fade completes
      const timer = setTimeout(() => {
        setShowConfetti(false);
        clearInterval(fadeInterval);
      }, 4000);

      return () => {
        clearTimeout(timer);
        clearInterval(fadeInterval);
      };
    }
  }, [todoList]);

  return (
    <TodoListContext.Provider value={[todoList, setTodoList]}>
      {showConfetti && <Confetti opacity={confettiOpacity} />}
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
