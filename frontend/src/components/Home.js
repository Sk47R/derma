import Result from "./Result";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={4} sm={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
            Add a photo to scan
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <div className="file is-centered is-boxed is-medium">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="resume"
                onChange={(e) => {
                  setLoading(true);
                  if (e.target.files.length > 0) {
                    console.log("uploading file: ", e.target.files[0].name);
                  }
                }}
              />

              {loading ? (
                <div className="file-cta">
                  <CircularProgress
                    sx={{ margin: 5 }}
                    size={50}
                    thickness={4}
                  />
                  <Typography variant="h5">Processsing...</Typography>
                </div>
              ) : (
                <div className="file-cta">
                  <span className="file-icon icon-text">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Upload photo</span>
                </div>
              )}
            </label>
          </div>
        </Grid>
      </Grid>

      <Grid item xs={8} sm={8}>
        <Result />
      </Grid>
    </Grid>
  );
};

export default Home;