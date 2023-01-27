import skinResultService from "../services/skin-result";
import userService from "../services/user";

import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/loggedUserReducer";

import Notification from "./Notification";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import PercentIcon from "@mui/icons-material/Percent";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ResultHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const results = await skinResultService.getPreviousResults();
        console.log(results);
        setResults(results);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          userService.clearUser();
          dispatch(setUser(null));

          navigate("/");

          return dispatch(
            setNotification({
              msg: "Token expired. You must login to continue",
              error: false,
            })
          );
        }

        setLoading(false);
        dispatch(
          setNotification({
            msg: "Error fetching result history. Please try again later.",
            error: true,
          })
        );
      }
    };

    fetchResults();
  }, [dispatch, navigate]);

  return (
    <Container>
      <Notification />

      <Grid container spacing={6}>
        {loading && (
          <Grid item xs={12} align="center">
            <CircularProgress sx={{ margin: 5 }} size={25} thickness={4} />
            <Typography variant="h5">Fetching results...</Typography>
          </Grid>
        )}

        {results && results.length === 0 ? (
          <Grid item xs={12}>
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }}
            >
              No results found.
            </Typography>
          </Grid>
        ) : (
          results.map((result, idx) => (
            <Grid item sm={12} md={6} key={idx}>
              <Card sx={{ p: 2, boxShadow: 3, borderRadius: 1 }}>
                <Grid item xs={12} marginY="auto" marginX="auto">
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      paddingX: 2,
                      paddingTop: 2,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    Uploaded image
                  </Typography>

                  <CardMedia
                    component="img"
                    alt="Uploaded image"
                    image={result.image}
                    sx={{ padding: 2, width: "500px", marginX: "auto" }}
                  />
                </Grid>

                <Divider />

                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      paddingX: 2,
                      paddingTop: 2,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    Predictions
                  </Typography>

                  <CardContent>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <CoronavirusIcon color="error" />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              style={{
                                fontSize: 17,
                                fontWeight: "bold",
                                fontFamily: "Helvetica",
                              }}
                            >
                              Skin type
                            </Typography>
                          }
                          secondary={
                            <Typography
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                fontFamily: "Helvetica",
                              }}
                            >
                              {result.skinType}
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PercentIcon color="action" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography
                              style={{
                                fontSize: 17,
                                fontWeight: "bold",
                                fontFamily: "Helvetica",
                              }}
                            >
                              Probability
                            </Typography>
                          }
                          secondary={
                            <Typography
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                fontFamily: "Helvetica",
                              }}
                            >
                              {(
                                Math.round(result.probability * 10000) / 100
                              ).toFixed(2)}{" "}
                              %
                            </Typography>
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      {result.symptoms && result.symptoms.length > 0 && (
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <InfoIcon color="warning" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  Symptoms
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  {result.symptoms.map(
                                    (symptom) => symptom + ", "
                                  )}
                                </Typography>
                              }
                            />
                          </ListItem>

                          <Divider variant="inset" component="li" />
                        </div>
                      )}

                      {result.treatments && result.treatments.length > 0 && (
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <LocalHospitalIcon color="primary" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  Treatments
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  {result.treatments.map(
                                    (treatment) => treatment + ", "
                                  )}
                                </Typography>
                              }
                            />
                          </ListItem>

                          <Divider variant="inset" component="li" />
                        </div>
                      )}

                      {result.howCommon && (
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <LanguageIcon color="primary" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  How common
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  {result.howCommon}
                                </Typography>
                              }
                            />
                          </ListItem>

                          <Divider variant="inset" component="li" />
                        </div>
                      )}

                      {result.duration && (
                        <div>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AccessTimeIcon color="info" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              disableTypography
                              primary={
                                <Typography
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  Duration
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  style={{
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    fontFamily: "Helvetica",
                                  }}
                                >
                                  {result.duration}
                                </Typography>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </div>
                      )}
                    </List>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ResultHistory;
