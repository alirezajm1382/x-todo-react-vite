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
    let item: TodoItemProps = {
      id: v4UniqueIDParser(),
      context: inputValue,
      isDone: false,
    };
    setItems([...items, item]);
  };

  return (
    <Card variant="soft">
      <CardContent>
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography fontSize={24} fontWeight={600}>
            Todo List
          </Typography>
          <IconButton
            variant="soft"
            color="primary"
            onClick={handleSchemeChange}
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
            placeholder="Add a new Item!"
            fullWidth
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            startDecorator={<EditRounded />}
          ></Input>
          <Button
            variant="solid"
            fullWidth
            endDecorator={<Add />}
            onClick={handleAddItem}
          >
            Go
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InsertionCard;
