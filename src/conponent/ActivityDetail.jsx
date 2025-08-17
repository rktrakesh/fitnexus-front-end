import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getActivityById } from "../Services/Api";
import "../css/ActivityDetails.css";
import { Typography, Divider } from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivityById(id);
        console.log("Fetched activity:", response.data);
        setActivity(response.data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };
    fetchActivity();
  }, [id]);

  if (!activity) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="activity-container">
      {/* Activity Info */}
      <div className="activity-card">
        <Typography className="activity-title">
          {activity.activityType}
        </Typography>
        <Typography>Type: {activity.activityType}</Typography>
        <Typography>Duration: {activity.duration} minutes</Typography>
        <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
        <Typography>
          Date: {new Date(activity.createdAt).toLocaleDateString()}
        </Typography>
      </div>

      {/* AI Recommendations */}
      <div className="recommendation-card">
        <Typography className="section-title">
          <h3>AI Recommendations for {activity.activityType}</h3>
        </Typography>
        <Divider className="divider" />

        {/* Full Recommendations */}
        {activity.recommendations && (
          <Typography className="recommendation-text">
            {activity.recommendations}
          </Typography>
        )}

        {/* Improvements */}
        {activity.improvements?.length > 0 && (
          <>
            <Typography className="section-title">
              <h4>Improvements:</h4>
            </Typography>
            {activity.improvements.map((imp, idx) => (
              <Typography key={idx} className="recommendation-text">
                {imp}
              </Typography>
            ))}
          </>
        )}

        {/* Suggestions */}
        {activity.suggestions?.length > 0 && (
          <>
            <Typography className="section-title">
              <h4>Suggestions:</h4>
            </Typography>
            {activity.suggestions.map((sug, idx) => (
              <Typography key={idx} className="recommendation-text">
                {sug}
              </Typography>
            ))}
          </>
        )}

        {/* Safety */}
        {activity.safety?.length > 0 && (
          <>
            <Typography className="section-title">
              <h4>Safety:</h4>
            </Typography>
            {activity.safety.map((safe, idx) => (
              <Typography key={idx} className="recommendation-text">
                {safe}
              </Typography>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityDetail;
