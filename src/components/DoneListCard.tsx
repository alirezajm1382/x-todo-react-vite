import { FunctionComponent, useContext, useMemo } from "react";

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

  const doneTasks = useMemo(() => {
    return items.filter((item) => item.isDone === true);
  }, [items]);

  if (doneTasks.length === 0) return <></>;

  return (
    <Card variant="soft">
      <CardContent>
        <Typography fontSize={16} fontWeight={600}>
          {`Done tasks - (${doneTasks.length})`}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          flexDirection="column"
          alignItems={doneTasks.length === 0 ? "center" : "flex-start"}
          marginY={1}
          marginX={0}
          rowGap={2}
        >
          {doneTasks.map((doneItem: TodoItemProps) => (
            <Card sx={{ width: "-webkit-fill-available" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: '10px',
                  margin: 0,
                }}
                key={doneItem.id}
              >
                <Stack flexDirection="column">
                  <Typography
                    fontSize={20}
                    fontWeight={400}
                    textOverflow="ellipsis"
                  >
                    {doneItem.context}
                  </Typography>
                  <Typography fontSize={10}>{doneItem.id}</Typography>
                </Stack>
                <Stack flexDirection="row" gap={1}>
                  <IconButton
                    onClick={() => handleUncheckItem(doneItem.id)}
                    variant="outlined"
                    sx={{
                      alignSelf: "flex-top",
                      transition: "all 0.2s",
                      width: 40,
                      height: 40,
                      ":hover": {
                        color: "white",
                        backgroundColor: "#2196f3",
                      },
                    }}
                  >
                    <Undo />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteItem(doneItem.id)}
                    variant="outlined"
                    sx={{
                      alignSelf: "flex-top",
                      transition: "all 0.2s",
                      width: 40,
                      height: 40,
                      ":hover": {
                        color: "white",
                        backgroundColor: "#ef5350",
                      },
                    }}
                  >
                    <Delete />
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
