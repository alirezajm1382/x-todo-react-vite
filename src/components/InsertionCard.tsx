import { v4 as v4UniqueIDParser } from "uuid";
import { FunctionComponent, useContext, useState } from "react";

//MUI components and Icons
import { Add, EditRounded, LightMode, DarkMode } from "@mui/icons-material";
import {
  Button,
  Input,
  Card,
  Divider,
  IconButton,
  Typography,
  Stack,
  CardContent,
} from "@mui/joy";

//Contexts
import { TodoItemProps, TodoListContext } from "../App";

//Interfaces
interface InsertionCardProps {
  colorScheme: ["light" | "dark", () => void];
}

const InsertionCard: FunctionComponent<InsertionCardProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [colorSchemeMode, handleSchemeChange] = props.colorScheme;
  const [items, setItems] = useContext(TodoListContext);

  const handleAddItem = () => {
    if (!inputValue.trim()) return; // Prevent empty tasks

    let item: TodoItemProps = {
      id: v4UniqueIDParser(),
      context: inputValue,
      isDone: false,
    };
    setItems([...items, item]);
    setInputValue(""); // Clear input after adding
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddItem();
    }
  };

  return (
    <Card
      variant="soft"
      sx={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={28} fontWeight={700}>
            Todo List
          </Typography>
          <IconButton
            variant="outlined"
            color="primary"
            onClick={handleSchemeChange}
            sx={{
              borderRadius: "12px",
              transition: "all 0.2s",
              ":hover": {
                transform: "rotate(180deg)",
              },
            }}
          >
            {colorSchemeMode === "light" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          spacing={2}
          flexDirection="column"
          justifyContent="stretch"
          alignItems="stretch"
        >
          <Input
            placeholder="What needs to be done?"
            fullWidth
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={handleKeyPress}
            startDecorator={<EditRounded />}
            sx={{
              padding: "1rem",
            }}
          />
          <Button
            variant="solid"
            fullWidth
            endDecorator={<Add />}
            onClick={handleAddItem}
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "1rem",
              transition: "all 0.2s",
              ":hover": {
                backgroundColor: "primary.600",
              },
            }}
          >
            Add Task
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InsertionCard;
