import { FunctionComponent, useContext } from "react";

//MUI components and Icons
import { Undo, Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  Divider,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/joy";

//Contexts
import { TodoItemProps, TodoListContext } from "../App";

const DoneListCard: FunctionComponent = () => {
  const [items, setItems] = useContext(TodoListContext);

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUncheckItem = (id: string) => {
    let filteredItem = items.filter((item) => item.id === id);
    let filteredList = items.filter((item) => item.id !== id);
    setItems([...filteredList, { ...filteredItem[0], isDone: false }]);
  };

  if (items.filter((item) => item.isDone === true).length === 0) return <></>;

  return (
    <Card variant="soft">
      <CardContent>
        <Typography fontSize={16} fontWeight={600}>
          {`Done tasks - (${items.length})`}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          flexDirection="column"
          alignItems={items.length === 0 ? "center" : "flex-start"}
          marginY={1}
          marginX={0}
          rowGap={2}
        >
          {items
            .filter((item) => item.isDone === true)
            .map((item: TodoItemProps) => (
              <Card sx={{ width: "-webkit-fill-available" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 0,
                  }}
                  key={item.id}
                >
                  <Stack flexDirection="column">
                    <Typography
                      fontSize={20}
                      fontWeight={400}
                      textOverflow="ellipsis"
                    >
                      {item.context}
                    </Typography>
                    <Typography fontSize={10}>{item.id}</Typography>
                  </Stack>
                  <Stack flexDirection="row" gap={1}>
                    <IconButton
                      onClick={() => handleUncheckItem(item.id)}
                      variant="outlined"
                      sx={{
                        alignSelf: "flex-top",
                      }}
                    >
                      <Undo
                        sx={{
                          ":hover": {
                            color: "green",
                          },
                        }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(item.id)}
                      variant="outlined"
                      sx={{
                        alignSelf: "flex-top",
                      }}
                    >
                      <Delete
                        sx={{
                          ":hover": {
                            color: "red",
                          },
                        }}
                      />
                    </IconButton>
                  </Stack>
                </Box>
              </Card>
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DoneListCard;
