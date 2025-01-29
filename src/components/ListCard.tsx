import { FunctionComponent, useContext, useMemo } from "react";

//MUI components and Icon
import { Celebration, Check, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Stack,
  Divider,
  Typography,
  IconButton,
  Box,
} from "@mui/joy";

//Contexts
import { TodoItemProps, TodoListContext } from "../App";

const ListCard: FunctionComponent = () => {
  const [items, setItems] = useContext(TodoListContext);

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCheckItem = (id: string) => {
    let filteredItem = items.filter((item) => item.id === id);
    let filteredList = items.filter((item) => item.id !== id);
    setItems([...filteredList, { ...filteredItem[0], isDone: true }]);
  };

  const undoneTasks = useMemo(() => {
    return items.filter((item) => item.isDone === false);
  }, [items]);

  return (
    <Card variant="soft">
      <CardContent>
        <Typography fontSize={16} fontWeight={600}>
          {`Tasks to do ${
            undoneTasks.length === 0 ? "" : `- (${undoneTasks.length})`
          }`}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Stack
          flexDirection="column"
          alignItems={undoneTasks.length === 0 ? "center" : "flex-start"}
          marginY={1}
          marginX={0}
          rowGap={2}
        >
          {undoneTasks.length === 0 ? (
            <>
              <Celebration />
              <Typography
                textAlign="center"
                variant="soft"
                fontSize={16}
                fontWeight={600}
              >
                Hooray! You're done for the day!
              </Typography>
            </>
          ) : (
            undoneTasks.map((undoneItem: TodoItemProps) => (
              <Card sx={{ width: "-webkit-fill-available" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    margin: 0,
                  }}
                  key={undoneItem.id}
                >
                  <Stack flexDirection="column" spacing={2}>
                    <Typography
                      fontSize={20}
                      fontWeight={400}
                      textOverflow="ellipsis"
                    >
                      {undoneItem.context}
                    </Typography>
                    <Typography fontSize={10}>{undoneItem.id}</Typography>
                  </Stack>
                  <Stack flexDirection="row" gap={1}>
                    <IconButton
                      onClick={() => handleCheckItem(undoneItem.id)}
                      variant="outlined"
                      sx={{
                        width: 40,
                        height: 40,
                        alignSelf: "flex-top",
                        transition: "all 0.2s",
                        ":hover": {
                          color: "white",
                          backgroundColor: "#4caf50",
                        },
                      }}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteItem(undoneItem.id)}
                      variant="outlined"
                      sx={{
                        width: 40,
                        height: 40,
                        alignSelf: "flex-top",
                        transition: "all 0.2s",
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
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ListCard;
