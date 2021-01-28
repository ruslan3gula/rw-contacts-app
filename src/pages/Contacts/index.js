import React, { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useContacts } from "./useContacts";
import { ContactsTable } from "./ContactsTable";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import ToggleViewMode from "./ToggleViewMode";
import { DATA_VIEW_MODES } from "../../components/constants/constantsTable";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

const getInitialState = () => {
  return localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE;
};
export const Contacts = () => {
  const classes = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useState(getInitialState());

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
          <ToggleViewMode
            setDataViewMode={setDataViewMode}
            dataViewMode={dataViewMode}
          />
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return (
                <div>
                  <CircularProgress data-testid="circular-loader" />
                </div>
              );
            }

            if (contacts.isError) {
              return <div>...error</div>;
            }
            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }

            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return <div data-testid="contacts-grid-container">"GRID"</div>;
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
};
