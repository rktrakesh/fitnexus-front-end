import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Menu,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { act } from "react";
import { addActivity } from "../Services/Api";

const ActivityForm = ({ onAcrivityAdded }) => {
  const [activity, setActivity] = React.useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additonalMatrics: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addActivity(activity);
      onAcrivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
    } catch (error) {}
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 2, border: "1px dashed grey" }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="activity-type-label">Activity Type</InputLabel>
        <Select
          value={activity.type}
          onChange={(e) => setActivity({ ...activity, type: e.target.value })}
        >
          {/* RUNNING, WALKING, CYCLING, SWIMMING, WEIGHT_TRAINING, YOGA, CARDIO,
          STRETCHING */}
          <MenuItem value="RUNNING">Running</MenuItem>
          <MenuItem value="CYCLING">Cycling</MenuItem>
          <MenuItem value="SWIMMING">Swimming</MenuItem>
          <MenuItem value="WEIGHT_TRAINING">Weightlifting</MenuItem>
          <MenuItem value="YOGA">Yoga</MenuItem>
          <MenuItem value="WALKING">Walking</MenuItem>
          <MenuItem value="CARDIO">Cardio</MenuItem>
          <MenuItem value="STRETCHING">Stretching</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Duration (minutes)"
        type="number"
        sx={{ mb: 2 }}
        value={activity.duration}
        onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
      />
      <TextField
        fullWidth
        label="Calories Burned"
        type="number"
        sx={{ mb: 2 }}
        value={activity.caloriesBurned}
        onChange={(e) =>
          setActivity({ ...activity, caloriesBurned: e.target.value })
        }
      />
      {/* <TextField
        fullWidth
        label="Additional Metrics"
        type="text"
        sx={{ mb: 2 }}
        value={activity.additonalMatrics}
        onChange={(e) =>
          setActivity({ ...activity, additonalMatrics: e.target.value })
        }
      /> */}
      <Button type="submit" variant="contained" color="primary">
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;
