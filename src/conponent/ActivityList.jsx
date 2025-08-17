import { Card, Typography, CardContent, Grid } from "@mui/material";
import React, { act, useEffect } from "react";
import { getActivities } from "../Services/Api";
import { useNavigate } from "react-router";

export const ActivityList = () => {
  const [activities, setActivities] = React.useState([]);
  const navigate = useNavigate();
  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <Grid container spacing={2}>
      {activities.map((activity) => (
        <Grid
          container
          spracing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
          key={activity.id}
        >
          <Card
            sx={{ p: 2, cursor: "pointer" }}
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            <CardContent>
              <Typography variant="h6">{activity.type}</Typography>
              <Typography>Duration: {activity.duration} minutes</Typography>
              <Typography>Calories: {activity.caloriesBruned}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
